import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Contact from "./page/Contact";

function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#F3F2EE] text-[#141414] select-none p-6">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl sm:text-6xl font-hero tracking-tight mb-4">
          Hello Gradia
        </h1>
        <p className="text-sm opacity-80 mb-8 font-sans">
          Solusi desain dan pengembangan website profesional untuk meningkatkan
          kredibilitas bisnis Anda.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center px-6 py-4 bg-[#141414] text-[#F3F2EE] font-mono text-xs uppercase font-bold tracking-wider rounded-xl transition-all duration-300 hover:bg-[#FF3B5C] hover:text-white"
        >
          Pesan Website Sekarang ↗
        </Link>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
