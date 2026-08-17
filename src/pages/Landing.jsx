import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

// Impor komponen layout dari ../layouts/
import Nav from "../layouts/Nav";
import Footer from "../layouts/Footer";

// Impor komponen seksi dari ./landing/
import Hero from "./landing/Hero";
import InfoBrand from "./landing/InfoBrand";
import LetSee from "./landing/LetSee";
import ProjectsGrid from "./landing/ProjectsGrid";
import Pricing from "./landing/Pricing";
import QandA from "./landing/QandA";
import ScrollTop from "./landing/ScrollTop";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Landing() {
  const pageRef = useRef(null);

  // Smooth Scroll Inisialisasi Lenis
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  // Global Reveal Animations
  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;

      gsap.utils
        .toArray('[data-reveal]:not([data-reveal="media"])')
        .forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });

      gsap.utils.toArray('[data-reveal="media"]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(12% 12% 12% 12% round 1.5rem)", opacity: 0.4 },
          {
            clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.utils.toArray(".project-card").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          delay: i * 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
        });
      });
    },
    { scope: pageRef },
  );

  return (
    <div ref={pageRef}>
      <Nav />
      <ScrollTop />
      <main>
        <Hero />
        <InfoBrand />
        <LetSee />
        <ProjectsGrid />
        <Pricing />
        <QandA />
      </main>
      <Footer />
    </div>
  );
}
