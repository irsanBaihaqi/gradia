import { useState, useRef } from "react";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);
  useGSAP(() => {
    ScrollTrigger.create({
      start: "top -300px",
      end: 99999,
      onUpdate: (self) => {
        if (self.scroll() > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
    });
  }, []);

  useGSAP(() => {
    if (!buttonRef.current) return;

    if (isVisible) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        scale: 1,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        scale: 0.5,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isVisible]);

  const scrollToHero = (e) => {
    e.preventDefault();
    e.stopPropagation();

    gsap.to(window, {
      duration: 1.8,
      scrollTo: { y: 0, autoKill: false },
      ease: "power3.inOut",
    });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={scrollToHero}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-[999] p-3.5 bg-[var(--ink)] text-[var(--bg)] border border-[var(--ink)] opacity-0 scale-50 pointer-events-none transition-all duration-300 hover:bg-[#FF3B5C] hover:border-[#FF3B5C] hover:-translate-y-1 hover:shadow-lg group cursor-pointer"
    >
      <ArrowUp
        size={20}
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
