import { useTheme } from '../hooks/useTheme'

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

export default function Nav() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <nav>
      <div className="wrap">
        <a href="#top" className="logo">
          <span className="dot" />
          gradia
        </a>
        <div className="nav-links">
          <a href="#services">Layanan</a>
          <a href="#work">Karya</a>
          <a href="#pricing">Harga</a>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggle}
            aria-label={isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
            title={isDark ? 'Mode terang' : 'Mode gelap'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <a href="#contact" className="btn btn-solid">Mulai Obrolan</a>
        </div>
      </div>
    </nav>
  )
}