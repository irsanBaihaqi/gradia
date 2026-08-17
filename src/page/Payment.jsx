import { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
const GOOGLE_SHEETS_SCRIPT_URL =
  "***";
const PRICE_MAP = {
  "Landing Page": 1500000,
  Website: 3500000,
  "CMS Web": 7000000,
};
export default function Payment() {
  const containerRef = useRef(null);
  const pillRef = useRef(null);
  const location = useLocation();

  // State Tab Switcher
  const [activeTab, setActiveTab] = useState("details");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tangkap pilihan jenis web dari Pricing.jsx (default: 'Landing Page')
  const initialWebType = location.state?.selectedWebType || "Landing Page";

  // State Form Data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    webType: initialWebType,
    timelineType: "Standar",
    description: "",
    paymentMethod: "qris",
  });
  useEffect(() => {
    const snapScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = "SB-Mid-client-XXXXXX";

    const script = document.createElement("script");
    script.src = snapScriptUrl;
    script.setAttribute("data-client-key", clientKey);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const basePrice = PRICE_MAP[formData.webType] || 1500000;
  const dpAmount = basePrice * 0.5;

  const isFormValid = Boolean(
    formData.name.trim() &&
    formData.phone.trim() &&
    formData.webType &&
    formData.timelineType &&
    formData.description.trim(),
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handler Pindah Tab
  const handleTabChange = (tab) => {
    if (tab === "payment" && !isFormValid) return;

    setActiveTab(tab);

    if (tab === "details") {
      gsap.to(pillRef.current, { x: "0%", duration: 0.35, ease: "power2.out" });
    } else {
      gsap.to(pillRef.current, {
        x: "100%",
        duration: 0.35,
        ease: "power2.out",
      });
    }

    gsap.fromTo(
      ".tab-content",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
    );
  };

  // 1. Submit Form Pertama -> Kirim ke Google Sheets & Pindah ke Pembayaran
  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      // Kirim Data Pemesan ke Google Spreadsheet via Apps Script
      await fetch(GOOGLE_SHEETS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          ...formData,
          totalPrice: basePrice,
          dpAmount: dpAmount,
          status: "Pending Payment",
        }),
      });

      // Pindah ke Tab Pembayaran
      handleTabChange("payment");
    } catch (error) {
      console.error("Gagal menyimpan data ke Google Sheets:", error);
      alert("Terjadi kesalahan teknis. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMidtransPayment = async () => {
    if (!window.snap) {
      alert(
        "Sistem pembayaran sedang disiapkan. Silakan coba beberapa detik lagi.",
      );
      return;
    }

    try {
      // Panggil backend API Anda untuk mendapatkan Transaction Snap Token
      // Contoh: const response = await fetch('/api/create-transaction', { method: 'POST', body: JSON.stringify(...) });
      // const { token } = await response.json();

      // Memicu Pop-up Midtrans Snap (Gunakan Snap Token dari backend Anda)
      window.snap.pay("YOUR_SNAP_TRANSACTION_TOKEN", {
        onSuccess: function (result) {
          alert(
            `Pembayaran DP Berhasil!\n\nInvoice PDF telah dikirimkan ke email Anda. Tim Gradia Studio akan segera menghubungi No. WhatsApp (${formData.phone}) Anda untuk koordinasi pengerjaan proyek.`,
          );
          console.log("Midtrans Success:", result);
        },
        onPending: function (result) {
          alert(
            "Menunggu pembayaran Anda. Silakan selesaikan transaksi sesuai petunjuk.",
          );
          console.log("Midtrans Pending:", result);
        },
        onError: function (result) {
          alert("Pembayaran gagal atau dibatalkan. Silakan coba kembali.");
          console.error("Midtrans Error:", result);
        },
        onClose: function () {
          alert("Anda menutup halaman pembayaran sebelum transaksi selesai.");
        },
      });
    } catch (err) {
      console.error("Gagal memproses transaksi Midtrans:", err);
    }
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".anim-left", { x: -30, opacity: 0, duration: 0.6 }).from(
        ".anim-right",
        { x: 30, opacity: 0, duration: 0.6 },
        "-=0.4",
      );
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="h-screen w-screen bg-[#EFEFEF] text-[#1A1A1A] font-helvetica p-6 lg:p-12 flex flex-col justify-between overflow-hidden box-border select-none"
    >
      {/* Top Header Navigation */}
      <nav className="anim-left flex items-center justify-between shrink-0 max-w-6xl mx-auto w-full">
        <Link
          to="/"
          className="text-xs font-semibold uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity"
        >
          ← Beranda
        </Link>
        <span className="text-xs font-semibold uppercase tracking-wider opacity-40">
          Gradia Studio
        </span>
      </nav>

      {/* Main 2-Column Layout */}
      <div className="max-w-6xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Left Column */}
        <div className="anim-left lg:col-span-5 flex flex-col gap-6 pt-4">
          <h1 className="text-5xl lg:text-7xl font-medium tracking-tight leading-[0.95] text-black">
            Simple <br />
            pricing
          </h1>
          <div className="flex flex-col gap-4 text-sm opacity-70 max-w-md leading-relaxed">
            <p>
              Sebagian besar proyek disesuaikan berdasarkan kebutuhan Anda,
              namun kami tetap memberikan kejelasan mengenai estimasi waktu dan
              anggaran.
            </p>
            <p>
              Untuk kebutuhan jangka panjang, kami juga menyediakan kolaborasi
              pengerjaan secara berkala.
            </p>
          </div>
        </div>

        {/* Right Column: Card Container & Tab Pill */}
        <div className="anim-right lg:col-span-7 flex flex-col gap-4">
          {/* Top Pill Segment Switcher */}
          <div className="self-center lg:self-start relative bg-[#E4E4E4] p-1 rounded-full flex items-center w-64 border border-black/5">
            <div
              ref={pillRef}
              className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-transform"
            />
            <button
              type="button"
              onClick={() => handleTabChange("details")}
              className={`relative z-10 w-1/2 py-2 text-xs font-semibold transition-colors text-center cursor-pointer ${
                activeTab === "details" ? "text-black" : "opacity-50"
              }`}
            >
              Single project
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("payment")}
              disabled={!isFormValid}
              title={!isFormValid ? "Lengkapi formulir terlebih dahulu" : ""}
              className={`relative z-10 w-1/2 py-2 text-xs font-semibold transition-colors text-center ${
                !isFormValid
                  ? "opacity-30 cursor-not-allowed"
                  : activeTab === "payment"
                    ? "text-black cursor-pointer"
                    : "opacity-50 hover:opacity-100 cursor-pointer"
              }`}
            >
              Pembayaran
            </button>
          </div>

          {/* White Content Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-black/5 min-h-[500px] flex flex-col justify-between">
            <div className="tab-content flex-1 flex flex-col justify-between">
              {/* ================= STEP 1: FORM DETAIL ================= */}
              {activeTab === "details" && (
                <form
                  onSubmit={handleProceedToPayment}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-black">
                      Single Project
                    </h2>
                    <p className="text-xs opacity-60 mt-1">
                      Untuk proyek terdefinisi dengan alur kerja, jangka waktu,
                      dan anggaran yang jelas.
                    </p>
                  </div>

                  {/* Section 1: Informasi Kontak */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-black/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold opacity-40">
                        1
                      </span>
                      <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">
                        INFORMASI KONTAK
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        name="name"
                        placeholder="Nama Lengkap *"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#F4F4F4] text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-black/20"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="No. WhatsApp *"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#F4F4F4] text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-black/20"
                      />
                      <input
                        type="text"
                        name="company"
                        placeholder="Nama Perusahaan"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#F4F4F4] text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-black/20"
                      />
                    </div>
                  </div>

                  {/* Section 2: Jenis Website */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-black/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold opacity-40">
                        2
                      </span>
                      <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">
                        JENIS WEBSITE
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {["Landing Page", "Website", "CMS Web"].map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => handleSelect("webType", type)}
                          className={`py-3 px-3 text-xs font-semibold rounded-xl text-center transition-all cursor-pointer ${
                            formData.webType === type
                              ? "bg-black text-white"
                              : "bg-[#F4F4F4] text-black hover:bg-[#EAEAEA]"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Section 3: Tipe Pengerjaan */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-black/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold opacity-40">
                        3
                      </span>
                      <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">
                        TIPE PENGERJAAN
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "Standar", label: "Standar (Waktu Normal)" },
                        { id: "Express", label: "Express (Prioritas)" },
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => handleSelect("timelineType", item.id)}
                          className={`py-3 px-4 text-xs font-semibold rounded-xl text-center transition-all cursor-pointer ${
                            formData.timelineType === item.id
                              ? "bg-black text-white"
                              : "bg-[#F4F4F4] text-black hover:bg-[#EAEAEA]"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Section 4: Deskripsi */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-black/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold opacity-40">
                        4
                      </span>
                      <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">
                        DESKRIPSI PROYEK
                      </span>
                    </div>
                    <textarea
                      name="description"
                      rows={3}
                      placeholder="Jelaskan gambaran umum proyek Anda *"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full p-4 bg-[#F4F4F4] text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-black/20 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                      isFormValid && !isSubmitting
                        ? "bg-black text-white hover:bg-neutral-800 cursor-pointer shadow-md"
                        : "bg-black/10 text-black/30 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting
                      ? "Menyimpan Data..."
                      : "Lanjut ke Pembayaran"}
                  </button>
                </form>
              )}

              {/* ================= STEP 2: PEMBAYARAN ================= */}
              {activeTab === "payment" && (
                <div className="flex flex-col justify-between h-full gap-6">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-black">
                      Pembayaran DP (50%)
                    </h2>
                    <p className="text-xs opacity-60 mt-1">
                      Selesaikan transaksi awal untuk memulai pengerjaan proyek
                      Anda.
                    </p>
                  </div>

                  {/* Ringkasan Data & Tagihan DP */}
                  <div className="bg-[#F4F4F4] p-5 rounded-2xl flex flex-col gap-3 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-black/10">
                      <span className="font-bold uppercase tracking-wider opacity-50">
                        Ringkasan Pesanan
                      </span>
                      <button
                        type="button"
                        onClick={() => handleTabChange("details")}
                        className="text-xs font-semibold text-black underline cursor-pointer"
                      >
                        Ubah
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-black">
                      <div>
                        <span className="opacity-50 block">Nama:</span>
                        <strong>{formData.name}</strong>
                      </div>
                      <div>
                        <span className="opacity-50 block">No. WhatsApp:</span>
                        <strong>{formData.phone}</strong>
                      </div>
                      <div>
                        <span className="opacity-50 block">Jenis Web:</span>
                        <strong>{formData.webType}</strong>
                      </div>
                      <div>
                        <span className="opacity-50 block">Pengerjaan:</span>
                        <strong>{formData.timelineType}</strong>
                      </div>
                    </div>

                    <div className="mt-2 pt-3 border-t border-black/10 flex justify-between items-center">
                      <span className="font-semibold">
                        Total Tagihan DP (50%):
                      </span>
                      <span className="text-base font-bold font-mono text-emerald-600">
                        Rp {dpAmount.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  {/* Metrik Alur Layanan */}
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 leading-relaxed">
                    <strong>Alur Setelah Pembayaran:</strong>
                    <ol className="list-decimal list-inside mt-1 space-y-1">
                      <li>
                        Transaksi diverifikasi otomatis oleh Gateway Midtrans.
                      </li>
                      <li>
                        Invoice PDF resmi akan dikirimkan otomatis ke email
                        Anda.
                      </li>
                      <li>
                        Tim Gradia Studio akan menghubungi WhatsApp Anda untuk
                        koordinasi detail.
                      </li>
                    </ol>
                  </div>

                  {/* Tombol Konfirmasi Akhir */}
                  <button
                    type="button"
                    onClick={handleMidtransPayment}
                    className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-all cursor-pointer shadow-md"
                  >
                    Bayar DP Sekarang (Rp {dpAmount.toLocaleString("id-ID")}) ↗
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
