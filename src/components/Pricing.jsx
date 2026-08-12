export default function Pricing() {
  return (
    <section id="pricing" className="s-pricing">
      <div className="wrap">
        <div className="pricing-left" data-reveal>
          <div className="eyebrow">Harga</div>
          <h2 className="section-title">Harga yang jelas dari awal.</h2>
          <p>
            Sebagian besar proyek kami hargai sesuai kebutuhan, tapi kami tetap kasih
            gambaran jelas soal waktu pengerjaan dan budget sejak obrolan pertama.
            Untuk kebutuhan yang berkelanjutan, tersedia juga paket kolaborasi bulanan.
          </p>
        </div>

        <div className="pricing-right" data-reveal>
          <div className="price-card">
            <div className="eyebrow">Kolaborasi Bulanan</div>
            <div className="amount">€4.999 <span>/ bulan</span></div>
            <p className="desc">Cocok untuk agensi kecil dengan alur proyek yang ringan.</p>
            <ul className="price-list">
              <li>Kapasitas bersama</li>
              <li>Satu proyek dalam satu waktu</li>
              <li>Satu developer level ahli</li>
              <li>Permintaan tanpa batas</li>
              <li>Kanal komunikasi khusus</li>
            </ul>
            <a href="#contact" className="btn btn-solid">Mulai Obrolan</a>
          </div>
        </div>
      </div>
    </section>
  )
}