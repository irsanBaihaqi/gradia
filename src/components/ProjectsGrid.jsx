import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "01",
    year: "2024",
    title: "E-Commerce Experience",
    category: "Full-Stack Web App",
    description:
      "Platform e-commerce modern berbasis Next.js & Tailwind CSS dengan integrasi payment gateway dan animasi produk 3D yang responsif.",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    tech: ["Next.js", "Tailwind CSS", "Stripe", "GSAP"],
  },
  {
    id: "02",
    year: "2024",
    title: "SaaS Dashboard Redesign",
    category: "UI/UX & Frontend",
    description:
      "Perancangan ulang antarmuka dashboard analitik data berbasis React dengan performa tinggi dan tema visual minimalis.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    tech: ["React", "TypeScript", "Tailwind", "Recharts"],
  },
  {
    id: "03",
    year: "2024",
    title: "Creative Agency Portfolio",
    category: "Branding & Web Development",
    description:
      "Website portofolio interaktif untuk agensi kreatif dengan efek micro-interactions, kursor kustom, dan transisi halaman halus.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    tech: ["JavaScript", "GSAP", "Three.js", "Tailwind CSS"],
  },
];

export default function ProjectsGrid() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const containerEl = containerRef.current;
      const trackEl = trackRef.current;
      if (!containerEl || !trackEl) return;

      const getScrollWidth = () => {
        return trackEl.scrollWidth - window.innerWidth + 50;
      };

      // 1. Animasi Parallax Slide-Up (Meluncur dari bawah menutupi LetSee)
      gsap.fromTo(
        containerEl,
        { y: "100%" },
        {
          y: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: containerEl,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );

      // 2. Pin & Horizontal Scroll setelah menutupi layar sepenuhnya
      gsap.to(trackEl, {
        x: () => -getScrollWidth(),
        ease: "none",
        scrollTrigger: {
          trigger: containerEl,
          start: "top top",
          end: () => `+=${getScrollWidth() * 1.2}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative z-30 h-screen bg-[var(--bg)] text-[var(--ink)] overflow-hidden transition-colors duration-300 flex items-center select-none will-change-transform"
    >
      <div
        ref={trackRef}
        className="flex flex-row h-full w-max pl-6 sm:pl-16 pr-32 sm:pr-64 py-8 sm:py-0 items-center gap-6 sm:gap-12"
      >
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="project-card w-[88vw] sm:w-[78vw] max-w-[1200px] h-[82vh] sm:h-[70vh] border border-[var(--ink)] bg-[var(--card)] flex flex-col sm:flex-row items-stretch shrink-0 my-auto overflow-hidden transition-all duration-300 hover:shadow-2xl"
          >
            {/* SISI KIRI: Gambar Project (60% Width) */}
            <div className="w-full sm:w-[60%] h-[45%] sm:h-full relative overflow-hidden group shrink-0 bg-neutral-900">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
              />
              <div className="absolute top-4 left-4">
                <span className="badge-tag">
                  [{project.id}]
                </span>
              </div>
            </div>

            {/* SISI KANAN: Penjelasan UI/UX Refined (40% Width) */}
            <div className="w-full sm:w-[40%] h-[55%] sm:h-full p-6 sm:p-10 flex flex-col justify-between shrink-0 bg-[var(--card)] overflow-y-auto">
              <div>
                <span className="text-label-mono text-[var(--muted)] block mb-1">
                  {project.category}
                </span>

                {/* Title */}
                <h3 className="heading-card mt-1">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-subtext text-xs sm:text-sm md:text-base mt-4 font-sans">
                  {project.description}
                </p>
              </div>

              {/* Footer Info & Tech Stack */}
              <div className="mt-6 pt-6 border-t border-[var(--line)]">
                <span className="text-label-mono text-[var(--muted)] text-[10px] block mb-3">
                  Technologies Used
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-label-mono text-[10px] sm:text-[11px] px-3 py-1 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] opacity-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}