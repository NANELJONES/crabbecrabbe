import { gql } from "graphql-request";

const LOG_PREFIX = "[Hygraph]";

const ASSET_READY_STATUSES = new Set([
  "ASSET_UPLOAD_COMPLETE",
  "ASSET_CREATE_COMPLETE",
]);

function log(step, detail) {
  if (detail === undefined) {
    console.log(`${LOG_PREFIX} ${step}`);
    return;
  }

  console.log(
    `${LOG_PREFIX} ${step}`,
    typeof detail === "string" ? detail : JSON.stringify(detail, null, 2)
  );
}

export function getHygraphConfig() {
  const contentEndpoint = process.env.GRAPHCMS_ENDPOINT?.trim();
  const token = process.env.CMS_TOKEN?.trim();

  if (!contentEndpoint || !token) {
    throw new Error("Hygraph is not configured (GRAPHCMS_ENDPOINT / CMS_TOKEN)");
  }

  const match = contentEndpoint.match(
    /^https:\/\/([^.]+)\.cdn\.hygraph\.com\/content\/([^/]+)\/([^/?]+)/
  );

  if (!match) {
    throw new Error("Invalid GRAPHCMS_ENDPOINT format");
  }

  const [, region, projectId, stage] = match;

  return {
    contentEndpoint,
    mutationEndpoint: `https://api-${region}.hygraph.com/v2/${projectId}/${stage}`,
    token,
  };
}

function getRequestHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    "gcms-stage": "DRAFT",
  };
}

async function hygraphRequest(config, query, variables, operation = "request") {
  log(`${operation} → request`, { variables });

  const response = await fetch(config.mutationEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getRequestHeaders(config.token),
    },
    body: JSON.stringify({ query, variables }),
  });

  const body = await response.json();

  if (body.errors?.length) {
    log(`${operation} ← error (${response.status})`, body.errors);
    const message = body.errors.map((entry) => entry.message).join(" | ");

    if (response.status === 403) {
      throw new Error(
        `${message} — check that your CMS token has Read (Draft), Create, and Update on both Job Application and Asset.`
      );
    }

    throw new Error(message);
  }

  if (!response.ok) {
    log(`${operation} ← HTTP error`, { status: response.status, body });
    throw new Error(`Hygraph request failed (${response.status})`);
  }

  log(`${operation} ← success`, body.data);
  return body.data;
}

function buildFilesInput(assetIds) {
  return {
    connect: assetIds.map((id) => ({ id })),
  };
}

async function getAssetUploadStatus(config, assetId) {
  const query = gql`
    query AssetUploadStatus($id: ID!) {
      complete: asset(where: { id: $id }) {
        id
        fileName
        upload {
          status
        }
      }
      pending: assets(
        where: { id: $id, upload: { status_not_in: ASSET_UPLOAD_COMPLETE } }
      ) {
        id
        fileName
        upload {
          status
        }
      }
    }
  `;

  const result = await hygraphRequest(
    config,
    query,
    { id: assetId },
    `asset-status:${assetId}`
  );

  const completeStatus = result?.complete?.upload?.status;
  const pendingAsset = result?.pending?.[0];
  const pendingStatus = pendingAsset?.upload?.status;

  return {
    completeAsset: result?.complete ?? null,
    pendingAsset: pendingAsset ?? null,
    status: completeStatus ?? pendingStatus ?? null,
  };
}

function isAssetReady(status) {
  return status && ASSET_READY_STATUSES.has(status);
}

async function waitForAssetReady(
  config,
  assetId,
  attempts = 24,
  delayMs = 500
) {
  log(`Waiting for asset ${assetId} to finish processing`);

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const { completeAsset, pendingAsset, status } = await getAssetUploadStatus(
      config,
      assetId
    );

    log(`Asset ${assetId} poll ${attempt}/${attempts}`, {
      status: status ?? "not visible yet",
      completeAsset: completeAsset?.id ?? null,
      pendingAsset: pendingAsset?.id ?? null,
    });

    if (isAssetReady(status)) {
      log(`Asset ${assetId} is ready`, { status });
      return;
    }

    if (status === "ASSET_ERROR_UPLOAD") {
      throw new Error(`Asset ${assetId} failed to process in Hygraph.`);
    }

    if (attempt < attempts) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  log(
    `Asset ${assetId} status not confirmed after ${attempts} polls — proceeding after S3 upload succeeded`
  );
}

