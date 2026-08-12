import { useEffect, useRef } from 'react'

/**
 * Efek "cairan" yang ngejar pointer — trail blob metaball di canvas 2D.
 * VELOCITY-DRIVEN:
 *   - Pointer diem  -> fluid nge-fade sampai hilang.
 *   - Gerak pelan   -> fluid muncul kecil & tipis.
 *   - Gerak cepat   -> fluid muncul besar, trail panjang, gerak lebih responsif.
 * Blend mode ikut tema (multiply light / screen dark). Reduced-motion: mati total.
 * Taruh sebagai anak pertama container ber-position:relative.
 */
export default function FluidBackground({ className = '' }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const cursorRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const cursorEl = cursorRef.current
    if (!wrap || !canvas) return

    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return // hormatin reduced-motion: nggak ada fluid sama sekali

    let W = 0
    let H = 0
    let baseR = 120

    const readBlend = () =>
      document.documentElement.getAttribute('data-theme') === 'dark' ? 'screen' : 'multiply'
    let blend = readBlend()
    const themeObserver = new MutationObserver(() => { blend = readBlend() })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    const COLORS = [
      [255, 59, 92],   // pink
      [24, 224, 216],  // cyan
      [255, 120, 90],  // coral
    ]

    const N = 20                 // panjang maksimum trail
    const MAX_DIST = 55          // jarak (px) per event buat intensitas penuh
    const pts = []
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }

    // Kecepatan pointer -> intensitas fluid (0..1)
    let velTarget = 0            // di-bump pas gerak, meluruh tiap frame
    let vel = 0                  // versi smooth yg dipakai render
    let lastX = 0
    let lastY = 0
    let hasLast = false

    function resize() {
      const r = wrap.getBoundingClientRect()
      W = r.width
      H = r.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(W * dpr))
      canvas.height = Math.max(1, Math.floor(H * dpr))
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      baseR = Math.max(90, Math.min(W, H) * 0.17)
    }

    resize()
    pointer.x = pointer.tx = W / 2
    pointer.y = pointer.ty = H / 2
    for (let i = 0; i < N; i++) pts.push({ x: W / 2, y: H / 2 })

    function onMove(e) {
      const r = wrap.getBoundingClientRect()
      const cx = e.clientX - r.left
      const cy = e.clientY - r.top
      pointer.tx = cx
      pointer.ty = cy
      if (cursorEl) {
        cursorEl.style.transform = `translate(${cx}px, ${cy}px)`
        cursorEl.style.opacity = '1'
      }
      if (hasLast) {
        const d = Math.hypot(cx - lastX, cy - lastY)
        // ambil yg terbesar kalau ada beberapa event dalam 1 frame
        velTarget = Math.max(velTarget, Math.min(1, d / MAX_DIST))
      }
      lastX = cx
      lastY = cy
      hasLast = true
    }

    let raf = 0
    let t = 0

    function frame() {
      t += 0.016

      // Kecepatan meluruh ke 0 kalau nggak ada gerakan -> fluid ilang
      velTarget *= 0.90
      vel += (velTarget - vel) * 0.15

      // Pointer & trail ngejar; makin cepat, makin responsif
      const headLerp = 0.22 + vel * 0.20
      pointer.x += (pointer.tx - pointer.x) * headLerp
      pointer.y += (pointer.ty - pointer.y) * headLerp
      pts[0].x += (pointer.x - pts[0].x) * (0.25 + vel * 0.15)
      pts[0].y += (pointer.y - pts[0].y) * (0.25 + vel * 0.15)
      for (let i = 1; i < N; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.32
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.32
      }

      ctx.clearRect(0, 0, W, H)

      if (vel > 0.012) {
        ctx.globalCompositeOperation = blend
        const rScale = 0.35 + vel * 0.95              // ukuran ikut kecepatan
        const shown = Math.max(3, Math.round(3 + vel * (N - 3))) // panjang trail ikut kecepatan
        for (let i = 0; i < shown; i++) {
          const f = 1 - i / N
          const wob = 1 + Math.sin(t * 2 + i * 0.6) * 0.12
          const r = baseR * (0.30 + f * 0.70) * rScale * wob
          const c = COLORS[i % COLORS.length]
          const a = (0.5 * f + 0.14) * vel            // opacity ikut kecepatan
          const g = ctx.createRadialGradient(pts[i].x, pts[i].y, 0, pts[i].x, pts[i].y, r)
          g.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${a})`)
          g.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`)
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(pts[i].x, pts[i].y, r, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalCompositeOperation = 'source-over'
      }

      raf = requestAnimationFrame(frame)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      themeObserver.disconnect()
    }
  }, [])

  return (
    <div className={`fluid-bg ${className}`} ref={wrapRef} aria-hidden="true">
      <canvas className="fluid-bg__canvas" ref={canvasRef} />
      <span className="fluid-cursor" ref={cursorRef} />
    </div>
  )
}