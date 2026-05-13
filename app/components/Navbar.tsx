"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center justify-between px-8 h-16 bg-white border-b border-gray-200">
            <div className="flex items-center gap-2.5 font-semibold text-lg text-amber-900">

                GADAIMAS
            </div>

            <div className="flex gap-1">
                <Link
                    href="/"
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${pathname === "/"
                        ? "bg-amber-50 text-yellow-700 font-semibold"
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                        }`}
                >
                    Beranda
                </Link>
                <Link
                    href="/simulasi"
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${pathname === "/simulasi"
                        ? "bg-amber-50 text-yellow-700 font-semibold"
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                        }`}
                >
                    Simulasi
                </Link>
            </div>
        </nav>
    );
}