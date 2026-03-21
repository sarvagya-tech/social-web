function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
        <a
          href="#"
          className="text-2xl font-black tracking-tight text-white [font-family:'Playfair_Display',serif]"
        >
          Ink<span className="text-amber-400">Press</span>
        </a>

        <ul className="hidden items-center gap-7 text-sm font-medium text-slate-200 md:flex">
          <li>
            <a className="transition hover:text-amber-300" href="#">
              Home
            </a>
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

        <button className="rounded-full border border-amber-300/40 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-400 hover:text-slate-950">
          Subscribe
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
