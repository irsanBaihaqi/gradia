import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FAQS = [
  {
    id: "01",
    question: "Berapa lama proses pembuatan website hingga siap rilis?",
    answer:
      "Untuk Landing Page membutuhkan waktu 3 - 5 hari kerja. Sedangkan untuk Company Profile atau Web App custom berkisar antara 7 hingga 14 hari kerja tergantung kompleksitas fitur.",
  },
  {
    id: "02",
    question: "Apakah desain dibuat custom atau menggunakan template?",
    answer:
      "Semua proyek dirancang 100% custom dari nol sesuai dengan brand identity Anda. Kami fokus pada antarmuka modern, performa cepat, dan optimasi konversi penjualan.",
  },
  {
    id: "03",
    question: "Apakah website sudah termasuk domain, hosting, dan SSL?",
    answer:
      "Ya, setiap paket pembuatan website sudah termasuk gratis Domain (.com / .id), Hosting performa tinggi selama 1 tahun, serta Sertifikat SSL Security.",
  },
  {
    id: "04",
    question: "Apakah saya bisa memperbarui konten website sendiri nanti?",
    answer:
      "Bisa. Kami menyediakan akses Admin Panel / CMS yang mudah digunakan serta panduan teknis agar Anda bisa memperbarui teks, gambar, atau postingan secara mandiri.",
  },
  {
    id: "05",
    question: "Bagaimana dengan dukungan pasca-rilis (maintenance)?",
    answer:
      "Kami memberikan garansi pemeliharaan teknis dan bug-fix gratis selama 1-3 bulan setelah website rilis untuk memastikan sistem berjalan lancar tanpa hambatan.",
  },
];

export default function QandA() {
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useGSAP(
    () => {
      const containerEl = containerRef.current;
      if (!containerEl) return;

      // Reveal Animation untuk FAQ Items
      gsap.from(".faq-item", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerEl,
          start: "top 75%",
        },
      });

      // Pure Pinning Parallax (QandA Diam ketika Footer naik)
      ScrollTrigger.create({
        trigger: containerEl,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: false,
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="faq"
      className="relative z-10 min-h-screen py-24 px-6 sm:px-12 bg-[var(--bg)] text-[var(--ink)] transition-colors duration-300 select-none flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-16 justify-between items-start">
        {/* SISI KIRI: Header & Call to Action */}
        <div className="w-full lg:w-1/3 shrink-0">
          <span className="font-mono text-xs uppercase tracking-widest opacity-60">
            FAQ & Support
          </span>

          <h2 className="text-4xl sm:text-5xl font-hero tracking-tight leading-none mt-2 text-[var(--ink)]">
            Answers to your questions
          </h2>

          <p className="text-sm opacity-80 mt-6 leading-relaxed max-w-sm">
            Punya pertanyaan lain yang belum tercantum di sini? Jangan ragu
            untuk mendiskusikannya dengan kami.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 mt-8 font-mono text-xs uppercase font-bold tracking-wider underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            <span>Hubungi Kami</span>
            <span>↗</span>
          </a>
        </div>

        {/* SISI KANAN: Accordion List */}
        <div className="w-full lg:w-2/3 border-t border-[var(--ink)]">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.id}
                className="faq-item border-b border-[var(--line)] transition-colors duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-6 flex justify-between items-center text-left gap-4 group"
                >
                  <span className="text-lg sm:text-xl font-hero tracking-tight group-hover:opacity-70 transition-opacity">
                    {faq.question}
                  </span>

                  <span className="font-mono text-2xl font-light shrink-0 transition-transform duration-300">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-6"
                      : "grid-rows-[0fr] opacity-0 pb-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm sm:text-base opacity-75 leading-relaxed font-sans pr-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
