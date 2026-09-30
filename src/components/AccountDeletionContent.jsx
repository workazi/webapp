import React from "react";

export default function AccountDeletionContent() {
  return (
    <article className="space-y-8">
      {/* Header Banner / Title */}
      <header className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Request Workazi Account Deletion
        </h1>
        <p className="text-slate-600 text-sm mt-2">
          <strong>Application:</strong> Workazi &nbsp;|&nbsp; 
          <strong>Effective Date:</strong> 15th May 2025 &nbsp;|&nbsp; 
          <strong>Contact:</strong> team@workazi.ke
        </p>
      </header>

      {/* Introduction */}
      <section className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Workazi users can request deletion of their account directly from within the Workazi mobile application.
          Requesting account deletion will deactivate your account and initiate the account deletion process.
        </p>
        <p className="text-slate-700 leading-relaxed">
          For a limited period of <strong>30 days</strong> following your deletion request, your deleted account may be recoverable by contacting Workazi Support. Your account is disabled during this period and will become permanently deleted or anonymized once the 30-day recovery window expires.
        </p>
      </section>

      {/* How to Delete Your Workazi Account */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold">1</span>
          How to Delete Your Workazi Account
        </h2>
        <p className="text-sm text-slate-600">
          You can initiate the account deletion process yourself directly inside the Workazi app without needing to contact support:
        </p>
        <ol className="space-y-3 pl-2">
          <li className="flex items-start gap-3 text-sm text-slate-800">
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Step 1</span>
            <span>Open the <strong>Workazi</strong> app on your mobile device.</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-slate-800">
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Step 2</span>
            <span>Sign in to your Workazi account.</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-slate-800">
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Step 3</span>
            <span>Open <strong>Settings</strong> from your profile or menu.</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-slate-800">
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Step 4</span>
            <span>Select <strong>Delete Account</strong>.</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-slate-800">
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Step 5</span>
            <span>Follow the on-screen instructions to confirm your deletion request.</span>
          </li>
        </ol>

        <div className="pt-4 border-t border-slate-200/80">
          <h3 className="font-semibold text-slate-900 text-sm">Alternative Option: Permanent Deletion Request via Email</h3>
          <p className="text-xs text-slate-600 mt-1">
            If you are unable to access the mobile application, you may request permanent account deletion by sending an email to{" "}
            <a href="mailto:team@workazi.ke" className="text-emerald-600 underline font-medium">team@workazi.ke</a> with the subject line <em>"Account Deletion Request"</em>. Further instructions will be provided, the deletion process will start, and you will be notified once the deletion is completed.
          </p>
        </div>
      </section>

      {/* What Happens After I Delete My Account? */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">What Happens After I Delete My Account?</h2>
        <div className="bg-emerald-50/60 border-l-4 border-emerald-500 p-4 rounded-r-lg text-sm text-slate-700 leading-relaxed">
          When you request deletion of your Workazi account, your account is marked as deleted and access to the account is disabled. During the account recovery period, you may contact Workazi Support to request recovery of your account. After the recovery period expires, the account deletion process becomes permanent and the applicable personal data is deleted or anonymized.
        </div>
      </section>

      {/* Can I Recover My Deleted Account? */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Can I Recover My Deleted Account?</h2>
        <p className="text-slate-700 leading-relaxed">
          If you change your mind after requesting account deletion, you may contact Workazi Support within <strong>30 days</strong> to request account recovery.
        </p>
        <p className="text-slate-700 leading-relaxed">
          After the <strong>30-day</strong> recovery period expires, the account deletion process is completed and the account may no longer be recoverable.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-900">
          <strong>Note:</strong> Account recovery requests are subject to verification to confirm ownership of the account before access can be restored.
        </div>
      </section>

      {/* Data During the Recovery Period */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Data During the Recovery Period (30 Days)</h2>
        <p className="text-slate-700 leading-relaxed">
          While your account is within the 30-day recovery period:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm">
          <li>The account is no longer active on the Workazi platform.</li>
          <li>You cannot normally access or log into the account.</li>
          <li>Your personal information remains stored securely solely as necessary to allow account recovery if requested.</li>
          <li>The account is not treated or processed as an active account during this period.</li>
        </ul>
      </section>

      {/* Data Deleted or Anonymized */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Data Deleted or Anonymized Upon Completion</h2>
        <p className="text-slate-700 leading-relaxed">
          When the 30-day recovery period expires, the following categories of data associated with your Workazi account are processed as follows:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <h3 className="font-bold text-slate-900 text-sm mb-2 text-emerald-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Permanently Deleted
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Profile photo and uploaded documents (ID, certifications)</li>
              <li>GPS and precise location data</li>
              <li>Device identifiers and push notification tokens</li>
              <li>Saved preferences and job search history</li>
            </ul>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <h3 className="font-bold text-slate-900 text-sm mb-2 text-blue-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> Anonymized / Scrubbed
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Full Name, email address, and phone number (disassociated from records)</li>
              <li>In-app communication logs (anonymized for counterparty records)</li>
              <li>Job application history (aggregated for statistics without personal IDs)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Data Retained After Deletion */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Data Retained After Deletion</h2>
        <p className="text-slate-700 leading-relaxed">
          Certain information may remain in Workazi's records even after the account deletion process is completed, strictly where necessary for:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm">
          <li><strong>Legal or regulatory compliance:</strong> Tax, financial audit, and statutory obligations.</li>
          <li><strong>Financial or transaction records:</strong> Payment and billing history for completed transactions.</li>
          <li><strong>Fraud prevention and security:</strong> Preventing malicious activity, ban evasion, or security threats.</li>
          <li><strong>Resolving disputes and enforcing agreements:</strong> Preserving records relevant to active or potential legal claims.</li>
        </ul>
        <p className="text-xs text-slate-600 italic mt-2">
          Retained information is not used to restore or maintain your deleted account unless you successfully request recovery during the permitted 30-day recovery period.
        </p>
      </section>

      {/* Database Integrity */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Database Integrity</h2>
        <p className="text-slate-700 leading-relaxed">
          Some non-personal records may remain after account deletion to maintain the integrity of Workazi's records and related transactions. Where possible, information that can identify you is removed or anonymized.
        </p>
      </section>

      {/* Retention Period */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Retention Period</h2>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm">
          <li><strong>Account Recovery Data:</strong> Retained for 30 days following deletion request.</li>
          <li><strong>Financial &amp; Payment Records:</strong> Retained for up to 7 years in accordance with tax and financial record-keeping laws.</li>
          <li><strong>Statutory &amp; Legal Compliance Data:</strong> Information that must be retained to comply with legal or regulatory requirements is retained only for the period required by applicable law.</li>
        </ul>
      </section>

      {/* Account Deletion Completion */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Account Deletion Completion</h2>
        <p className="text-slate-700 leading-relaxed">
          After the account recovery period (30 days) expires, the account cannot be recovered and the applicable personal data is permanently deleted or anonymized, subject to any information that Workazi is legally required or otherwise permitted to retain.
        </p>
      </section>

      {/* Support Section */}
      <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Workazi Support &amp; Assistance</h2>
        <p className="text-sm text-slate-700">
          If you want to recover your account during the 30-day recovery period, request permanent deletion via email, or experience any issues with account deletion, please contact Workazi Support:
        </p>
        <div className="text-sm text-slate-800 space-y-1 font-mono bg-white p-4 rounded-lg border border-emerald-100">
          <p><strong>Email:</strong> team@workazi.ke</p>
          <p><strong>Phone:</strong> +254 117 052 267</p>
          <p><strong>Data Controller &amp; DPO:</strong> Joan Nabusoba (DIMOGARE (2023) Ltd.)</p>
        </div>
      </section>
    </article>
  );
}

