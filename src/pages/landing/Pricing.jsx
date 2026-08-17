import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PRICING_PLANS = [
  {
    id: "01",
    name: "Landing Page",
    webTypeOption: "Landing Page", // Value sesuai opsi form di Contact.jsx
    price: "Rp 1.500.000",
    description:
      "Solusi cepat & efektif untuk promosi produk, event, atau campaign bisnis Anda.",
    features: [
      "1 Halaman Responsive (Mobile & Desktop)",
      "Desain Custom & Modern (Non-Template)",
      "Integrasi Form WhatsApp / Email CTA",
      "Optimasi Kecepatan & SEO Dasar",
      "Domain & Hosting (1 Tahun)",
      "Estimasi Pengerjaan: 3 - 5 Hari",
    ],
    highlight: false,
    ctaText: "Pilih",
  },
  {
    id: "02",
    name: "Standard Web",
    webTypeOption: "Website", // Value sesuai opsi form di Contact.jsx
    price: "Rp 3.500.000",
    description:
      "Website Company Profile multi-halaman lengkap untuk meningkatkan kepercayaan calon klien.",
    features: [
      "Hingga 5-7 Halaman Utama",
      "CMS / Admin Panel (Kelola Konten)",
      "Animasi GSAP Micro-interactions",
      "Integrasi Analytics & Meta Pixel",
      "SEO Technical & Speed Optimization",
      "Bantuan Maintenance 1 Bulan",
      "Estimasi Pengerjaan: 7 - 10 Hari",
    ],
    highlight: true,
    ctaText: "Pilih",
  },
  {
    id: "03",
    name: "Premium System",
    webTypeOption: "CMS Web", // Value sesuai opsi form di Contact.jsx
    price: "Rp 7.000.000+",
    description:
      "Sistem aplikasi web custom kompleks (E-commerce, Portal, SaaS, Sistem Manajemen).",
    features: [
      "Custom Web App / E-Commerce System",
      "Integrasi Payment Gateway (Midtrans/Stripe)",
      "Database & Database Architecture Custom",
      "Sistem Hak Akses Multi-User / Admin",
      "Integrasi API Pihak Ketiga",
      "Garansi Bug-Fix 3 Bulan",
      "Estimasi Pengerjaan: 14+ Hari",
    ],
    highlight: false,
    ctaText: "Pilih",
  },
];

export default function Pricing() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".pricing-card");

      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="pricing"
      className="relative z-20 min-h-screen py-24 px-6 sm:px-12 bg-[var(--bg)] text-[var(--ink)] transition-colors duration-300 select-none flex flex-col justify-center"
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto w-full mb-16 text-center">
        <h2 className="text-4xl sm:text-6xl font-hero tracking-tight leading-none mt-2 text-[var(--ink)]">
          Paket Layanan & Harga
        </h2>
        <p className="text-base sm:text-lg opacity-80 mt-4 max-w-xl mx-auto font-sans">
          Pilih paket yang sesuai dengan skala bisnis dan kebutuhan pengembangan
          web Anda.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {PRICING_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`pricing-card border border-[var(--ink)] p-8 sm:p-10 flex flex-col justify-between relative transition-all duration-300 ${
              plan.highlight
                ? "bg-[var(--ink)] text-[var(--bg)] shadow-2xl scale-[1.02] z-10"
                : "bg-[var(--card)] text-[var(--ink)]"
            }`}
          >
            {/* Header Card & Features */}
            <div>
              <h3 className="text-3xl font-hero tracking-tight">{plan.name}</h3>

              {/* Harga */}
              <div className="mt-4 mb-6">
                <span className="text-3xl sm:text-4xl font-bold font-mono tracking-tight">
                  {plan.price}
                </span>
              </div>

              <p className="text-xs sm:text-sm opacity-80 leading-relaxed mb-8 font-sans">
                {plan.description}
              </p>

              {/* Fitur Layanan */}
              <div className="border-t border-current opacity-20 my-6" />

              <ul className="space-y-3 mb-10">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs sm:text-sm"
                  >
                    <span className="font-mono text-emerald-500 font-bold">
                      ✓
                    </span>
                    <span className="opacity-90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link
                to="/contact"
                state={{ selectedWebType: plan.webTypeOption }}
                className={`inline-flex items-center justify-between w-full px-6 py-4 font-mono text-xs uppercase font-bold tracking-wider border transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlight
                    ? "bg-[var(--bg)] text-[var(--ink)] border-[var(--bg)]"
                    : "bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)] hover:opacity-90"
                }`}
              >
                <span>{plan.ctaText}</span>
                <span>↗</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
