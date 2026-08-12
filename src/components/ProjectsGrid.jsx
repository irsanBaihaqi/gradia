const PROJECTS = [
  { n: '01', title: 'Landing page peluncuran produk internasional', meta: ['Eropa', '6 minggu', 'NDA'] },
  { n: '02', title: 'Situs B2B enam halaman untuk perusahaan investasi olahraga', meta: ['AS', '4 minggu'] },
  { n: '03', title: 'Landing page kreatif untuk startup DeFi', meta: ['UK', '4 minggu'] },
  { n: '04', title: 'Situs brosur untuk perusahaan minuman terkemuka dunia', meta: ['Australia', '10 minggu'] },
]

export default function ProjectsGrid() {
  return (
    <section id="work">
      <div className="wrap">
        <div className="catchphrase">
          <h2 data-reveal>
            Let's see our<br />projects
          </h2>
        </div>

        <div className="projects-grid" data-reveal>
          {PROJECTS.map((p) => (
            <div className="project-card" key={p.n}>
              <span className="p-index">{p.n}</span>
              <div>
                <p className="p-title">{p.title}</p>
                <div className="p-meta">
                  {p.meta.map((m) => <span key={m}>{m}</span>)}
                </div>
              </div>
              <span className="p-arrow">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}