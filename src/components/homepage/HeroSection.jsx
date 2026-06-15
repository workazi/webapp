export default function HeroSection() {
  return (
    <section className="overflow-hidden px-6 py-6 md:px-10 lg:px-16 lg:py-8 flex-1">
      <div className="h-full mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-8 lg:flex-row lg:items-center lg:gap-14">
        <div className="space-y-6 lg:flex-1 w-full">

          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Kenya&apos;s Trusted Construction Marketplace
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Verified construction professionals, job opportunities, property listings, hardware suppliers, and equipment rentals-all in one platform.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button className="rounded-xl border border-brand bg-white px-5 py-3 text-sm font-semibold text-brand-dark shadow-sm transition hover:-translate-y-0.5 hover:bg-brand/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30">
              Register online 
            </button>
            <button className="rounded-xl border border-slate-900 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/60 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20">
              Download the app
            </button>
          </div>
        </div>

        <div className="w-full lg:flex-1 flex items-center justify-center">
          <div className="w-full h-64 sm:h-96 lg:h-full overflow-hidden rounded-3xl">
            <img src="/assets/workazi_hero.png" alt="Workazi ecosystem" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
