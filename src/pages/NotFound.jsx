import React from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../components/homepage/NavigationBar";
import Footer from "../components/homepage/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col justify-between">
      <div className="bg-linear-to-r from-green-50 via-lime-50 to-white border-b border-slate-200/60 pb-8">
        <NavigationBar />
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20 w-full grow text-center flex flex-col items-center justify-center space-y-6">
        <div className="inline-block bg-emerald-100 text-emerald-800 text-sm font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
          Error 404
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
          Page Not Found
        </h1>

        <p className="text-slate-600 max-w-lg text-base leading-relaxed">
          Sorry, the page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shadow-md hover:shadow-lg text-sm"
          >
            Back to Home
          </Link>
          <Link
            to="/privacy-policy"
            className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all border border-slate-300 text-sm"
          >
            Privacy Policy
          </Link>
          <Link
            to="/request-account-deletion"
            className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all border border-slate-300 text-sm"
          >
            Account Deletion
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

