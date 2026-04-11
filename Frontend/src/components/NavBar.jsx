import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../service/Authcontext';

function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
        <Link
          to="/"
          className="text-2xl font-black tracking-tight text-white [font-family:'Playfair_Display',serif]"
        >
          Ink<span className="text-amber-400">Press</span>
        </Link>

        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-slate-200 transition hover:border-amber-300/50 hover:text-amber-200"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        <ul className="hidden items-center gap-7 text-sm font-medium text-slate-200 md:flex">
          <li>
            <Link className="transition hover:text-amber-300" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="transition hover:text-amber-300" to="/blog">
              Articles
            </Link>
          </li>
          <li>
            <a className="transition hover:text-amber-300" href="#">
              Categories
            </a>
          </li>
          <li>
            <Link to="/about" className="transition hover:text-amber-300">
              About
            </Link>
          </li>
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                to="/blog/create"
                className="rounded-full border border-amber-300/40 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-400 hover:text-slate-950"
              >
                Write
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-amber-300/50 hover:text-amber-200"
              >
                Logout
              </button>
              <div className="text-right text-sm text-slate-300">
                <p className="font-semibold text-white">
                  {user?.fullname || user?.username || 'InkPress Writer'}
                </p>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  {user?.email || 'Signed in'}
                </p>
              </div>
              <div
                aria-label="Profile"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200"
              >
                <span className="sr-only">Profile</span>
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user?.fullname || user?.username || 'profile'}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21a8 8 0 0 0-16 0" />
                    <circle cx="12" cy="8" r="4" />
                  </svg>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-amber-300/50 hover:text-amber-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full border border-amber-300/40 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-400 hover:text-slate-950"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-4 border-t border-white/10 bg-slate-950/95 px-4 pb-4 pt-3 text-sm text-slate-200">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block rounded-xl px-3 py-2 transition hover:bg-white/5 hover:text-amber-300"
          >
            Home
          </Link>
          <Link
            to="/blog"
            onClick={() => setMenuOpen(false)}
            className="block rounded-xl px-3 py-2 transition hover:bg-white/5 hover:text-amber-300"
          >
            Articles
          </Link>
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="block rounded-xl px-3 py-2 transition hover:bg-white/5 hover:text-amber-300"
          >
            Categories
          </a>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block rounded-xl px-3 py-2 transition hover:bg-white/5 hover:text-amber-300"
          >
            About
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/blog/create"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl border border-amber-300/40 bg-amber-400/10 px-3 py-2 text-center font-semibold text-amber-100 transition hover:bg-amber-400 hover:text-slate-950"
              >
                Write
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
                className="w-full rounded-xl border border-white/15 px-3 py-2 text-left font-semibold text-slate-100 transition hover:border-amber-300/50 hover:text-amber-200"
              >
                Logout
              </button>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">
                  {user?.fullname || user?.username || 'InkPress Writer'}
                </p>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  {user?.email || 'Signed in'}
                </p>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl border border-white/15 px-3 py-2 text-center font-semibold text-slate-100 transition hover:border-amber-300/50 hover:text-amber-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl border border-amber-300/40 bg-amber-400/10 px-3 py-2 text-center font-semibold text-amber-100 transition hover:bg-amber-400 hover:text-slate-950"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
