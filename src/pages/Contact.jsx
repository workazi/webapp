import NavigationBar from '../components/homepage/NavigationBar'
import ContactForm from '../components/contact/ContactForm'
import { FaEnvelope, FaHeadset, FaClock } from 'react-icons/fa6'
import Footer from '../components/homepage/Footer'

export default function Contact() {
  return (
        <div className="bg-linear-to-br from-green-50 via-lime-50 to-white">
            <NavigationBar />

            <header className="mx-auto max-w-7xl px-6 pb-8 pt-12 text-center md:px-10 lg:px-16 lg:pt-16">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Contact us</p>
                <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
                    Get in touch with Workazi
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
                    Send us a message or reach us directly through the emails below. We&apos;re here to help with jobs, listings and support.
                </p>
            </header>

            <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-16 md:px-10 lg:flex-row lg:items-start lg:gap-16 lg:px-16 lg:pb-20">
                <div className="space-y-6 lg:w-7/12">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6 lg:p-8">
                        <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Send us a message</h2>
                        <ContactForm />
                    </div>
                </div>

                <div className="space-y-6 lg:w-5/12">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
                        <h2 className="text-xl font-bold text-slate-900">Email contacts</h2>

                        <div className="mt-6 space-y-4">
                            <a
                                href="mailto:info@workazi.ke"
                                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-green-300 hover:bg-green-50"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white">
                                    <FaEnvelope />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Contact email</p>
                                    <p className="text-sm text-slate-600">info@workazi.ke</p>
                                </div>
                            </a>

                            <a
                                href="mailto:help@workazi.ke"
                                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-green-300 hover:bg-green-50"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white">
                                    <FaHeadset />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Support email</p>
                                    <p className="text-sm text-slate-600">help@workazi.ke</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
                        <div className="flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white">
                                <FaClock />
                            </span>
                            <h2 className="text-xl font-bold text-slate-900">Working hours</h2>
                        </div>
                        <div className="mt-4 space-y-2 text-sm text-slate-600">
                            <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                            <p>Saturday: 9:00 AM - 1:00 PM</p>
                            <p>Sunday: Closed</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
    </div>
  )
}
