import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import FluidBackground from './FluidBackground'

gsap.registerPlugin(useGSAP)

export default function Hero() {
  const heroRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.badges', { y: -16, opacity: 0, duration: 0.6 })
      .from('.collage-row.top .tile, .collage-row.top .tile-cluster', {
        y: -30, opacity: 0, duration: 0.8, stagger: 0.1,
      }, '-=.2')
      .from('.hero-heading h1', { y: 40, opacity: 0, duration: 0.9 }, '-=.5')
      .from('.hero-heading p', { y: 20, opacity: 0, duration: 0.6 }, '-=.5')
      .from('.hero-heading .cta-row', { y: 16, opacity: 0, duration: 0.5 }, '-=.4')
      .from('.collage-row.bottom .tile, .collage-row.bottom .tile-cluster', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1,
      }, '-=.7')
      .from('.hero-accent-orb', { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(2)' }, '-=.3')
  }, { scope: heroRef })

  return (
    <header className="hero" id="top" ref={heroRef}>
      <FluidBackground />

      <div className="wrap">
        <ul className="badges">
          <li>1× WEBBY AWARD</li><li className="dot">•</li>
          <li>5× FWA</li><li className="dot">•</li>
          <li>18× AWWWARDS</li><li className="dot">•</li>
          <li>21× CSSDA</li>
        </ul>

        <div className="hero-collage">
          <div className="collage-row top">
            <div className="tile tile-single g-1" />
            <div className="tile-cluster align-right">
              <div className="tile tile--back g-2" />
              <div className="tile tile--front g-3" />
            </div>
          </div>

          <div className="hero-heading">
            <h1>Gradia Digital</h1>
            <p>
              Studio pengembangan web yang meracik setiap proyek seperti gradasi warna —
              halus, terarah, dan selalu berujung pada hasil yang matang.
            </p>
            <div className="cta-row">
              <a href="#contact" className="btn btn-solid">Mulai Obrolan</a>
              <a href="#work" className="btn btn-outline">Lihat Karya</a>
            </div>
          </div>

          <div className="collage-row bottom">
            <div className="tile-cluster">
              <div className="tile tile--back g-4" />
              <div className="tile tile--front g-5" />
            </div>
            <div className="tile tile-single g-6" />
          </div>
        </div>

        <div className="hero-accent-orb" aria-hidden="true" />
      </div>
    </header>
  )
}