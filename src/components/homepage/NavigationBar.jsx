import { useState } from 'react'

export default function NavigationBar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="px-4 h-16 flex items-center justify-between">

      {/* Logo */}
      <h1 className="font-bold text-3xl tracking-wider">
        work<span className="text-green-500">azi</span>
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center">
        <ul className="flex gap-6 items-center">
          <li><a href="#home" className="hover:text-green-500">home</a></li>
          <li><a href="#about" className="hover:text-green-500">about</a></li>
          <li><a href="/contact" className="hover:text-green-500">contact</a></li>
        </ul>

        <a
          href="/register"
          className="border-2 border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white transition"
        >
          Get started
        </a>
      </div>

      {/* Mobile Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6 md:hidden">
          <a href="#home" onClick={() => setOpen(false)}>home</a>
          <a href="#about" onClick={() => setOpen(false)}>about</a>
          <a href="/contact" onClick={() => setOpen(false)}>contact</a>

          <a
            href="/register"
            className="border-2 border-green-500 text-green-500 px-4 py-2 rounded"
            onClick={() => setOpen(false)}
          >
            Get started
          </a>
        </div>
      )}
    </div>
  )
}