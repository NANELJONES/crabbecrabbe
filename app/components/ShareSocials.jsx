"use client";

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
import { SITE_URL } from "@/app/seo/site";

export default function ShareSocials({
  shareUrl,
  shareTitle,
  shareDescription = "",
}) {
  const path = shareUrl?.startsWith("/") ? shareUrl : `/${shareUrl ?? ""}`;
  const absoluteUrl = `${SITE_URL.replace(/\/$/, "")}${path}`;

  return (
    <div className="flex gap-4 mt-4">
      <FacebookShareButton url={absoluteUrl} quote={shareTitle}>
        <FacebookIcon size={30} round />
      </FacebookShareButton>

      <TwitterShareButton url={absoluteUrl} title={shareTitle}>
        <TwitterIcon size={30} round />
      </TwitterShareButton>

      <LinkedinShareButton
        url={absoluteUrl}
        title={shareTitle}
        summary={shareDescription}
      >
        <LinkedinIcon size={30} round />
      </LinkedinShareButton>

      <WhatsappShareButton url={absoluteUrl} title={shareTitle}>
        <WhatsappIcon size={30} round />
      </WhatsappShareButton>

      <EmailShareButton
        url={absoluteUrl}
        subject={shareTitle}
        body={shareDescription}
      >
        <EmailIcon size={30} round />
      </EmailShareButton>
    </div>
  );
}
