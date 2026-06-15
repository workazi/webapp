import { FaBriefcase, FaUsers, FaHome, FaTruck, FaTools } from 'react-icons/fa'

export default function ServicesSection() {
  const services = [
    {
      title: 'Find Construction Jobs',
      desc: 'Search and apply for verified jobs from trusted employers.',
      icon: <FaBriefcase size={20} aria-hidden />,
    },
    {
      title: 'Hire Skilled Workers',
      desc: 'Find masons, plumbers, electricians, painters, carpenters, welders, and more.',
      icon: <FaUsers size={20} aria-hidden />,
    },
    {
      title: 'Property Marketplace',
      desc: 'Browse or list properties for sale, rent, or lease.',
      icon: <FaHome size={20} aria-hidden />,
    },
    {
      title: 'Equipment Marketplace',
      desc: 'Advertise or find excavators, mixers, scaffolding, cranes, and generators.',
      icon: <FaTruck size={20} aria-hidden />,
    },
    {
      title: 'Hardware Marketplace',
      desc: 'Promote building materials and hardware businesses to thousands of construction professionals.',
      icon: <FaTools size={20} aria-hidden />,
    },
  ];

  return (
    <section className="px-6 py-12 lg:py-40 bg-linear-to-r from-white via-lime-50 to-green-50 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold">Services</h2>
          <p className="mt-2 text-slate-600">Everything construction jobs, workers, property, equipment and hardware.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-600">
                {s.icon}
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-slate-600">{s.desc}</p>
              <div className="mt-auto pt-2">
                <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-green-600">Explore →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
