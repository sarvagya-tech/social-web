function Newsletter() {
  return (
    <section className="px-4 py-16 sm:px-8">
      <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-amber-400/20 via-orange-400/10 to-cyan-400/20 p-8 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
              Newsletter
            </p>
            <h3 className="text-4xl font-black leading-tight text-white [font-family:'Playfair_Display',serif] sm:text-5xl">
              Get one smart read in your inbox every weekend
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200">
              Design only for now. Plug your own form submit logic, validation,
              and email provider integration later.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-slate-950/50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-300 focus:border-amber-300 focus:outline-none"
              />
              <button className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold uppercase tracking-[0.1em] text-slate-950 transition hover:bg-amber-300">
                Join
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-300">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
