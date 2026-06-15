export default function CTASection() {
  return (
    <section className="overflow-hidden bg-linear-to-br from-lime-100 via-green-100 to-emerald-200 px-6 py-14 text-slate-900 md:px-10 lg:px-16 lg:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
        <div className="space-y-4 lg:flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green-700">Get started</p>
          <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
            Download the app or register online and start using Workazi today.
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
            Join the marketplace built for construction jobs, workers, property listings, equipment and hardware businesses.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-700"
            >
              Download the app
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl border border-green-300 bg-white/80 px-5 py-2.5 text-sm font-semibold text-green-800 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              Register online
            </a>
          </div>
        </div>

        <div className="lg:flex-1">
          <div className="mx-auto max-w-xl overflow-hidden rounded-3xl p-3 backdrop-blur-sm sm:p-4">
            <img
              src="/assets/cta.png"
              alt="Workazi call to action"
              className="rounded-2xl object-cover sm:h-64 lg:h-100"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
