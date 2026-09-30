import React from "react";
import { useRouteError, Link } from "react-router-dom";
import NavigationBar from "./homepage/NavigationBar";
import Footer from "./homepage/Footer";

export default function RootErrorBoundary() {
  const error = useRouteError();
  const errorMessage = error?.message || error?.statusText || "An unexpected error occurred.";
  const isChunkError = errorMessage.includes("Failed to fetch dynamically imported module") || 
                       errorMessage.includes("Importing a module script failed");

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col justify-between">
      <div className="bg-linear-to-r from-green-50 via-lime-50 to-white border-b border-slate-200/60 pb-8">
        <NavigationBar />
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20 w-full grow text-center flex flex-col items-center justify-center space-y-6">
        <div className="inline-block bg-amber-100 text-amber-900 text-sm font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
          {isChunkError ? "App Update Available" : "Application Error"}
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          {isChunkError ? "A new version of Workazi is available" : "Oops! Something went wrong"}
        </h1>

        <p className="text-slate-600 max-w-lg text-base leading-relaxed">
          {isChunkError
            ? "We updated Workazi with improvements. Please refresh the page to load the latest version."
            : "An unexpected error occurred while loading this page. Please try reloading."}
        </p>

        {process.env.NODE_ENV !== 'production' && (
          <div className="bg-slate-100 p-4 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 max-w-lg overflow-x-auto text-left">
            {errorMessage}
          </div>
        )}

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shadow-md text-sm cursor-pointer"
          >
            Reload Page
          </button>
          <a
            href="/"
            className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all border border-slate-300 text-sm"
          >
            Go to Home
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

