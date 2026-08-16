import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Footer() {
  const footerRef = useRef(null);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();

    if (targetId === "hero") {
      gsap.to(window, {
        duration: 1.4,
        scrollTo: { y: 0, autoKill: false },
        ease: "power3.inOut",
      });
      return;
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      gsap.to(window, {
        duration: 1.4,
        scrollTo: { y: targetEl, autoKill: false },
        ease: "power3.inOut",
      });
    }
  };

  useGSAP(
    () => {
      gsap.from(footerRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative z-20 min-h-screen bg-[var(--ink)] text-[var(--bg)] rounded-t-[40px] sm:rounded-t-[60px] px-6 sm:px-12 py-16 flex flex-col justify-between overflow-hidden transition-colors duration-300 select-none"
    >
      {/* Top Header Row */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/10 pb-12 pt-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest opacity-60">
            Ready to Build?
          </span>
          <h2 className="text-3xl sm:text-5xl font-hero tracking-tight leading-none mt-2">
            Let's create something together.
          </h2>
        </div>

        <a
          href="https://wa.me/yournumber?text=Halo,%20saya%20ingin%20konsultasi%20pembuatan%20website"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-4 bg-[var(--bg)] text-[var(--ink)] font-mono text-xs uppercase font-bold tracking-wider rounded-full hover:bg-[#FF3B5C] hover:text-white transition-all duration-300 shrink-0"
        >
          Start a Project ↗
        </a>
      </div>

      {/* Middle Grid: Navigation & Social Links */}
      <div className="max-w-7xl mx-auto w-full my-12 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-6">
          <p className="text-xl sm:text-2xl font-hero leading-snug opacity-90 max-w-md">
            Mengubah ide menjadi antarmuka digital profesional, cepat, dan siap
            mengonversi penjualan.
          </p>
        </div>

        {/* Social Links Column */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">
            Connect
          </span>
          <a
            href="https://wa.me/yournumber"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm uppercase hover:text-[#FF3B5C] transition-colors w-fit"
          >
            WhatsApp
          </a>
          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm uppercase hover:text-[#FF3B5C] transition-colors w-fit"
          >
            Instagram
          </a>
          <a
            href="https://facebook.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm uppercase hover:text-[#FF3B5C] transition-colors w-fit"
          >
            Facebook
          </a>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">
            Navigation
          </span>
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="font-mono text-sm uppercase hover:text-[#FF3B5C] transition-colors w-fit"
          >
            Beranda
          </a>
          <a
            href="#brand"
            onClick={(e) => handleNavClick(e, "brand")}
            className="font-mono text-sm uppercase hover:text-[#FF3B5C] transition-colors w-fit"
          >
            Layanan
          </a>
          <a
            href="#work"
            onClick={(e) => handleNavClick(e, "work")}
            className="font-mono text-sm uppercase hover:text-[#FF3B5C] transition-colors w-fit"
          >
            Karya
          </a>
          <a
            href="#pricing"
            onClick={(e) => handleNavClick(e, "pricing")}
            className="font-mono text-sm uppercase hover:text-[#FF3B5C] transition-colors w-fit"
          >
            Harga
          </a>
          <a
            href="#faq"
            onClick={(e) => handleNavClick(e, "faq")}
            className="font-mono text-sm uppercase hover:text-[#FF3B5C] transition-colors w-fit"
          >
            FAQ
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-mono text-xs opacity-50">Gradia Digital.</span>
      </div>
    </footer>
  );
}
