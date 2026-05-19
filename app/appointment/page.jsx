"use client";

import emailjs from "@emailjs/browser";
import Image from "next/image";
import { useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import { handle_toast_notification } from "../components/Toast";
import Heading from "../components/Heading";
import Layout1 from "../layout/Layout1";

const EMAIL_SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_SERVICE_ID;
const APPOINTMENT_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_APPOINTMENT_TEMPLATE_ID;
const EMAIL_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_P_KEY;

const PATTERN_BG = "/Pattern%202.png";

const BRANCHES = [
  { value: "tse-addo", label: "Tse Addo" },
  { value: "winneba", label: "Winneba" },
];

const MEETING_TYPES = [
  { value: "initial-consultation", label: "Initial Consultation" },
  { value: "follow-up", label: "Follow-up Meeting" },
  { value: "document-review", label: "Document Review" },
  { value: "case-discussion", label: "Case Discussion" },
  { value: "other", label: "Other" },
];

const inputClass =
  "w-full border-0 border-b border-secondary_color bg-transparent py-2 text-base text-secondary_color outline-none transition-colors focus:border-primary_color";
const selectClass =
  "w-full cursor-pointer border-0 border-b border-secondary_color bg-transparent py-2 text-base text-secondary_color outline-none transition-colors focus:border-primary_color";

export default function AppointmentPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    branch: "",
    meetingType: "",
    date: "",
    time: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const updateField = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const getLabel = (options, value) =>
    options.find((item) => item.value === value)?.label ?? value;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      handle_toast_notification({
        message: "Please enter your name.",
        type: "error",
      });
      return;
    }

    if (!EMAIL_SERVICE_ID || !APPOINTMENT_TEMPLATE_ID || !EMAIL_PUBLIC_KEY) {
      handle_toast_notification({
        message: "Booking service is not configured. Please try again later.",
        type: "error",
      });
      return;
    }

    const branchLabel = getLabel(BRANCHES, form.branch);
    const meetingTypeLabel = getLabel(MEETING_TYPES, form.meetingType);

    setIsSending(true);

    try {
      await emailjs.send(
        EMAIL_SERVICE_ID,
        APPOINTMENT_TEMPLATE_ID,
        {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          branch: branchLabel,
          meeting_type: meetingTypeLabel,
          date: form.date,
          time: form.time,
          preferred_datetime: `${form.date} at ${form.time}`,
          message: form.message.trim() || "No additional message provided.",
        },
        { publicKey: EMAIL_PUBLIC_KEY }
      );

      handle_toast_notification({
        message:
          "Your appointment request was sent successfully. We will contact you shortly to confirm.",
        type: "success",
      });

      setForm({
        name: "",
        phone: "",
        email: "",
        branch: "",
        meetingType: "",
        date: "",
        time: "",
        message: "",
      });
    } catch (error) {
      console.error("[Appointment] EmailJS error:", error);
      handle_toast_notification({
        message:
          "Could not submit your request. Please try again or contact us directly.",
        type: "error",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Layout1>
        <Heading
          heading="Book An Appointment"
          subHeading="Schedule a consultation with our team at your preferred branch in Ghana."
        />
      </Layout1>

      <section className="section_container pt-0 md:pt-2">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <div
            className="relative min-h-[360px] w-full bg-cover bg-center bg-no-repeat sm:min-h-[420px] lg:min-h-[560px]"
            style={{ backgroundImage: `url('${PATTERN_BG}')` }}
          >
            {/* <div className="relative left-6 top-6 w-[88%] max-w-md sm:left-8 sm:top-8 lg:left-10 lg:top-10">
              <div className="relative aspect-[4/5] w-full max-h-[320px] overflow-hidden shadow-md sm:max-h-[380px] lg:max-h-[420px]">
                <Image
                  src="/1.jpg"
                  alt="Crabbe Crabbe & Co. office"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 88vw, 420px"
                  priority
                />
              </div>
            </div> */}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-8 py-4 lg:py-8"
          >
            <div className="flex flex-col gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm text-secondary_color"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={updateField("name")}
                  required
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm text-secondary_color"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={updateField("phone")}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm text-secondary_color"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField("email")}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="branch"
                  className="mb-1.5 block text-sm text-secondary_color"
                >
                  Branch
                </label>
                <select
                  id="branch"
                  name="branch"
                  value={form.branch}
                  onChange={updateField("branch")}
                  required
                  className={selectClass}
                >
                  <option value="" disabled>
                    Select a branch
                  </option>
                  {BRANCHES.map((branch) => (
                    <option key={branch.value} value={branch.value}>
                      {branch.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="meetingType"
                  className="mb-1.5 block text-sm text-secondary_color"
                >
                  Type of Meeting
                </label>
                <select
                  id="meetingType"
                  name="meetingType"
                  value={form.meetingType}
                  onChange={updateField("meetingType")}
                  required
                  className={selectClass}
                >
                  <option value="" disabled>
                    Select meeting type
                  </option>
                  {MEETING_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="date"
                    className="mb-1.5 block text-sm text-secondary_color"
                  >
                    Preferred Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={updateField("date")}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="mb-1.5 block text-sm text-secondary_color"
                  >
                    Preferred Time
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={updateField("time")}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm text-secondary_color"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={updateField("message")}
                  placeholder="Briefly describe what you would like to discuss..."
                  className="w-full resize-y border border-secondary_color bg-transparent p-3 text-base text-secondary_color outline-none transition-colors placeholder:text-secondary_color/40 focus:border-primary_color"
                />
              </div>
            </div>

            <div className="flex flex-col items-start gap-3">
              <button
                type="submit"
                className="primary_button disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSending}
              >
                <span>{isSending ? "Submitting…" : "Book Appointment"}</span>
                <span className="button_icon">
                  <HiArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