async function fetchAssetUrl(config, assetId) {
  const query = gql`
    query AssetUrl($id: ID!) {
      asset(where: { id: $id }) {
        id
        url
        fileName
      }
    }
  `;

  const result = await hygraphRequest(
    config,
    query,
    { id: assetId },
    `asset-url:${assetId}`
  );

  return {
    id: result?.asset?.id ?? assetId,
    url: result?.asset?.url ?? null,
    fileName: result?.asset?.fileName ?? null,
  };
}

async function uploadAssetModern(file, config) {
  log(`Uploading file: ${file.name} (${file.size} bytes)`);

  const mutation = gql`
    mutation CreateAsset($fileName: String!) {
      createAsset(data: { fileName: $fileName }) {
        id
        upload {
          status
          requestPostData {
            url
            date
            key
            signature
            algorithm
            policy
            credential
            securityToken
          }
        }
      }
    }
  `;

  const result = await hygraphRequest(
    config,
    mutation,
    { fileName: file.name },
    `createAsset:${file.name}`
  );

  const asset = result?.createAsset;
  const postData = asset?.upload?.requestPostData;

  if (!asset?.id || !postData?.url) {
    throw new Error("Could not initialize asset upload");
  }

  log(`createAsset returned id ${asset.id}`, {
    initialStatus: asset.upload?.status ?? null,
  });

  const uploadForm = new FormData();
  uploadForm.append("X-Amz-Date", postData.date);
  uploadForm.append("key", postData.key);
  uploadForm.append("X-Amz-Signature", postData.signature);
  uploadForm.append("X-Amz-Algorithm", postData.algorithm);
  uploadForm.append("policy", postData.policy);
  uploadForm.append("X-Amz-Credential", postData.credential);
  if (postData.securityToken) {
    uploadForm.append("X-Amz-Security-Token", postData.securityToken);
  }
  uploadForm.append("file", file, file.name);

  log(`Sending ${file.name} to S3 pre-signed URL`);
  const uploadResponse = await fetch(postData.url, {
    method: "POST",
    body: uploadForm,
  });

  if (!uploadResponse.ok) {
    const responseText = await uploadResponse.text().catch(() => "");
    log(`S3 upload failed for ${file.name}`, {
      status: uploadResponse.status,
      responseText,
    });
    throw new Error(`Asset file transfer failed (${uploadResponse.status})`);
  }

  log(`S3 upload succeeded for ${file.name}`, { assetId: asset.id });
  await waitForAssetReady(config, asset.id);

  return fetchAssetUrl(config, asset.id);
}

export async function uploadAsset(file) {
  const config = getHygraphConfig();
  return uploadAssetModern(file, config);
}

export async function createJobApplication({
  jobName,
  name,
  email,
  phone,
  message,
  assetIds,
}) {
  const config = getHygraphConfig();

  const data = {
    jobName,
    name,
    email,
    phone: phone || "",
    message,
  };

  if (assetIds.length > 0) {
    data.files = buildFilesInput(assetIds);
  }

  log("Creating job application", {
    jobName,
    name,
    email,
    assetIds,
    filesConnect: data.files,
  });

  const createMutation = gql`
    mutation CreateJobApplication($data: JobApplicationCreateInput!) {
      createJobApplication(data: $data) {
        id
      }
    }
  `;

  const result = await hygraphRequest(
    config,
    createMutation,
    { data },
    "createJobApplication"
  );
  const applicationId = result?.createJobApplication?.id;

  if (!applicationId) {
    throw new Error("Application could not be created.");
  }

  log("Job application created", { applicationId });
  return applicationId;
}
