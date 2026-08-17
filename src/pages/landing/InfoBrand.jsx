import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function InfoBrand() {
  const brandRef = useRef(null);

  useGSAP(
    () => {
      const scopeEl = brandRef.current;
      if (!scopeEl) return;

      // 1. Parallax Lift Effect (Menggunakan yPercent halus)
      gsap.fromTo(
        scopeEl,
        { yPercent: 15 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: scopeEl,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      // 2. Reveal Animation dengan fromTo agar terhindar dari bug "konten hilang saat refresh"
      const cards = scopeEl.querySelectorAll(".card-bento, .card-bento-dark");

      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "transform", // Menghapus properti inline setelah animasi selesai agar layout CSS murni tetap aman
            scrollTrigger: {
              trigger: scopeEl,
              start: "top 75%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          },
        );
      }

      // Memaksa refresh ScrollTrigger setelah komponen terpasang sepenuhnya
      ScrollTrigger.refresh();
    },
    { scope: brandRef },
  );

  return (
    <section
      ref={brandRef}
      id="brand"
      className="relative z-20 min-h-screen py-24 px-6 sm:px-12 bg-[var(--bg)] text-[var(--ink)] transition-colors duration-300 select-none flex flex-col justify-center will-change-transform"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-2">
        {/* BENTO CARD 1 */}
        <div className="card-bento lg:col-span-7">
          {/* Showcase Image */}
          <div className="flex items-start gap-4 mb-10">
            <div className="relative w-44 h-32 border border-[var(--ink)] bg-neutral-200 overflow-hidden shrink-0 group">
              <img
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop"
                alt="Website Portfolio Preview"
                loading="lazy"
                decoding="async"
                onLoad={() => ScrollTrigger.refresh()} // Hitung ulang trigger setelah gambar berhasil dimuat
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <span className="badge-tag absolute bottom-2 left-2">
                Featured Work
              </span>
            </div>
          </div>

          {/* Heading Promosi */}
          <div>
            <h2 className="heading-section mt-2">
              Elevate your business online.
            </h2>

            <p className="text-subtext mt-4 max-w-lg">
              Kami merancang website profesional, cepat, dan responsif untuk
              meningkatkan kredibilitas serta penjualan bisnis Anda.
            </p>
          </div>
        </div>

        {/* BENTO CARD 2 */}
        <div className="card-bento-dark lg:col-span-5">
          <div className="flex justify-between items-start">
            <span className="text-5xl font-serif leading-none opacity-40">
              “
            </span>
          </div>

          <p className="heading-card my-8">
            Desain modern yang efisien, dioptimalkan untuk performa tinggi dan
            konversi penjualan bisnis Anda.
          </p>

          <div className="border-t border-white/20 pt-4 flex justify-between items-center">
            <span className="text-label-mono">
              — Garansi Performa & SEO Friendly
            </span>

            <a
              href="#contact"
              className="link-hover-pink underline underline-offset-4"
            >
              Konsultasi Gratis ↗
            </a>
          </div>
        </div>

        {/* BENTO CARD 3 */}
        <div className="card-bento lg:col-span-4 bg-black min-h-[220px] items-center justify-center group">
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-70 group-hover:scale-105 transition-transform duration-700">
            <iframe
              className="w-full h-full scale-150 origin-center"
              src="https://www.youtube.com/embed/g7xkVEWrX8E?autoplay=1&mute=1&loop=1&playlist=g7xkVEWrX8E&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1"
              title="YouTube Autoplay Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{ border: 0 }}
            />
          </div>
        </div>

        {/* BENTO CARD 4 */}
        <div className="card-bento lg:col-span-8 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-[var(--line)] pb-4">
            <div>
              <h3 className="heading-card">Layanan Pembuatan Website</h3>

              <p className="text-label-mono mt-0.5">
                Proyek siap dikerjakan dalam waktu 3-7 hari kerja.
              </p>
            </div>

            <a href="#contact" className="btn-primary">
              Pesan Website
            </a>
          </div>

          {/* Sub-Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="card-bento-inner">
              <div>
                <span className="text-label-mono block mb-1">
                  Landing Page / Company Profile
                </span>

                <p className="text-xs font-semibold leading-snug text-[var(--ink)]">
                  Desain landing page conversion-focused untuk promosi produk &
                  jasa.
                </p>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[var(--muted)] mt-3">
                <span>ESTIMASI: 3 - 5 HARI</span>
                <span className="font-bold text-[var(--ink)]">SIAP RILIS</span>
              </div>
            </div>

            <div className="card-bento-inner">
              <div>
                <span className="text-label-mono block mb-1">
                  Web Application / E-Commerce
                </span>

                <p className="text-xs font-semibold leading-snug text-[var(--ink)]">
                  Pengembangan sistem custom web app responsif dengan integrasi
                  fitur lengkap.
                </p>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[var(--muted)] mt-3">
                <span>ESTIMASI: 7 - 14 HARI</span>
                <span className="font-bold text-[var(--ink)]">
                  CUSTOM SYSTEM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}