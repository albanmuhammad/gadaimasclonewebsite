"use client";

import { useState } from "react";

const HARGA_EMAS: Record<number, number> = {
    24: 1050000,
    22: 962500,
    20: 875000,
    18: 787500,
};

const LTV: Record<string, number> = {
    gadai_emas: 0.85,
    gadai_cicilan: 0.8,
    gadai_syariah: 0.75,
};

const BUNGA_PER_BULAN = 0.012;

const PRODUK_OPTIONS = [
    { value: "gadai_emas", label: "Gadai Emas" },
    { value: "gadai_cicilan", label: "Gadai Cicilan" },
    { value: "gadai_syariah", label: "Gadai Syariah" },
];

const BARANG_OPTIONS = [
    { value: "gelang", label: "Gelang" },
    { value: "cincin", label: "Cincin" },
    { value: "kalung", label: "Kalung" },
    { value: "lm", label: "LM Bersertifikat" },
];

const KADAR_OPTIONS = [
    { value: 24, label: "24 Karat" },
    { value: 22, label: "22 Karat" },
    { value: 20, label: "20 Karat" },
    { value: 18, label: "18 Karat" },
];

const TENOR_OPTIONS = [6, 12, 18, 24];

function formatRupiah(n: number) {
    return "Rp" + Math.round(n).toLocaleString("id-ID");
}

export default function SimulasiPage() {
    const [activeType, setActiveType] = useState(0);
    const [produk, setProduk] = useState("");
    const [barang, setBarang] = useState("");
    const [kadar, setKadar] = useState<number | "">("");
    const [berat, setBerat] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [nilaiPinjaman, setNilaiPinjaman] = useState(0);
    const [tenor, setTenor] = useState(12);

    const isCicilan = produk === "gadai_cicilan";
    const cicilan = isCicilan
        ? (nilaiPinjaman * (1 + BUNGA_PER_BULAN * tenor)) / tenor
        : 0;

    function hitung() {
        if (!produk || !barang || !kadar || !berat || Number(berat) <= 0) {
            alert("Mohon lengkapi semua data terlebih dahulu.");
            return;
        }
        const nilaiEmas = HARGA_EMAS[kadar as number] * Number(berat);
        const ltv = LTV[produk] ?? 0.8;
        setNilaiPinjaman(nilaiEmas * ltv);
        setShowResult(true);
    }

    function reset() {
        setProduk("");
        setBarang("");
        setKadar("");
        setBerat("");
        setTenor(12);
        setNilaiPinjaman(0);
        setShowResult(false);
    }

    return (
        <div className="max-w-md mx-auto px-6 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Perhitungan Simulasi
            </h1>

            {/* Type toggle */}
            <div className="grid grid-cols-2 gap-1 bg-gray-100 p-1 rounded-xl mb-6">
                {["Gadai Emas", "Gadai Elektronik"].map((label, idx) => (
                    <button
                        key={label}
                        onClick={() => setActiveType(idx)}
                        className={`py-2.5 text-sm rounded-lg font-medium transition-all ${activeType === idx
                            ? "bg-white text-gray-900 shadow-sm border border-gray-200 font-semibold"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {!showResult ? (
                /* ── FORM ── */
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">
                            Produk Gadai
                        </label>
                        <select
                            value={produk}
                            onChange={(e) => setProduk(e.target.value)}
                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-900 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition"
                        >
                            <option value="">Pilih Produk Gadai</option>
                            {PRODUK_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">
                            Barang Jaminan
                        </label>
                        <select
                            value={barang}
                            onChange={(e) => setBarang(e.target.value)}
                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-900 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition"
                        >
                            <option value="">Pilih Barang Jaminan</option>
                            {BARANG_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1.5">
                                Kadar Emas (Karat)
                            </label>
                            <select
                                value={kadar}
                                onChange={(e) => setKadar(Number(e.target.value))}
                                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-900 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition"
                            >
                                <option value="">Kadar Emas</option>
                                {KADAR_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1.5">
                                Berat Emas (Gram)
                            </label>
                            <input
                                type="number"
                                placeholder="Berat (gram)"
                                min={0.1}
                                step={0.1}
                                value={berat}
                                onChange={(e) => setBerat(e.target.value)}
                                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition"
                            />
                        </div>
                    </div>

                    <p className="text-xs text-gray-400 text-center leading-relaxed">
                        Hasil perkiraan nilai dapat berbeda dengan perhitungan di Outlet
                        sesuai dengan ketentuan yang berlaku.
                    </p>

                    <button
                        onClick={hitung}
                        className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl text-sm font-semibold transition-colors"
                    >
                        Hitung
                    </button>
                </div>
            ) : (
                /* ── RESULT ── */
                <div className="space-y-4">
                    {/* Estimasi */}
                    <div className="bg-amber-50 border border-yellow-300/50 rounded-2xl p-6 text-center">
                        <p className="text-xs text-yellow-800 mb-1">
                            Estimasi Nilai Pinjaman
                        </p>
                        <p className="text-3xl font-bold text-yellow-600">
                            {formatRupiah(nilaiPinjaman)}
                        </p>
                    </div>

                    {/* Tenor - hanya untuk gadai cicilan */}
                    {isCicilan && (
                        <>
                            <div>
                                <p className="text-xs font-medium text-gray-500 mb-2">
                                    Tenor Pelunasan
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {TENOR_OPTIONS.map((t) => (
                                        <label
                                            key={t}
                                            className={`flex items-center gap-2.5 px-4 py-3 border rounded-xl cursor-pointer text-sm transition-all ${tenor === t
                                                ? "border-yellow-500 bg-yellow-50 font-medium text-yellow-800"
                                                : "border-gray-200 text-gray-700 hover:border-gray-300"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="tenor"
                                                value={t}
                                                checked={tenor === t}
                                                onChange={() => setTenor(t)}
                                                className="accent-yellow-600"
                                            />
                                            {t} bulan
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center px-4 py-3.5 bg-gray-50 rounded-xl">
                                <span className="text-sm text-gray-500">Nominal Cicilan</span>
                                <span className="text-base font-bold text-gray-900">
                                    {formatRupiah(cicilan)}
                                </span>
                            </div>
                        </>
                    )}

                    <p className="text-xs text-gray-400 text-center leading-relaxed">
                        Hasil perkiraan nilai dapat berbeda dengan perhitungan di Outlet
                        sesuai dengan ketentuan yang berlaku.
                    </p>

                    <div className="grid grid-cols-2 gap-2.5">
                        <button
                            onClick={reset}
                            className="py-3 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-medium transition-colors"
                        >
                            Reset
                        </button>
                        <button className="py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors">
                            Gadai Sekarang →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}