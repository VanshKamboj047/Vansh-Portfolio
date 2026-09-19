import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPersonalInfo } from "../../api/personalInfoApi";

const navLinks = [
  { name: "Home", path: "/#hero" },
  { name: "About", path: "/#about" },
  { name: "Skills", path: "/#skills" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/#contact" },
];

export default function Navbar() {
  const [info, setInfo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchInfo() {
      try {
        const response = await getPersonalInfo();
        setInfo(response.data.data);
      } catch (err) {
        console.error("Navbar data fetch error:", err);
      }
    }

    fetchInfo();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-[#0e0e10]/90 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* ================= LOGO ================= */}
          <Link
            to="/"
            className="group flex items-center gap-2.5"
            onClick={() => setMenuOpen(false)}
          >
            {/* Logo Mark */}
            <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <span className="text-[#0e0e10] text-sm font-extrabold">
                V
              </span>
            </span>

            {/* Logo Text */}
            <span className="text-lg font-bold tracking-tight text-white">
              Portfolio
            </span>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden sm:flex items-center gap-1">

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="relative px-3.5 py-2 text-sm font-medium text-white/55 hover:text-white transition-colors duration-200 group"
              >
                {link.name}

                {/* Hover line */}
                <span className="absolute left-3.5 right-3.5 bottom-0 h-px bg-lime-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
              </a>
            ))}

            {/* ================= RESUME ================= */}
            {info?.resume_path && (
              <a
                href={`${import.meta.env.VITE_STORAGE_BASE_URL}/${info.resume_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 inline-flex items-center gap-2 bg-white text-zinc-900 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-zinc-200 hover:scale-[1.03] transition-all duration-200"
              >
                <i className="ti ti-download text-base" />
                Resume
              </a>
            )}
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="sm:hidden w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.10] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
          >
            {menuOpen ? (
              <i className="ti ti-x text-lg" />
            ) : (
              <i className="ti ti-menu-2 text-lg" />
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="sm:hidden border-t border-white/[0.07] bg-[#111113]/95 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 py-4">

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
                >
                  <span>{link.name}</span>

                  <i className="ti ti-arrow-up-right text-base text-white/25" />
                </a>
              ))}
            </div>

            {/* Mobile Resume */}
            {info?.resume_path && (
              <a
                href={`${import.meta.env.VITE_STORAGE_BASE_URL}/${info.resume_path}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-white text-zinc-900 px-4 py-3 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors duration-200"
              >
                <i className="ti ti-download text-base" />
                Download Resume
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}