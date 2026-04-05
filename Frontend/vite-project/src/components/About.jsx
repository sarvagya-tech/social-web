function About() {
  return (
    <section className="bg-slate-950 text-white px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-amber-400/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              About InkPress
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
              A publishing home for curious writers and thoughtful readers.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
              InkPress is built for stories that teach, inspire, and help people move faster.
              We bring together creator-led essays, practical guides, and creative ideas in a calm,
              elegant reading experience.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm shadow-slate-950/20 backdrop-blur-sm">
                <p className="text-3xl font-semibold text-white">4.9/5</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Reader satisfaction from carefully curated writing and clear storytelling.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm shadow-slate-950/20 backdrop-blur-sm">
                <p className="text-3xl font-semibold text-white">100+ Blogs</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Fresh perspectives on design, technology, productivity, and creative living.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/40">
            <div className="space-y-5">
              <div className="rounded-3xl bg-amber-400/10 p-5">
                <h3 className="text-lg font-semibold text-white">Our mission</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Make great writing feel accessible, modern, and easy to explore for everyone.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-800/90 p-5">
                <h3 className="text-lg font-semibold text-white">Why choose us</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Thoughtful layout, strong visuals, and a calm reading flow help your ideas land.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-800/90 p-5">
                <h3 className="text-lg font-semibold text-white">For creators</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Publish stories with confidence and connect with an audience that values quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
