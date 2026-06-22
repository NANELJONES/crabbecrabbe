"use client";

import { useRef, useState } from "react";
import { HiArrowRight, HiOutlineDocument, HiXMark } from "react-icons/hi2";
import { handle_toast_notification } from "@/app/components/Toast";

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

const DOCUMENT_FIELDS = [
  {
    key: "cv",
    label: "CV",
    chooseLabel: "Choose CV (PDF)",
    emptyError: "Please upload your CV.",
  },
  {
    key: "jobApplication",
    label: "Job Application",
    chooseLabel: "Choose job application (PDF)",
    emptyError: "Please upload your job application.",
  },
];

const inputClass =
  "w-full border-0 border-b border-secondary_color bg-transparent py-2 text-base text-secondary_color outline-none transition-colors focus:border-primary_color";

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isPdfFile(file) {
  return (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  );
}

function RequiredMark() {
  return (
    <span className="text-primary_color" aria-hidden>
      {" "}
      *
    </span>
  );
}

function validatePdfFile(file) {
  if (!isPdfFile(file)) {
    return `"${file.name}" is not a PDF. Only PDF files are allowed.`;
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `"${file.name}" exceeds the 20 MB limit.`;
  }

  return null;
}

function DocumentUploadField({ field, file, onSelect, onRemove }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const selected = e.target.files?.[0];
    e.target.value = "";

    if (!selected) return;

    const error = validatePdfFile(selected);
    if (error) {
      handle_toast_notification({ message: error, type: "error" });
      return;
    }

    onSelect(selected);
  };

  return (
    <div>
      <label
        htmlFor={`apply-${field.key}`}
        className="mb-1.5 block text-sm text-secondary_color"
      >
        {field.label}
        <RequiredMark />
      </label>
      <input
        ref={inputRef}
        id={`apply-${field.key}`}
        name={field.key}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleChange}
        className="sr-only"
        aria-required="true"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full border border-dashed border-secondary_color/40 px-4 py-3 text-left text-sm text-secondary_color transition-colors hover:border-primary_color hover:text-primary_color"
      >
        {file ? "Replace PDF" : field.chooseLabel}
      </button>

      {file && (
        <div className="mt-3 flex items-center gap-2 rounded border border-secondary_color/15 bg-secondary_color/5 px-3 py-2 text-sm text-secondary_color">
          <HiOutlineDocument
            className="h-4 w-4 shrink-0 text-primary_color"
            aria-hidden
          />
          <span className="min-w-0 flex-1 truncate">{file.name}</span>
          <span className="shrink-0 text-xs text-secondary_color/60">
            {formatFileSize(file.size)}
          </span>
          <button
            type="button"
            onClick={onRemove}
            className="shrink-0 rounded p-0.5 text-secondary_color/70 transition-colors hover:text-primary_color"
            aria-label={`Remove ${field.label}`}
          >
            <HiXMark className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}

export default function CareerApplicationForm({ jobName }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [documents, setDocuments] = useState({
    cv: null,
    jobApplication: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobName?.trim()) {
      handle_toast_notification({
        message: "Job information is missing. Please refresh and try again.",
        type: "error",
      });
      return;
    }

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    if (!name) {
      handle_toast_notification({
        message: "Please enter your name.",
        type: "error",
      });
      return;
    }

    if (!email) {
      handle_toast_notification({
        message: "Please enter your email address.",
        type: "error",
      });
      return;
    }

    if (!phone) {
      handle_toast_notification({
        message: "Please enter your phone number.",
        type: "error",
      });
      return;
    }

    for (const field of DOCUMENT_FIELDS) {
      if (!documents[field.key]) {
        handle_toast_notification({
          message: field.emptyError,
          type: "error",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const body = new FormData();
      body.append("jobName", jobName.trim());
      body.append("name", name);
      body.append("email", email);
      body.append("phone", phone);
      body.append("message", form.message.trim());
      body.append("cv", documents.cv);
      body.append("jobApplication", documents.jobApplication);

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body,
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? "Could not submit application.");
      }

      handle_toast_notification({
        message: "Your application was submitted successfully.",
        type: "success",
      });

      setForm({ name: "", email: "", phone: "", message: "" });
      setDocuments({ cv: null, jobApplication: null });
    } catch (error) {
      handle_toast_notification({
        message: error.message ?? "Could not submit application.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full flex-col gap-6 rounded-lg border border-secondary_color/15 bg-white p-5 shadow-sm md:p-6"
      aria-labelledby="application-form-heading"
    >
      <div>
        <h2
          id="application-form-heading"
          className="heading_primary text-xl font-bold md:text-2xl"
        >
          Apply for this role
        </h2>
        {jobName && (
          <p className="mt-1 text-sm text-secondary_color/70">{jobName}</p>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="apply-name" className="mb-1.5 block text-sm text-secondary_color">
            Name
            <RequiredMark />
          </label>
          <input
            id="apply-name"
            name="name"
            type="text"
            value={form.name}
            onChange={updateField("name")}
            autoComplete="name"
            aria-required="true"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="apply-email" className="mb-1.5 block text-sm text-secondary_color">
            Email
            <RequiredMark />
          </label>
          <input
            id="apply-email"
            name="email"
            type="email"
            value={form.email}
            onChange={updateField("email")}
            autoComplete="email"
            aria-required="true"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="apply-phone" className="mb-1.5 block text-sm text-secondary_color">
            Phone
            <RequiredMark />
          </label>
          <input
            id="apply-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={updateField("phone")}
            autoComplete="tel"
            aria-required="true"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="apply-message" className="mb-1.5 block text-sm text-secondary_color">
            Message
          </label>
          <textarea
            id="apply-message"
            name="message"
            rows={5}
            value={form.message}
            onChange={updateField("message")}
            className="w-full resize-y border border-secondary_color bg-transparent p-3 text-base text-secondary_color outline-none transition-colors focus:border-primary_color"
          />
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-sm text-secondary_color/80">
            Upload both documents as PDF files (max 20 MB each).
          </p>
          {DOCUMENT_FIELDS.map((field) => (
            <DocumentUploadField
              key={field.key}
              field={field}
              file={documents[field.key]}
              onSelect={(file) =>
                setDocuments((prev) => ({ ...prev, [field.key]: file }))
              }
              onRemove={() =>
                setDocuments((prev) => ({ ...prev, [field.key]: null }))
              }
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="primary_button w-full sm:w-fit disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
      >
        <span>{isSubmitting ? "Submitting…" : "Submit application"}</span>
        <span className="button_icon">
          <HiArrowRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </button>
    </form>
  );
}
