"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useI18n } from "@/lib/i18n";
import { getServices } from "@/lib/services";
import { useState, useMemo, useRef } from "react";
import { Calendar, Clock, CheckCircle, Download, ExternalLink, Paperclip, X } from "lucide-react";
import FloatingShapes from "./FloatingShapes";

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

function generateGoogleCalendarUrl(name: string, email: string, service: string, date: string, time: string) {
  const start = new Date(`${date}T${time}:00`);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `EE Studio - ${service || "Rendez-vous"}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `Rendez-vous avec ${name} (${email})${service ? ` pour ${service}` : ""}`,
    location: "Kinshasa, RDC",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function generateICalData(name: string, email: string, service: string, date: string, time: string) {
  const start = new Date(`${date}T${time}:00`);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//EE Studio//Booking//FR",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:EE Studio - ${service || "Rendez-vous"}`,
    `DESCRIPTION:Rendez-vous avec ${name} (${email})${service ? ` pour ${service}` : ""}`,
    "LOCATION:Kinshasa, RDC",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export default function Booking() {
  const { next } = usePastelRotation();
  const { lang, t } = useI18n();
  const services = getServices(lang);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [btnColor, setBtnColor] = useState("#333");
  const [focusColors, setFocusColors] = useState<Record<string, string>>({});

  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const fullName = `${formData.firstName} ${formData.lastName}`.trim();

  const handleFocus = (field: string) => setFocusColors((p) => ({ ...p, [field]: next() }));
  const handleBlur = (field: string) =>
    setFocusColors((p) => {
      const c = { ...p };
      delete c[field];
      return c;
    });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== "application/pdf") {
      setError("Seuls les fichiers PDF sont acceptés.");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("Fichier trop volumineux (max 10 Mo).");
      return;
    }
    setError(null);
    setFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(formData.firstName && formData.lastName && formData.email)) return;
    setSubmitting(true);
    setError(null);
    try {
      let attachmentUrl: string | undefined;
      let attachmentName: string | undefined;

      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        const up = await fetch("/api/bookings/attachment", { method: "POST", body: fd });
        if (up.ok) {
          const data = await up.json();
          attachmentUrl = data.url;
          attachmentName = data.name;
        }
        // Si l'upload échoue (stockage non configuré), on continue sans bloquer.
      }

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, attachmentUrl, attachmentName }),
      });
      if (!res.ok) throw new Error("request failed");
      setConfirmed(true);
    } catch {
      setError(t.booking.error ?? "Une erreur est survenue. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  const downloadIcal = () => {
    const data = generateICalData(fullName, formData.email, formData.service, formData.date, formData.time);
    const blob = new Blob([data], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ee-studio-rdv.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputStyle = (field: string) => ({
    borderBottomColor: focusColors[field] || "rgba(255,255,255,0.08)",
    borderBottomWidth: "1.5px" as const,
    boxShadow: focusColors[field] ? `0 4px 15px ${focusColors[field]}10` : "none",
  });

  const inputCls =
    "w-full bg-transparent border-b py-4 text-base font-light text-[#F5F5F0] placeholder-[#555] outline-none transition-all duration-300 focus:placeholder-[#888]";
  const optional = ` (${t.booking.optional})`;

  return (
    <section id="booking" className="relative py-28 md:py-40 overflow-hidden">
      <FloatingShapes count={8} seed={7} />
      <div className="absolute top-20 left-10 w-[300px] h-[300px] rounded-full opacity-[0.04] blur-3xl pointer-events-none" style={{ background: "#A8D8C8" }} />
      <div className="absolute bottom-20 right-10 w-[250px] h-[250px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: "#F2B5D4" }} />

      <div className="max-w-5xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="text-center mb-20">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="text-sm tracking-[0.25em] uppercase text-[#A8D8C8] mb-5">
            {t.booking.label}
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-['Outfit']" style={{ fontWeight: 700 }}>
            {t.booking.title_prefix}
            <span className="text-[#A8D8C8]">{t.booking.title_highlight}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: 0.2 }} className="text-sm text-[#888] font-light mt-6 max-w-lg mx-auto leading-relaxed">
            {t.booking.desc}
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {!confirmed ? (
              <motion.form key="form" onSubmit={handleSubmit} className="space-y-7" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <input type="text" placeholder={t.booking.first_name + " *"} value={formData.firstName} onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))} onFocus={() => handleFocus("bfirst")} onBlur={() => handleBlur("bfirst")} required className={inputCls} style={inputStyle("bfirst")} />
                  <input type="text" placeholder={t.booking.last_name + " *"} value={formData.lastName} onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))} onFocus={() => handleFocus("blast")} onBlur={() => handleBlur("blast")} required className={inputCls} style={inputStyle("blast")} />
                </div>

                <input type="email" placeholder={t.booking.email + " *"} value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} onFocus={() => handleFocus("bemail")} onBlur={() => handleBlur("bemail")} required className={inputCls} style={inputStyle("bemail")} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <input type="tel" placeholder={t.booking.phone + optional} value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} onFocus={() => handleFocus("bphone")} onBlur={() => handleBlur("bphone")} className={inputCls} style={inputStyle("bphone")} />
                  <input type="text" placeholder={t.booking.company + optional} value={formData.company} onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))} onFocus={() => handleFocus("bcompany")} onBlur={() => handleBlur("bcompany")} className={inputCls} style={inputStyle("bcompany")} />
                </div>

                <div className="relative">
                  <select value={formData.service} onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))} onFocus={() => handleFocus("bservice")} onBlur={() => handleBlur("bservice")} className="w-full bg-transparent border-b py-4 text-base font-light text-[#F5F5F0] outline-none transition-all duration-300 appearance-none cursor-pointer" style={inputStyle("bservice")}>
                    <option value="" className="bg-[#111] text-[#555]">{t.booking.service_placeholder + optional}</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.title} className="bg-[#111] text-[#F5F5F0]">{s.title}</option>
                    ))}
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#555]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 4.5L6 7.5L9 4.5" /></svg>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="text-[11px] tracking-[0.15em] uppercase text-[#555] mb-2 block">
                      <Calendar size={12} className="inline mr-2 -mt-0.5" />{t.booking.date}
                    </label>
                    <input type="date" value={formData.date} min={minDate} onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))} onFocus={() => handleFocus("bdate")} onBlur={() => handleBlur("bdate")} className="w-full bg-transparent border-b py-3 text-base font-light text-[#F5F5F0] outline-none transition-all duration-300 [color-scheme:dark]" style={inputStyle("bdate")} />
                  </div>
                  <div>
                    <label className="text-[11px] tracking-[0.15em] uppercase text-[#555] mb-2 block">
                      <Clock size={12} className="inline mr-2 -mt-0.5" />{t.booking.time}
                    </label>
                    <select value={formData.time} onChange={(e) => setFormData((p) => ({ ...p, time: e.target.value }))} onFocus={() => handleFocus("btime")} onBlur={() => handleBlur("btime")} className="w-full bg-transparent border-b py-3 text-base font-light text-[#F5F5F0] outline-none transition-all duration-300 appearance-none cursor-pointer [color-scheme:dark]" style={inputStyle("btime")}>
                      <option value="" className="bg-[#111] text-[#555]">--:--</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot} className="bg-[#111] text-[#F5F5F0]">{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <textarea placeholder={t.booking.message + optional} value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} onFocus={() => handleFocus("bmsg")} onBlur={() => handleBlur("bmsg")} rows={3} className="w-full bg-transparent border-b py-4 text-base font-light text-[#F5F5F0] placeholder-[#555] outline-none transition-all duration-300 focus:placeholder-[#888] resize-none" style={inputStyle("bmsg")} />

                <div>
                  <input ref={fileInputRef} type="file" accept="application/pdf" onChange={onFileChange} className="hidden" />
                  {!file ? (
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-3 text-sm text-[#888] hover:text-[#A8D8C8] transition-colors group">
                      <span className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#A8D8C8]/40">
                        <Paperclip size={15} />
                      </span>
                      <span>
                        {t.booking.attachment}
                        <span className="block text-[11px] text-[#555]">{t.booking.attachment_hint}</span>
                      </span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-between gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
                      <span className="flex items-center gap-2 text-sm text-[#ccc] truncate">
                        <Paperclip size={14} className="text-[#A8D8C8] shrink-0" />
                        <span className="truncate">{file.name}</span>
                      </span>
                      <button type="button" onClick={() => setFile(null)} className="text-[#666] hover:text-[#F2B5D4]">
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-4 text-center">
                  {error && <p className="mb-4 text-sm text-[#F2B5D4] font-light">{error}</p>}
                  <button type="submit" disabled={submitting} onMouseEnter={() => setBtnColor(next())} onMouseLeave={() => setBtnColor("#333")} className="px-12 py-4 rounded-full text-sm tracking-[0.12em] uppercase font-light border transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" style={{ borderColor: btnColor === "#333" ? "rgba(255,255,255,0.1)" : btnColor, color: btnColor === "#333" ? "#BBB" : btnColor, boxShadow: btnColor !== "#333" ? `0 0 30px ${btnColor}18` : "none" }}>
                    {submitting ? (file ? t.booking.uploading : "...") : t.booking.confirm}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center space-y-8">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
                  <CheckCircle size={48} strokeWidth={1.5} className="mx-auto text-[#A8D8C8]" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-['Outfit'] font-semibold text-[#F5F5F0] mb-2">{t.booking.success}</h3>
                  <p className="text-sm text-[#888] font-light">{t.booking.success_desc}</p>
                </div>
                {formData.date && formData.time && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href={generateGoogleCalendarUrl(fullName, formData.email, formData.service, formData.date, formData.time)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-wide font-light border border-[#A8D8C8]/30 text-[#A8D8C8] hover:bg-[#A8D8C8]/10 transition-all duration-300">
                      <ExternalLink size={14} />{t.booking.google}
                    </a>
                    <button onClick={downloadIcal} className="flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-wide font-light border border-[#C3B1E1]/30 text-[#C3B1E1] hover:bg-[#C3B1E1]/10 transition-all duration-300">
                      <Download size={14} />{t.booking.ical}
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
