import React, { useState } from "react";
import NavigationBar from "../components/homepage/NavigationBar";
import Footer from "../components/homepage/Footer";
import PrivacyPolicyContent from "../components/PrivacyPolicyContent";

export default function WorkaziLegal () {
  const [activeTab, setActiveTab] = useState("privacy");

  return (
    <div className="min-h-screen bg-white  text-slate-800 flex flex-col justify-between">
      <div className="bg-linear-to-r from-green-50 via-lime-50 to-white border-b border-slate-200/60 pb-12">
        <NavigationBar />
        <div className="max-w-5xl mx-auto px-4 text-center mt-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Workazi Privacy Policy and Terms of Use
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Effective Date: <span className="font-semibold">15th May 2025</span>
          </p>

          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab("privacy")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "privacy"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-white/80 text-slate-700 hover:bg-white border border-slate-200"
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab("terms")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "terms"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-white/80 text-slate-700 hover:bg-white border border-slate-200"
              }`}
            >
              Terms and Conditions of Use
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full grow text-slate-700 leading-relaxed text-sm space-y-8">
        {activeTab === "privacy" ? (
          <PrivacyPolicyContent />
        ) : (
          <article className="space-y-6">
            <header className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-bold text-slate-900">Terms and Conditions of Use</h2>
            </header>

            <section className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">1. Introduction</h3>
              <p>
                This Terms of Use Agreement (“Agreement”) governs your use of the Workazi application (“Application”). These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity and workazi App owners concerning your access to and use of the Services.
              </p>
              <p>
                By accessing or using the Services of Application, you acknowledge that you have read, understood, and agreed to be bound by all of these Legal Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">2. User Accounts</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Job Seekers:</strong> You must create an account to upload your details, certifications and search for job opportunities.</li>
                <li><strong>Freelancers job seekers:</strong> You must create an account to upload your details, certifications as self-employed individual who offer his/her skills and services on a project or contract basis, rather than being employed full-time by a single contractor.</li>
                <li><strong>Employers/contractors:</strong> You must create an account to view job seeker profiles and post jobs openings.</li>
                <li><strong>Single task employers:</strong> You must create an account to view job seeker profiles and seek employee for specific single or one-time tasks.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">3. User Conduct and Prohibited Activities</h3>
              <p>You agree to use the Application in a lawful, ethical, and respectful manner.</p>
              <p>
                You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
              </p>
              <p>As a user of the Services, you agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                <li>Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.</li>
                <li>Engage in unauthorized framing of or linking to the Services.</li>
                <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                <li>Engage in fraudulent activities</li>
                <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
                <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
                <li>Engage in Posting false or misleading information</li>
                <li>Attempt to impersonate another user or person or use the username of another user.</li>
                <li>Use any information obtained from the Services in order to harass, abuse, discriminate or harm other users or any another person.</li>
                <li>Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
                <li>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.</li>
                <li>Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.</li>
                <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.</li>
                <li>Delete the copyright or other proprietary rights notice from any Content.</li>
                <li>Copy or adapt the Services’ software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
                <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.</li>
                <li>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as “spyware” or “passive collection mechanisms” or “pcms”).</li>
                <li>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or using or launching any unauthorized script or other software.</li>
                <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
                <li>Use Workazi App to engage partisan political activities to gain political advantage and not intended for the benefit of making the youths and other job seekers aware of jobs by offered by contractors using the App.</li>
                <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">4. Job Seekers</h3>
              <p>You agree to provide correct, accurate and up-to-date information and documentation in your profile.</p>
              <p>You understand that employers may use your information to evaluate your suitability for job openings.</p>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">5. Employers</h3>
              <p>You agree to use the Application to post legitimate job openings.</p>
              <p>You are responsible for reviewing job seeker profiles, verifying the authenticity/ validity of the certifications and qualifications in the job seekers profiles and making hiring decisions.</p>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">6. Intellectual Property</h3>
              <p>
                Dimogare (2023) Co. Ltd is the owner or the licensee of all intellectual property rights in workazi App Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the “Content”), as well as the trademarks, service marks, and logos contained therein (the “Marks”).
              </p>
              <p>
                The workazi Application and its content and Marks are protected by copyright, trademark laws and other intellectual property laws (and various other intellectual property rights and unfair competition laws) and treaties in Kenya and around the world.
              </p>
              <p>You shall not reproduce, modify, distribute, or exploit the Application without our prior written consent.</p>

              <h4 className="font-semibold text-slate-900 pt-2">Intellectual Property Rights of Others</h4>
              <p>
                We respect the intellectual property rights of others. If you believe that any material available on or through the Services infringes upon any copyright you own or control, please immediately notify us using the contact information provided below
              </p>
              <p>
                Please be advised that pursuant to law you may be held liable for damages if you make material misrepresentations in the Notification. Thus, if you are not sure that material located on or linked to by the Services infringes your copyright, you should consider first seeking legal advice.
              </p>
              <p>
                All Notifications should include the following information: (1) A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed; (2) identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works on the Services are covered by the Notification, a representative list of such works on the Services; (3) identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material; (4) information reasonably sufficient to permit us to contact the complaining party, such as an address, telephone number, and, if available, an email address at which the complaining party may be contacted; (5) a statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and (6) a statement that the information in the notification is accurate, and that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed upon.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">7. Disclaimer of Warranties</h3>
              <p>
                The services of the Application are provided on an “as is” and as-available basis without warranties of any kind. We do not guarantee the accuracy, completeness, or reliability of the information on the Application. You agree that your use of the services will be at your sole risk.
              </p>
              <p>
                To the fullest extent permitted by law, we disclaim all warranties, express or implied, in connection with the services and your use thereof, including, without limitation, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
              <p>
                We make no warranties or representations about the accuracy or completeness of the services’ content or the content of any websites or mobile applications linked to the services and we will assume no liability or responsibility for any (1) errors, mistakes, or inaccuracies of content and materials, (2) personal injury or property damage, of any nature whatsoever, resulting from your access to and use of the services, (3) any unauthorized access to or use of our secure servers
              </p>
            </section>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
}