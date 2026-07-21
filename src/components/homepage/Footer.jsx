import { FaEnvelope, FaFacebookF, FaHeadset, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <h2 className="text-2xl font-extrabold text-slate-900">
              work<span className="text-green-500">azi</span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Kenya&apos;s construction marketplace for jobs, workers, property, equipment, and hardware.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm text-slate-600">
              <a href="#home" className="hover:text-green-600">Home</a>
              <a href="#about" className="hover:text-green-600">About</a>
              <a href="#playstore" className="hover:text-green-600">Available on Play Store</a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">Social Pages</h3>
            <div className="flex flex-col gap-2 text-sm text-slate-600">
              <a href="https://www.facebook.com/profile.php?id=61569632293338&mibextid=ZbWKwL" target='_blank' className="inline-flex items-center gap-3 hover:text-green-600">
                <FaFacebookF />
                <span>Facebook</span>
              </a>
              <a href="https://www.instagram.com/workazi254/" target='_blank' className="inline-flex items-center gap-3 hover:text-green-600">
                <FaInstagram />
                <span>Instagram</span>
              </a>
              <a href="https://x.com/Workazi254?t=fjMCB2NeMjwy2m3HDB4koA&s=09" target='_blank' className="inline-flex items-center gap-3 hover:text-green-600">
                <FaTiktok />
                <span>Tiktok</span>
              </a>
              <a href="https://www.linkedin.com/company/workazi-kenya/posts/?feedView=all" target='_blank' className="inline-flex items-center gap-3 hover:text-green-600">
                <FaLinkedinIn />
                <span>LinkedIn</span>
              </a>
              <a href="https://x.com/Workazi254?t=fjMCB2NeMjwy2m3HDB4koA&s=09" target='_blank' className="inline-flex items-center gap-3 hover:text-green-600">
                <FaXTwitter />
                <span>X </span>
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">Contact</h3>
            <div className="flex flex-col gap-2 text-sm text-slate-600">
              <a href="mailto:info@workazi.ke" className="inline-flex items-center gap-3 hover:text-green-600">
                <FaEnvelope />
                <span>info@workazi.ke</span>
              </a>
              <a href="mailto:help@workazi.ke" className="inline-flex items-center gap-3 hover:text-green-600">
                <FaHeadset />
                <span>help@workazi.ke</span>
              </a>
              <a href="#terms" className="hover:text-green-600">Terms and Conditions</a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © Workazi</p>
          <a href="#terms" className="hover:text-green-600">Terms and Conditions</a>
        </div>
      </div>
    </footer>
  )
}
