import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Hero() {
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const lensInnerRef = useRef(null);
  const blackholeRingRef = useRef(null);
  const blackholeCoreRef = useRef(null);
  const letterRefs = useRef({});

  const line1 = "Your Idea. Your Identity.";
  const line2 = "Your Digital Presence.";

  // Smooth Scroll Handler untuk tombol Learn More
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
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
      const heroEl = heroRef.current;
      if (!heroEl) return;

      const mouse = { x: -200, y: -200, targetX: -200, targetY: -200 };
      const LENS_RADIUS = 50;
      const MAGNIFY_THRESHOLD = 95;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-heading .char-wrapper", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.015,
      })
        .from(".hero-subtext", { y: 20, opacity: 0, duration: 0.6 }, "-=.4")
        .from(".cta-row", { y: 16, opacity: 0, duration: 0.5 }, "-=.4");

      gsap.to(blackholeRingRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      gsap.to(blackholeCoreRef.current, {
        scale: 1.15,
        opacity: 0.85,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Animasi Pin & Scale-out Hero saat melakukan scroll ke section berikutnya
      gsap.to(heroContentRef.current, {
        scale: 0.7,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
          pinSpacing: false,
        },
      });

      const updatePosition = () => {
        mouse.x += (mouse.targetX - mouse.x) * 0.2;
        mouse.y += (mouse.targetY - mouse.y) * 0.2;

        if (cursorFollowerRef.current) {
          cursorFollowerRef.current.style.transform = `translate3d(${mouse.x - LENS_RADIUS}px, ${mouse.y - LENS_RADIUS}px, 0)`;
        }

        let isHoveringH1 = false;

        Object.values(letterRefs.current).forEach((charEl) => {
          if (!charEl) return;

          const rect = charEl.getBoundingClientRect();
          const charCenterX = rect.left + rect.width / 2;
          const charCenterY = rect.top + rect.height / 2;

          const distance = Math.hypot(
            mouse.targetX - charCenterX,
            mouse.targetY - charCenterY,
          );

          if (distance < MAGNIFY_THRESHOLD) {
            isHoveringH1 = true;
            const intensity = 1 - distance / MAGNIFY_THRESHOLD;
            const targetScale = 1 + intensity * 0.45;

            gsap.to(charEl, {
              scale: targetScale,
              color: "#FF3B5C",
              textShadow: `0 0 ${intensity * 12}px rgba(255, 59, 92, 0.6)`,
              duration: 0.15,
              ease: "power2.out",
              overwrite: "auto",
            });
          } else {
            gsap.to(charEl, {
              scale: 1,
              color: "",
              textShadow: "0 0 0px rgba(0,0,0,0)",
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        });

        if (isHoveringH1) {
          gsap.to(lensInnerRef.current, {
            scale: 1.35,
            borderColor: "rgba(255, 59, 92, 0.85)",
            backgroundColor: "rgba(255, 59, 92, 0.07)",
            boxShadow:
              "0 0 35px rgba(255, 59, 92, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.6)",
            duration: 0.22,
            ease: "back.out(1.8)",
            overwrite: "auto",
          });
        } else {
          gsap.to(lensInnerRef.current, {
            scale: 1,
            borderColor: "var(--line)",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            boxShadow:
              "0 0 12px rgba(0, 0, 0, 0.06), inset 0 0 8px rgba(255, 255, 255, 0.3)",
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      gsap.ticker.add(updatePosition);

      const handleMouseMove = (e) => {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
      };

      const handleMouseEnter = (e) => {
        mouse.x = mouse.targetX = e.clientX;
        mouse.y = mouse.targetY = e.clientY;

        gsap.to(cursorFollowerRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cursorFollowerRef.current, {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          ease: "power2.out",
        });

        Object.values(letterRefs.current).forEach((charEl) => {
          if (!charEl) return;
          gsap.to(charEl, {
            scale: 1,
            color: "",
            textShadow: "0 0 0px rgba(0,0,0,0)",
            duration: 0.35,
            ease: "power2.out",
          });
        });
      };

      heroEl.addEventListener("mousemove", handleMouseMove);
      heroEl.addEventListener("mouseenter", handleMouseEnter);
      heroEl.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        gsap.ticker.remove(updatePosition);
        heroEl.removeEventListener("mousemove", handleMouseMove);
        heroEl.removeEventListener("mouseenter", handleMouseEnter);
        heroEl.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: heroRef },
  );

  const renderInteractiveText = (text, lineIndex) => {
    const words = text.split(" ");

    return words.map((word, wordIndex) => (
      <span
        key={`word-${lineIndex}-${wordIndex}`}
        className="inline-block whitespace-nowrap"
      >
        {word.split("").map((char, charIndex) => {
          const globalIndex = `${lineIndex}-${wordIndex}-${charIndex}`;
          return (
            <span
              key={globalIndex}
              className="char-wrapper inline-flex justify-center items-center relative inline-block"
            >
              <span
                ref={(el) => (letterRefs.current[globalIndex] = el)}
                className="char-span inline-block origin-center cursor-default select-none will-change-transform text-[var(--ink)] transition-colors duration-300"
                style={{ transform: "translateZ(0)" }}
              >
                {char}
              </span>
            </span>
          );
        })}
        {wordIndex < words.length - 1 && (
          <span className="inline-block w-[0.25em]">&nbsp;</span>
        )}
      </span>
    ));
  };

  return (
    <>
      {/* Kursor Lensa Kaca Pembesar */}
      <div
        ref={cursorFollowerRef}
        className="pointer-events-none fixed top-0 left-0 z-50 w-20 h-20 sm:w-25 sm:h-25 opacity-0 scale-50"
        style={{ transform: "translate3d(-200px, -200px, 0)" }}
      >
        <div
          ref={lensInnerRef}
          className="w-full h-full rounded-full border border-[var(--line)] bg-white/5 backdrop-contrast-125 shadow-md origin-center transition-colors duration-300"
        />
      </div>

      <section
        ref={heroRef}
        id="hero"
        className="relative overflow-hidden min-h-[calc(100vh-80px)] sm:h-[calc(100vh-110px)] flex flex-col justify-center items-center select-none z-10"
      >
        {/* Blackhole Ring & Core */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <div
            ref={blackholeRingRef}
            className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] rounded-full p-[3px] opacity-70"
            style={{
              background:
                "conic-gradient(from 0deg, #FF3B5C, transparent 30%, #FF3B5C 60%, transparent 90%, #FF3B5C)",
              maskImage: "radial-gradient(circle, transparent 55%, black 60%)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 55%, black 60%)",
              filter: "blur(8px)",
            }}
          />
          <div
            ref={blackholeCoreRef}
            className="absolute w-[240px] h-[240px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,59,92,0.55) 0%, rgba(255,59,92,0.15) 45%, transparent 70%)",
              boxShadow: "0 0 100px 30px rgba(255, 59, 92, 0.3)",
              filter: "blur(40px)",
            }}
          />
        </div>

        {/* Hero Content */}
        <div
          ref={heroContentRef}
          className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto origin-center text-center px-2"
        >
          <div className="hero-heading flex flex-col items-center w-full">
            <h1 className="heading-hero w-full">
              {/* Line 1 */}
              <div className="flex flex-wrap justify-center items-center gap-y-1">
                {renderInteractiveText(line1, 1)}
              </div>
              {/* Line 2 */}
              <div className="flex flex-wrap justify-center items-center gap-y-1 mt-1 sm:mt-2">
                {renderInteractiveText(line2, 2)}
              </div>
            </h1>

            <p className="hero-subtext text-subtext mt-4 sm:mt-6 max-w-xs sm:max-w-md md:max-w-xl">
              Kami mengubah ide menjadi nyata di dunia digital.
            </p>
          </div>

          <div className="cta-row mt-6 sm:mt-8">
            <a
              href="#brand"
              onClick={(e) => handleNavClick(e, "brand")}
              className="btn-primary group relative overflow-hidden inline-flex items-center justify-center"
            >
              <span className="relative overflow-hidden inline-block leading-none">
                <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  Learn More
                </span>
                <span className="absolute top-full left-0 inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  Learn More
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
