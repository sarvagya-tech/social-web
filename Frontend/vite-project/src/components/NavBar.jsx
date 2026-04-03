import { Link } from 'react-router-dom';
import Register from '../pages/Register';
import { useState } from 'react';

function NavBar() {
  const [avatar,setavatar] = useState(null);
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
        <Link
          to="/"
          className="text-2xl font-black tracking-tight text-white [font-family:'Playfair_Display',serif]"
        >
          Ink<span className="text-amber-400">Press</span>
        </Link>

        <ul className="hidden items-center gap-7 text-sm font-medium text-slate-200 md:flex">
          <li>
            <Link className="transition hover:text-amber-300" to="/">
              Home
            </Link>
          </li>
          <li>
            <a className="transition hover:text-amber-300" href="#">
              Articles
            </a>
          </li>
          <li>
            <a className="transition hover:text-amber-300" href="#">
              Categories
            </a>
          </li>
          <li>
            <a className="transition hover:text-amber-300" href="#">
              About
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-amber-300/50 hover:text-amber-200 sm:inline-flex"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-full border border-amber-300/40 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-400 hover:text-slate-950"
          >
            Register
          </Link>
          <button
            type="button"
            aria-label="Profile"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200 transition hover:border-amber-300/50 hover:bg-amber-400/10 hover:text-amber-200"
          >
            <span className="sr-only"
            >Profile</span>
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
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
