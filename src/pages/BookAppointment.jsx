import { useState, useMemo } from "react";
import "../styles/book.css";
import { CalendarDays, Clock, User, Mail, Phone, Check } from "lucide-react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";

export default function BookAppointment() {
  const [step, setStep] = useState(1);
  //   const isPast = day.date < new Date().setHours(0, 0, 0, 0);

  //   const dates = useMemo(() => getNextNDays(30), []);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    note: "",
  });
  const [errors, setErrors] = useState({});

  const [bookedSlots, setBookedSlots] = useState({});

  const schedule = {
    default: ["09:00", "10:00", "11:00", "13:00", "15:00", "17:00"],
  };

  const times = schedule.default;

  const calendarDays = useMemo(
    () => getCalendarDays(currentMonth),
    [currentMonth]
  );

  function getCalendarDays(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Hari pertama bulan ini
    const first = new Date(year, month, 1);
    const firstDay = first.getDay(); // 0 Minggu, 1 Senin, ... 6 Sabtu

    // Jumlah hari bulan ini
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];

    // Blank sebelum tanggal 1 (untuk posisinya)
    for (let i = 0; i < firstDay; i++) {
      days.push({ empty: true });
    }

    // Isi tanggal asli
    for (let d = 1; d <= totalDays; d++) {
      const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        d
      ).padStart(2, "0")}`;
      days.push({
        date: new Date(year, month, d),
        iso,
      });
    }

    return days;
  }

  function isOperational(iso) {
    const d = new Date(iso);
    const dow = d.getDay();
    return dow !== 0 && dow !== 6;
  }

  function availableTimesForDate(isoDate) {
    if (!isoDate) return [];
    const d = new Date(isoDate);
    const dow = d.getDay();

    // kalau sabtu/minggu → tutup
    if (dow === 0 || dow === 6) return [];

    const times = schedule.default;
    const booked = bookedSlots[isoDate] ?? [];

    return times.map((t) => ({ time: t, disabled: booked.includes(t) }));
  }

  function handleNext() {
    if (step === 1) {
      if (!selectedDate) return flash("Pilih tanggal dulu.");
      setStep(2);
    } else if (step === 2) {
      if (!selectedTime) return flash("Pilih jam kunjungan.");
      setStep(3);
    } else if (step === 3) {
      if (!validateForm()) return;
      setStep(4);
    }
  }

  function handleBack() {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  }

  function flash(msg) {
    setErrors({ general: msg });
    setTimeout(() => setErrors({}), 2400);
  }

  function validateForm() {
    const e = {};
    if (!form.name.trim()) e.name = "Nama wajib.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email || ""))
      e.email = "Email tidak valid.";
    if (!/^\+?\d{8,15}$/.test(form.phone.replace(/\s|-/g, "")))
      e.phone = "Format nomor tidak valid.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleConfirm() {
    if (!selectedDate || !selectedTime) return flash("Tidak lengkap.");

    setBookedSlots((prev) => {
      const arr = Array.isArray(prev[selectedDate])
        ? prev[selectedDate].slice()
        : [];
      arr.push(selectedTime);
      return { ...prev, [selectedDate]: arr };
    });

    await sendToBackend({
      date: selectedDate,
      time: selectedTime,
      ...form,
    });

    const icsUrl = createICS({
      title: "Showroom Appointment",
      description: `Visit appointment.\nNote: ${form.note || "-"}`,
      startIso: combineDateTimeISO(selectedDate, selectedTime),
      durationMinutes: 30,
      location: "Showroom Address",
    });

    downloadFile(icsUrl, "appointment.ics");

    const wa = buildWhatsApp({
      date: selectedDate,
      time: selectedTime,
      name: form.name,
      phone: form.phone,
      email: form.email,
    });

    window.open(wa, "_blank");

    setStep(5);
  }

  return (
    <main className="booking-wrapper">
        <Navbar/>
      {/* LEFT */}
      <section className="booking-left">
        <h1>Visit Our Showroom</h1>
        <p className="booking-desc">
          Schedule a private 30-minute visit. Choose your date, time, and share
          a few details.
        </p>

        <div className="booking-info">
          <p>
            <strong>Open:</strong> Thu 12–6 pm · Sat 12–5 pm
          </p>
          <p>
            <strong>Address:</strong> Your Showroom Address
          </p>
          <p>
            <strong>Phone:</strong> 0000 0000 000
          </p>
          <p>
            <strong>Email:</strong> admin@yourbrand.com
          </p>
        </div>

        <div className="booking-contact-row">
          <button
            className="booking-wa"
            onClick={() =>
              window.open(
                "https://wa.me/0000000000?text=Hi, saya ingin bertanya tentang showroom.",
                "_blank"
              )
            }
          >
            WhatsApp Us
          </button>

          <button
            className="booking-addcal"
            onClick={() =>
              alert("Add-to-calendar available after confirmation.")
            }
          >
            Add calendar
          </button>
        </div>

        <img className="booking-img" src="/src/assets/img/model/MD21.jpg" alt="Showroom" />
      </section>

      {/* RIGHT PANEL */}
      <section className="booking-right">
        <div className="booking-card">
          <div className="booking-brand">YOUR BRAND</div>
          <h2 className="booking-title">Showroom Appointment</h2>

          <div className="booking-meta">
            <span>
              <Clock size={16} /> 30 min
            </span>
            <span>
              <CalendarDays size={16} /> Your Showroom
            </span>
          </div>

          <ProgressDots step={step} />

          {errors.general && (
            <div className="booking-error">{errors.general}</div>
          )}

          {/* Step 1 */}
          {step === 1 && (
            <>
              <h3 className="booking-sub">Select Date</h3>

              <div className="booking-month-nav">
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() - 1,
                        1
                      )
                    )
                  }
                >
                  ←
                </button>

                <span className="booking-month-label">
                  {currentMonth.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>

                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() + 1,
                        1
                      )
                    )
                  }
                >
                  →
                </button>
              </div>

              <div className="booking-calendar">
                {calendarDays.map((day, i) => {
                  if (day.empty) {
                    return <div key={i} className="booking-day empty"></div>;
                  }

                  const dow = day.date.getDay();
                  const disabled = dow === 0 || dow === 6;

                  return (
                    <button
                      key={day.iso}
                      className={`booking-day ${
                        selectedDate === day.iso ? "active" : ""
                      } ${disabled ? "disabled" : ""}`}
                      disabled={disabled}
                      onClick={() => !disabled && setSelectedDate(day.iso)}
                    >
                      <div className="day-week">
                        {day.date.toLocaleDateString(undefined, {
                          weekday: "short",
                        })}
                      </div>
                      <div className="day-num">{day.date.getDate()}</div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <h3 className="booking-sub">Select Time</h3>
              <div className="times-grid">
                {availableTimesForDate(selectedDate).map(
                  ({ time, disabled }) => (
                    <button
                      key={time}
                      className={`time-slot ${
                        selectedTime === time ? "selected" : ""
                      }`}
                      onClick={() => !disabled && setSelectedTime(time)}
                      disabled={disabled}
                    >
                      {disabled ? (
                        <span className="muted">{time} — Booked</span>
                      ) : (
                        time
                      )}
                    </button>
                  )
                )}
              </div>
            </>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <>
              <h3 className="booking-sub">Your Information</h3>
              <div className="form-row">
                <label className={errors.name ? "error" : ""}>
                  <User size={14} />
                  <input
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </label>
                {errors.name && (
                  <small className="field-error">{errors.name}</small>
                )}

                <label className={errors.email ? "error" : ""}>
                  <Mail size={14} />
                  <input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </label>
                {errors.email && (
                  <small className="field-error">{errors.email}</small>
                )}

                <label className={errors.phone ? "error" : ""}>
                  <Phone size={14} />
                  <input
                    placeholder="+62..."
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: formatPhone(e.target.value) })
                    }
                  />
                </label>
                {errors.phone && (
                  <small className="field-error">{errors.phone}</small>
                )}

                <label>
                  <textarea
                    placeholder="Notes (optional)"
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                  />
                </label>
              </div>
            </>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <>
              <h3 className="booking-sub">Review & Confirm</h3>

              <div className="review-card">
                <div className="rc-row">
                  <div>
                    <strong>{formatLong(selectedDate)}</strong>
                    <div className="muted">{selectedTime} · 30 minutes</div>
                  </div>
                  <div className="muted">{form.name}</div>
                </div>

                <div className="rc-row small">
                  <div>
                    <div className="muted">Location</div>
                    Your Showroom Address
                  </div>
                  <div>
                    <div className="muted">Contact</div>
                    {form.email} · {form.phone}
                  </div>
                </div>

                <div className="rc-note">
                  <div className="muted">Notes</div>
                  {form.note || "-"}
                </div>
              </div>

              <div className="confirm-actions">
                <button
                  className="booking-submit booking-submit-confirm"
                  onClick={handleConfirm}
                >
                  <Check size={16} /> Confirm & Send
                </button>
                <button className="booking-tertiary" onClick={() => setStep(3)}>
                  Edit Info
                </button>
              </div>
            </>
          )}

          {step === 5 && (
            <div className="success-state">
              <h3>Appointment Confirmed</h3>
              <p>
                You can add the event to your calendar using the downloaded
                file.
              </p>
              <button
                className="booking-submit"
                onClick={() => (window.location.href = "/")}
              >
                Back to Home
              </button>
            </div>
          )}

          {step > 0 && step < 5 && (
            <div className="card-footer">
              <button
                className="booking-back"
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </button>

              <div className="footer-right">
                <div className="muted small">
                  {step < 4 ? `Step ${step} of 4` : ""}
                </div>
                <button className="booking-submit" onClick={handleNext}>
                  {step === 3 ? "Review" : "Continue"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* Helpers */
function ProgressDots({ step }) {
  return (
    <div className="progress-dots">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={`dot ${i <= step ? "active" : ""}`}>
          <span>{i}</span>
        </div>
      ))}
    </div>
  );
}

const toIso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

function formatLong(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const combineDateTimeISO = (d, t) => `${d}T${t}:00`;

function downloadFile(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}

function createICS({
  title,
  description,
  startIso,
  durationMinutes,
  location,
}) {
  const start = new Date(startIso);
  const end = new Date(start.getTime() + durationMinutes * 60000);
  const fix = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${fix(start)}
DTEND:${fix(end)}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;

  return `data:text/calendar;charset=utf8,${encodeURIComponent(ics)}`;
}

function buildWhatsApp({ date, time, name, phone, email }) {
  const msg = `Hi, saya ingin booking kunjungan showroom:
- Tanggal: ${formatLong(date)}
- Jam: ${time}
- Nama: ${name}
- Email: ${email}
- Phone: ${phone}`;
  const target = "0000000000"; // replace
  return `https://wa.me/${target}?text=${encodeURIComponent(msg)}`;
}

function formatPhone(v) {
  return v.replace(/[^\d+]/g, "");
}

async function sendToBackend(data) {
  console.log("Send to backend here:", data);
}
