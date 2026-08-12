const LINKS = [
  { label: 'Mulai proyek baru', href: '#contact' },
  { label: 'Lihat semua karya', href: '#work' },
  { label: 'Cek paket harga', href: '#pricing' },
]

export default function InfoBand() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="info-band" data-reveal>
          <div className="info-band-grid">
            <div className="info-brand">
              <h3>Gradia Digital</h3>
              <p>
                Duo developer untuk agensi dan brand yang nggak mau eksekusi
                proyeknya asal-asalan.
              </p>
              <a className="email" href="mailto:hello@gradia.digital">hello@gradia.digital</a>
            </div>

            <ul className="info-links">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>
                    {l.label}
                    <span className="arrow">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}