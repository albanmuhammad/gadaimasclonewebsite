import Link from "next/link";
import Image from "next/image";

const services = [
  {
    icon: "🥇",
    title: "Gadai Emas",
    desc: "Gadai perhiasan & LM dengan proses cepat dan aman",
    bg: "bg-amber-50",
  },
  {
    icon: "🔄",
    title: "Gadai Cicilan",
    desc: "Cicilan fleksibel 6–24 bulan sesuai kemampuan Anda",
    bg: "bg-blue-50",
  },
  {
    icon: "⭐",
    title: "Gadai Syariah",
    desc: "Akad rahn sesuai prinsip syariah Islam, bebas riba",
    bg: "bg-green-50",
  },
  {
    icon: "🛡️",
    title: "Penyimpanan Aman",
    desc: "Barang jaminan diasuransikan & disimpan di brankas",
    bg: "bg-purple-50",
  },
];

const stats = [
  { num: "150K+", label: "Nasabah aktif" },
  { num: "500+", label: "Outlet tersebar" },
  { num: "99%", label: "Kepuasan nasabah" },
];

export default function HomePage() {
  return (
    <div>
      {/* Photo Banner Section - Tambahan Baru */}
      <section className="w-full relative h-[300px] md:h-[580px] mainBanner">
        {/* Foto - Menggunakan object-cover agar gambar memenuhi area tanpa distorsi */}
        <Image
          src="/banner-emas.png"
          alt="Gadai Emas Terpercaya"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        {/* Overlay gelap - Disesuaikan agar di mobile tetap terbaca */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 md:via-black/30 to-transparent" />

        {/* Teks di tengah-kiri banner */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 max-w-4xl">
          <div className="max-w-xl">
            <span className="inline-block bg-yellow-500/20 border border-yellow-400/50 text-yellow-300 text-[10px] md:text-xs px-3 py-1 rounded-full mb-3 md:mb-4">
              ✦ Terpercaya & Aman
            </span>

            <h1 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight">
              Gadai Emas <br className="hidden md:block" />
              Mudah & Cepat
            </h1>

            <p className="text-white/80 text-xs md:text-lg mb-6 md:mb-8 max-w-md">
              Dapatkan dana tunai dalam hitungan menit dengan jaminan emas Anda. Proses aman dan diawasi OJK.
            </p>

            <Link
              href="/simulasi"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2.5 md:px-7 md:py-3 rounded-xl text-xs md:text-sm font-semibold transition-all shadow-lg active:scale-95"
            >
              Hitung Simulasi
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 py-6">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl p-4 text-center border border-gray-100"
            >
              <div className="text-2xl font-bold text-yellow-600">{s.num}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="px-8 pb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Layanan kami
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {services.map((svc) => (
            <Link
              href="/simulasi"
              key={svc.title}
              className="bg-white border border-gray-100 rounded-xl p-5 hover:border-yellow-400 hover:shadow-md transition-all block"
            >
              <div
                className={`w-11 h-11 ${svc.bg} rounded-xl flex items-center justify-center text-xl mb-3`}
              >
                {svc.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {svc.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">{svc.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}