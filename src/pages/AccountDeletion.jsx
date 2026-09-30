import React from "react";
import NavigationBar from "../components/homepage/NavigationBar";
import Footer from "../components/homepage/Footer";
import AccountDeletionContent from "../components/AccountDeletionContent";

export default function AccountDeletion() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col justify-between">
      <div className="bg-linear-to-r from-green-50 via-lime-50 to-white border-b border-slate-200/60 pb-8">
        <NavigationBar />
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full grow text-slate-700 leading-relaxed text-sm space-y-8">
        <AccountDeletionContent />
      </main>

      <Footer />
    </div>
  );
}

