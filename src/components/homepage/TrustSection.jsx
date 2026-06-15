export default function TrustSection() {
  const features = [
    "Verified construction workers",
    "Skilled and vetted professionals",
    "Faster hiring process",
    "Property marketplace",
    "Equipment and hardware advertising",
    "Secure connections between clients and workers",
  ];

  return (
    <section className="overflow-hidden bg-white px-6 py-16 md:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
        {/* Content */}
        <div className="space-y-6 lg:flex-1">
          <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Built to create trust{" "}
            <span className="text-green-500">
              between clients and workers
            </span>
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
            A single platform where construction hiring, property promotion,
            and equipment discovery feel safer, faster, and more reliable.
          </p>

          <div className="flex flex-col gap-1">
            {features.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-white/90 px-4 py-3 backdrop-blur-sm"
              >
                <span>✔️</span>
                <span className="text-sm font-medium text-slate-800 sm:text-[15px]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="lg:w-5/12 flex">
          <div className="h-72 sm:h-96 lg:h-[600px] overflow-hidden rounded-4xl s">
            <img
              src="/assets/app_screenshot.png"
              alt="App screenshot"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}