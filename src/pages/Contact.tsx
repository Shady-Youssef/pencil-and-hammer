import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticButton from "@/components/MagneticButton";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const info = [
  { icon: MapPin, label: "Visit Us", value: "123 Design Avenue\nNew York, NY 10001" },
  { icon: Phone, label: "Call Us", value: "+1 (555) 234-5678" },
  { icon: Mail, label: "Email Us", value: "hello@mbmdesigns.com" },
  { icon: Clock, label: "Hours", value: "Mon – Fri: 9AM – 6PM\nSat: By Appointment" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll be in touch within 24 hours.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const inputClass = (field: string) =>
    `w-full bg-background border px-4 py-3 font-body text-sm text-foreground focus:outline-none transition-all duration-500 ${
      focused === field ? "border-accent shadow-[0_0_20px_hsla(38,60%,52%,0.1)]" : "border-border"
    }`;

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <section className="pt-36 pb-8 section-padding bg-background">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center">
              <div className="line-accent mx-auto mb-6" />
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-foreground mb-4">
                Contact Us
              </h1>
              <p className="font-body text-muted-foreground max-w-lg mx-auto">
                Let's start a conversation about your dream space.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding pt-8 bg-background">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16">
            {/* Info */}
            <div className="lg:col-span-2">
              <AnimatedSection direction="left">
                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-8">
                  {info.map((item, i) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-sm bg-secondary flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors duration-500">
                        <item.icon size={20} strokeWidth={1.2} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg text-foreground mb-1">{item.label}</h3>
                        <p className="font-body text-sm text-muted-foreground whitespace-pre-line">
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="right">
                <form onSubmit={handleSubmit} className="bg-card border border-border neo-border p-8 md:p-12 rounded-sm">
                  <h2 className="font-display text-2xl text-foreground mb-8">Send a Message</h2>
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="font-body text-xs tracking-wider uppercase text-muted-foreground block mb-2">
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
                      <label className="font-body text-xs tracking-wider uppercase text-muted-foreground block mb-2">
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
                  <div className="mb-6">
                    <label className="font-body text-xs tracking-wider uppercase text-muted-foreground block mb-2">
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
                  <div className="mb-8">
                    <label className="font-body text-xs tracking-wider uppercase text-muted-foreground block mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClass("message")} resize-none`}
                    />
                  </div>
                  <MagneticButton>
                    <button
                      type="submit"
                      className="bg-gradient-gold font-body text-sm tracking-widest uppercase px-10 py-4 text-charcoal font-medium hover:opacity-90 transition-opacity flex items-center gap-3"
                    >
                      Send Message <Send size={16} />
                    </button>
                  </MagneticButton>
                </form>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
