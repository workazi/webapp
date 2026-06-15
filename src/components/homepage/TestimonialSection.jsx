export default function TestimonialSection() {
  const testimonials = [
    {
      name: 'Mercy W.',
      role: 'Site Engineer',
      quote:
        'Workazi helped me find verified projects faster and made it easier to connect with serious clients.',
    },
    {
      name: 'David K.',
      role: 'Property Owner',
      quote:
        'The platform made it simple to list my property and reach people already looking for construction-related listings.',
    },
    {
      name: 'Amina S.',
      role: 'Hardware Supplier',
      quote:
        'I can now promote my hardware business to the exact audience that needs materials and equipment every day.',
    },
  ];

  return (
    <section className="px-8 py-16 md:px-12 lg:px-20 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">What people say about Workazi</h2>
          <p className="mt-3 text-slate-600">Real stories from workers, clients, and businesses using the platform.</p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="flex flex-1 flex-col gap-6 rounded-3xl border border-slate-200 bg-linear-to-br from-white via-lime-50/40 to-green-50/60 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-5xl leading-none text-green-500">&ldquo;</div>
              <p className="text-base leading-relaxed text-slate-700">{item.quote}</p>
              <div className="mt-auto flex items-center gap-4 pt-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  {item.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
