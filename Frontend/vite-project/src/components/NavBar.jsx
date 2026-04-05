import { Link } from 'react-router-dom';
import { useAuth } from '../service/Authcontext';

function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();

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
            <Link
            to={'/about'}
             className="transition hover:text-amber-300" href="#">
              About
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/blog/create"
                className="hidden rounded-full border border-amber-300/40 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-400 hover:text-slate-950 sm:inline-flex"
              >
                Write
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-amber-300/50 hover:text-amber-200 sm:inline-flex"
              >
                Logout
              </button>
              <div className="hidden text-right text-sm text-slate-300 sm:block">
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
