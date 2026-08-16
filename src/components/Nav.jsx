import { useState, useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-4 h-4"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-4 h-4 text-[var(--ink)]"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Layanan", href: "#brand", id: "brand" },
  { label: "Karya", href: "#work", id: "work" },
  { label: "Harga", href: "#pricing", id: "pricing" },
  { label: "FAQ", href: "#faq", id: "faq" },
];

export default function Nav() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Lock Body Scroll saat Mobile Menu Terbuka
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  // Smooth Scroll Handler & Auto Close Mobile Menu
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);

    const targetY = targetId === "hero" ? 0 : document.getElementById(targetId);
    if (targetY !== null) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: targetY, autoKill: false },
        ease: "power3.inOut",
      });
    }
  };

  // GSAP SCROLLTRIGGER: Sembunyikan saat Scroll Down & Muncul saat Scroll Up
  useGSAP(
    () => {
      const navEl = navRef.current;
      if (!navEl) return;

      ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
          if (isOpen) return;

          if (self.direction === 1 && self.scroll() > 100) {
            gsap.to(navEl, {
              yPercent: -100,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          } else if (self.direction === -1) {
            gsap.to(navEl, {
              yPercent: 0,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        },
      });

      // Active Section Tracker
      const sectionIds = ["hero", "brand", "work", "pricing", "faq"];
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top 40%",
          end: "bottom 40%",
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });
      });
    },
    { scope: navRef, dependencies: [isOpen] }
  );

  // Animasi Tirai Fullscreen Mobile GSAP
  useGSAP(() => {
    const menuEl = mobileMenuRef.current;
    if (!menuEl) return;

    if (isOpen) {
      gsap.to(menuEl, {
        height: "100vh",
        opacity: 1,
        duration: 0.55,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        ".mobile-nav-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    } else {
      gsap.to(menuEl, {
        height: 0,
        opacity: 0,
        duration: 0.45,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-[10px] border-b border-transparent transition-colors duration-300 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-[18px] flex items-center justify-between relative z-50">
        {/* LOGO */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          className="flex items-center gap-2 font-hero text-[var(--ink)]"
        >
          <img src="./logo.png" alt="Gradia Logo" className="h-18 w-auto" />
          <span>Gradia Digital</span>
        </a>

        {/* DESKTOP NAV LINKS & ACTIONS */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative font-mono text-[12px] font-normal tracking-[0.02em] uppercase transition-colors duration-200 py-1 ${
                  isActive
                    ? "text-[#FF3B5C] font-bold"
                    : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF3B5C] rounded-full transition-all duration-300" />
                )}
              </a>
            );
          })}
          <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
            title={isDark ? "Mode terang" : "Mode gelap"}
            className="w-[38px] h-[38px] rounded-full border border-[var(--line)] bg-transparent text-[var(--ink)] flex items-center justify-center cursor-pointer shrink-0 transition-all duration-300 hover:border-[var(--ink)] hover:-rotate-[18deg]"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <a
            href="#pricing"
            onClick={(e) => handleNavClick(e, "pricing")}
            className="group relative overflow-hidden font-mono font-bold text-[12px] tracking-[0.04em] uppercase px-6 py-[13px] border border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)] inline-flex items-center whitespace-nowrap transition-all duration-300 hover:bg-[#FF3B5C] hover:border-[#FF3B5C] hover:-translate-y-[2px]"
          >
            <span className="relative overflow-hidden inline-block leading-none">
              <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                Pesan Sekarang
              </span>
              <span className="absolute top-full left-0 inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                Pesan Sekarang
              </span>
            </span>
          </a>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={toggle}
            className="w-[38px] h-[38px] rounded-full border border-[var(--line)] bg-transparent text-[var(--ink)] flex items-center justify-center cursor-pointer"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[var(--ink)] bg-transparent flex items-center justify-center cursor-pointer hover:border-[#FF3B5C] transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE & TABLET FULLSCREEN CURTAIN MENU */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 left-0 w-full h-0 opacity-0 bg-[var(--bg)] text-[var(--ink)] z-40 overflow-hidden flex flex-col justify-between pt-28 pb-12 px-8 border-b border-[var(--line)] md:hidden"
      >
        <div className="flex flex-col gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`mobile-nav-item flex items-center justify-between font-hero text-3xl tracking-tight uppercase py-3 border-b border-[var(--line)]/50 ${
                  isActive
                    ? "text-[#FF3B5C] font-bold"
                    : "text-[var(--ink)] opacity-85"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="w-3 h-3 rounded-full bg-[#FF3B5C]" />
                )}
              </a>
            );
          })}
        </div>

        <div className="mobile-nav-item pt-8">
          <a
            href="#pricing"
            onClick={(e) => handleNavClick(e, "pricing")}
            className="w-full text-center font-mono font-bold text-[12px] uppercase tracking-[0.04em] py-4 bg-[#FF3B5C] text-white border border-[#FF3B5C] block shadow-lg"
          >
            Pesan Sekarang
          </a>
        </div>
      </div>
    </nav>
  );
}