function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-12 sm:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 text-slate-300 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h4 className="text-2xl font-black text-white [font-family:'Playfair_Display',serif]">
            Ink<span className="text-amber-400">Press</span>
          </h4>
          <p className="mt-3 text-sm leading-7">
            Thoughtful writing on tech, design, and modern creative life.
          </p>
        </div>

        <div>
          <h5 className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-amber-200">
            Explore
          </h5>
          <ul className="space-y-2 text-sm">
            <li>Articles</li>
            <li>Categories</li>
            <li>Writers</li>
            <li>Newsletter</li>
          </ul>
        </div>

        <div>
          <h5 className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-amber-200">
            Company
          </h5>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Contact</li>
            <li>Careers</li>
            <li>Support</li>
          </ul>
        </div>

        <div>
          <h5 className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-amber-200">
            Follow
          </h5>
          <ul className="space-y-2 text-sm">
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>Twitter</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-7xl border-t border-white/10 pt-6 text-xs text-slate-400">
        © 2026 InkPress. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
