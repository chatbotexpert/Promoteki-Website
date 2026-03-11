import React from 'react';

const TermsOfUse = () => {
  return (
    <>
      <section className="pt-32 pb-16 px-6 min-h-[40vh] flex flex-col justify-end">
        <p className="text-sm md:text-base uppercase tracking-widest mb-4 font-medium text-gray-500">Legal Agreement</p>
        <h1 className="text-[8vw] leading-[0.85] font-bold tracking-tighter uppercase display-font">
          Terms of Use
        </h1>
        <div className="mt-8 b-top pt-8 max-w-3xl">
          <p className="text-xl md:text-2xl font-medium leading-relaxed display-font text-gray-700">
            Please read these terms carefully before using our services or accessing our platform.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-white border-t border-black/10">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="border-l-4 border-black pl-6 py-4 bg-gray-50/50">
            <h2 className="text-2xl font-bold display-font uppercase mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing or using the services provided by Promoteki ("we," "us," or "our"), you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our site and services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold display-font uppercase mb-4">2. Intellectual Property Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The Site and its original content, features, and functionality are and will remain the exclusive property of Promoteki and its licensors. Our intellectual property includes, but is not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Custom software and automation scripts developed by our team</li>
              <li>Design assets, logos, and UI/UX patterns featured on our platform</li>
              <li>Proprietary methodologies and RPA frameworks used in our digital studio</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold display-font uppercase mb-4">3. Use of Services</h2>
            <p className="text-gray-600 leading-relaxed">
              Our services are provided for the purpose of business automation, web development, and digital transformation. You agree not to use our proprietary tools or services for any unauthorized or illegal activities, including but not limited to, reverse engineering our automation logic or attempting to breach our security infrastructure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold display-font uppercase mb-4">4. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              In no event shall Promoteki be held liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold display-font uppercase mb-4">5. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These terms shall be governed and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions. Any legal action or proceeding related to your access to or use of the Site or services shall be instituted exclusively in the courts located in Multan, Pakistan.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold display-font uppercase mb-4">6. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes by posting the new Terms on this page. Your continued use of the Site after such modifications will constitute acknowledgment and acceptance of the modified Terms.
            </p>
          </div>

          <div className="pt-12 border-t border-black/10">
            <p className="text-sm text-gray-400 font-mono">Last Updated: March 11, 2026</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsOfUse;
