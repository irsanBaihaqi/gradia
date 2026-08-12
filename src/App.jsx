import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FeatureHighlight from './components/FeatureHighlight'
import ShowcaseRow from './components/ShowcaseRow'
import ProjectsGrid from './components/ProjectsGrid'
import Pricing from './components/Pricing'
import InfoBand from './components/InfoBand'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function App() {
  const appRef = useRef(null)

  /* ===== SMOOTH SCROLL BERINERSIA (Lenis) ===== */
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.destroy()
      gsap.ticker.remove(raf)
    }
  }, [])

  useGSAP(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    /* reveal generik untuk semua [data-reveal] */
    gsap.utils.toArray('[data-reveal]:not([data-reveal="media"])').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
      })
    })

    /* clip-path reveal untuk media/gambar */
    gsap.utils.toArray('[data-reveal="media"]').forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(12% 12% 12% 12% round 1.5rem)', opacity: 0.4 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      )
    })

    gsap.utils.toArray('.project-card').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, y: 24, duration: 0.7, delay: i * 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%' },
      })
    })
  }, { scope: appRef })

  return (
    <div ref={appRef}>
      <Nav />
      <Hero />

      <FeatureHighlight
        eyebrow="Layanan Utama"
        title="Landing Page"
        text="Satu halaman, satu tujuan: mengubah pengunjung jadi pelanggan. Kami rancang dengan copy yang tajam, animasi yang halus, dan performa yang cepat — siap pakai untuk peluncuran produk atau kampanye singkat."
        mediaClass="g-2"
      />

      <ShowcaseRow
        title="Company Profile"
        text="Situs company profile yang menonjolkan kredibilitas brand kamu — struktur informasi yang jelas, desain yang rapi, dan mudah dikelola tanpa bantuan developer setiap saat."
        mediaClass="g-6"
        reversed
      />

      <ShowcaseRow
        title="Toko Online"
        text="Etalase digital yang siap jualan. Dari katalog produk sampai checkout, kami bangun toko online yang cepat, aman, dan enak dipakai di HP maupun desktop."
        mediaClass="g-1"
      />

      <ProjectsGrid />
      <Pricing />
      <InfoBand />

      <footer className="site-footer">
        <div className="wrap">
          <span>© 2026 Gradia Digital — dibuat dengan Vite &amp; GSAP.</span>
          <div className="flinks">
            <a href="#">Legal</a>
            <a href="#">Privasi</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  )
}