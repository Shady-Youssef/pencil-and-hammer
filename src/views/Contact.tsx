"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import { useSiteSettings } from "@/components/site/site-settings-context";
import { getAddressLines } from "@/lib/site";

export default function Contact() {
  const { settings } = useSiteSettings();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const info = [
    { icon: MapPin, label: "Studio Address", value: getAddressLines(settings).join("\n") },
    { icon: Phone, label: "Phone", value: settings.contactPhone },
    { icon: Mail, label: "Email", value: settings.contactEmail },
    { icon: Clock, label: "Availability", value: "Monday to Friday\n9:00 AM to 6:00 PM" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you. We will get back to you shortly.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const inputClass = (field: string) =>
    `w-full rounded-[1rem] border bg-background/80 px-4 py-3.5 font-body text-sm text-foreground outline-none transition-all duration-300 ${
      focused === field
        ? "border-foreground/28 shadow-[0_0_0_4px_rgba(255,255,255,0.04)]"
        : "border-border"
    }`;

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="bg-background">
        <section className="relative overflow-hidden border-b border-border/60 pt-32 sm:pt-36">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0)_100%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-14 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-12">
            <AnimatedSection>
              <p className="font-body text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                Contact
              </p>
              <h1 className="mt-5 max-w-2xl font-display text-[3.3rem] font-light leading-[0.95] text-foreground sm:text-[4.5rem] md:text-[5.4rem]">
                Start the conversation before the project starts drifting.
              </h1>
            </AnimatedSection>
            <AnimatedSection direction="right" className="lg:pt-8">
              <p className="max-w-xl font-body text-base leading-8 text-muted-foreground sm:text-lg">
                Share the project type, timeline, and what needs to happen next.
                We will respond with a clearer path for scope, design direction, and delivery.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding">
          <div className="mx-auto grid max-w-7xl gap-12 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
            <AnimatedSection direction="left">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                {info.map((item, index) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-[1.7rem] border border-border/70 bg-card/78 p-6 backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-border/70 bg-background/80">
                        <item.icon size={20} strokeWidth={1.35} className="text-foreground" />
                      </div>
                      <div>
                        <p className="font-body text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                          0{index + 1}
                        </p>
                        <h3 className="mt-1 font-display text-2xl text-foreground">{item.label}</h3>
                      </div>
                    </div>
                    <p className="mt-5 whitespace-pre-line font-body text-sm leading-7 text-muted-foreground">
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <form
                onSubmit={handleSubmit}
                className="rounded-[2rem] border border-border/70 bg-card/82 p-7 shadow-[0_30px_80px_-48px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-9 lg:p-10"
              >
                <div className="flex flex-col gap-3 border-b border-border/70 pb-7 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-body text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                      Project Inquiry
                    </p>
                    <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
                      Tell us what needs to happen.
                    </h2>
                  </div>
                  <p className="max-w-xs font-body text-sm leading-7 text-muted-foreground">
                    Enough detail to understand the scope. No long form required.
                  </p>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-body text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass("name")}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-body text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass("email")}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="mb-2 block font-body text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass("phone")}
                  />
                </div>

                <div className="mt-6">
                  <label className="mb-2 block font-body text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass("message")} resize-none`}
                  />
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm font-body text-sm leading-7 text-muted-foreground">
                    We typically reply within one business day with next-step questions or a proposed call.
                  </p>
                  <MagneticButton>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 font-body text-xs font-semibold uppercase tracking-[0.24em] text-background transition-colors hover:bg-foreground/90"
                    >
                      Send Inquiry
                      <Send size={15} />
                    </button>
                  </MagneticButton>
                </div>
              </form>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
