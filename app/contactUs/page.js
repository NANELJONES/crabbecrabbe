"use client";

import emailjs from "@emailjs/browser";
import Image from "next/image";
import { useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import ContactInfoList from "../components/ContactInfoList";
import { handle_toast_notification } from "../components/Toast";
import Heading from "../components/Heading";
import AnimateUp from "../components/AnimateUp";
import Layout1 from "../layout/Layout1";

const EMAIL_SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_SERVICE_ID;
const EMAIL_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_TEMPLATE_ID;
const EMAIL_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_P_KEY;

const PATTERN_BG = "/Pattern%202.png";

function ContactVisual() {
  return (
    <div
      className="relative min-h-[440px] w-full bg-cover bg-center bg-no-repeat sm:min-h-[500px] lg:min-h-[540px]"
      style={{ backgroundImage: `url('${PATTERN_BG}')` }}
    >
      <div className="relative left-8 top-8 w-[88%] max-w-[400px] sm:left-10 sm:top-10 sm:max-w-[440px] lg:left-[20%] xl:left-[35%] lg:top-12 lg:max-w-[480px]">
        <div className="relative aspect-[4/5] w-full max-h-[300px] overflow-hidden">
          <Image
            src="/company/contact.jpg"
            alt="Law library"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 88vw, 480px"
            priority
          />
        </div>

        <div className="w-full bg-primary_color px-6 py-6 sm:px-7 sm:py-7">
          <ContactInfoList
            color="white"
            className="space-y-3.5 sm:space-y-4"
            textClassName="text-sm leading-snug md:text-[0.95rem]"
            linkClassName="transition-opacity hover:opacity-90"
          />
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      handle_toast_notification({
        message: "Please enter your name and message.",
        type: "error",
      });
      return;
    }

    if (!EMAIL_SERVICE_ID || !EMAIL_TEMPLATE_ID || !EMAIL_PUBLIC_KEY) {
      handle_toast_notification({
        message: "Email service is not configured. Please try again later.",
        type: "error",
      });
      return;
    }

    setIsSending(true);

    try {
      await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        {
          name: form.name.trim(),
          message: form.message.trim(),
          email: form.email.trim() || "Not provided",
          phone: form.phone.trim() || "Not provided",
        },
        { publicKey: EMAIL_PUBLIC_KEY }
      );

      handle_toast_notification({
        message: "Your message was sent successfully. We will be in touch soon.",
        type: "success",
      });

      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("[Contact] EmailJS error:", error);
      handle_toast_notification({
        message: "Could not send your message. Please try again or contact us directly.",
        type: "error",
      });
    } finally {
      setIsSending(false);
    }
  };

  const updateField = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  return (
    <div className="min-h-screen bg-white">
      <Layout1>
        <AnimateUp>
          <Heading
            heading="Get In Touch With Us"
            subHeading="Discuss your legal needs or request a consultation with our team in Ghana."
          />
        </AnimateUp>
      </Layout1>

      <section className="section_container pt-0 md:pt-2">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <AnimateUp>
            <ContactVisual />
          </AnimateUp>

          <AnimateUp delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-lg flex-col justify-center gap-8 lg:max-w-none lg:py-4"
          >
            <div className="flex flex-col gap-7">
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
                  className="w-full border-0 border-b border-secondary_color bg-transparent py-2 text-base text-secondary_color outline-none transition-colors focus:border-primary_color"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm text-secondary_color"
                >
                  Email:
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateField("email")}
                  required
                  className="w-full border-0 border-b border-secondary_color bg-transparent py-2 text-base text-secondary_color outline-none transition-colors focus:border-primary_color"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm text-secondary_color"
                >
                  Phone:
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={updateField("phone")}
                  className="w-full border-0 border-b border-secondary_color bg-transparent py-2 text-base text-secondary_color outline-none transition-colors focus:border-primary_color"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm text-secondary_color"
                >
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  value={form.message}
                  onChange={updateField("message")}
                  required
                  className="w-full resize-y border border-secondary_color bg-transparent p-3 text-base text-secondary_color outline-none transition-colors focus:border-primary_color"
                />
              </div>
            </div>

            <div className="flex flex-col items-start gap-3">
              <button
                type="submit"
                className="primary_button disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSending}
              >
                <span>{isSending ? "Sending…" : "Send Message"}</span>
                <span className="button_icon">
                  <HiArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </button>
            </div>
          </form>
          </AnimateUp>
        </div>
      </section>
    </div>
  );
}
