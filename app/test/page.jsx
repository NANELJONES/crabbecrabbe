"use client";

import { useState } from "react";

export default function TestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const sendTestEmail = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/test/resend", { method: "POST" });
      const json = await res.json();

      setResult({
        success: json.success,
        message: json.message ?? json.error ?? "Unknown response.",
      });
    } catch (error) {
      setResult({
        success: false,
        message: error.message ?? "Request failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-6 p-8">
      <div>
        <h1 className="heading_primary text-2xl font-bold">Resend email test</h1>
        <p className="mt-2 text-sm text-secondary_color/80">
          Sends a test email with subject &quot;Resend test&quot; and body &quot;hi&quot; to
          eruditejones@gmail.com using <code>RESEND_API_KEY</code>.
        </p>
      </div>

      <button
        type="button"
        onClick={sendTestEmail}
        disabled={loading}
        className="primary_button w-fit disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send test email"}
      </button>

      {result && (
        <div
          className={`rounded border p-4 text-sm ${
            result.success
              ? "border-green-300 bg-green-50 text-green-900"
              : "border-red-300 bg-red-50 text-red-900"
          }`}
        >
          <p className="font-semibold">{result.success ? "Success" : "Failed"}</p>
          <p className="mt-1 whitespace-pre-wrap">{result.message}</p>
        </div>
      )}
    </main>
  );
}
