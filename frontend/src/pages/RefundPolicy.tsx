import React from 'react';

const RefundPolicy = () => {
  return (
    <>
      <section className="pt-32 pb-16 px-6 min-h-[40vh] flex flex-col justify-end">
        <p className="text-sm md:text-base uppercase tracking-widest mb-4 font-medium text-gray-500">Service Guarantee</p>
        <h1 className="text-[8vw] leading-[0.85] font-bold tracking-tighter uppercase display-font">
          Refund Policy
        </h1>
        <div className="mt-8 b-top pt-8 max-w-3xl">
          <p className="text-xl md:text-2xl font-medium leading-relaxed display-font text-gray-700">
            We strive for excellence in our digital services. This policy outlines our commitment to transparency regarding refunds and cancellations.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-white border-t border-black/10">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="border-l-4 border-black pl-6 py-4 bg-gray-50/50">
            <h2 className="text-2xl font-bold display-font uppercase mb-4">1. Digital Services</h2>
            <p className="text-gray-600 leading-relaxed">
              Due to the nature of our digital studio services (including but not limited to UI/UX design, custom automation, and RPA development), refunds are generally not provided once work has commenced or a discovery/onboarding phase has been completed.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold display-font uppercase mb-4">2. VPS & Infrastructure</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              For VPS Forge and other infrastructure services, the following rules apply:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Cancellations requested within 24 hours of provision may be eligible for a pro-rated refund.</li>
              <li>Subscription renewals are non-refundable once processed.</li>
              <li>Violations of our Terms of Use resulting in service suspension are not eligible for refunds.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold display-font uppercase mb-4">3. Custom Development</h2>
            <p className="text-gray-600 leading-relaxed">
              For custom development projects, payments are milestone-based. Once a milestone is approved and delivered, the associated payment is non-refundable. If a project is cancelled mid-milestone, you may be eligible for a refund of the unused portion of the current milestone's deposit.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold display-font uppercase mb-4">4. Requesting a Refund</h2>
            <p className="text-gray-600 leading-relaxed">
              To request an evaluation for a refund, please contact us at <span className="font-bold text-black">contact@promoteki.com</span> with your project/order ID and a detailed explanation of your request. All requests are reviewed manually by the Promoteki Nodal team.
            </p>
          </div>

          <div className="pt-12 border-t border-black/10">
            <p className="text-sm text-gray-400 font-mono">Last Updated: March 14, 2026</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default RefundPolicy;
