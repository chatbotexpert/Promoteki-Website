import React from 'react';

const PrivacyPolicy = () => {
  return (
    <>
      <section className="pt-32 pb-16 px-6 min-h-[40vh] flex flex-col justify-end">
        <p className="text-sm md:text-base uppercase tracking-widest mb-4 font-medium text-gray-500">Privacy & Data</p>
        <h1 className="text-[8vw] leading-[0.85] font-bold tracking-tighter uppercase display-font">
          Privacy Policy
        </h1>
        <div className="mt-8 b-top pt-8 max-w-3xl">
          <p className="text-xl md:text-2xl font-medium leading-relaxed display-font text-gray-700">
            We are committed to protecting your personal data and respect your privacy throughout our digital ecosystem.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-white border-t border-black/10">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="border-l-4 border-black pl-6 py-4 bg-gray-50/50">
            <h2 className="text-2xl font-bold display-font uppercase mb-4">1. Data Collection</h2>
            <p className="text-gray-600 leading-relaxed">
              At Promoteki, we collect information when you interact with our platform, such as when you fill out a contact form, request a quote, or sign up for our newsletter. This data may include your name, email address, phone number, and business details.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold display-font uppercase mb-4">2. Use of Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The information we collect is used to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Provide and maintain our automation and development services</li>
              <li>Communicate with you regarding project updates and service inquiries</li>
              <li>Improve our website's performance and user experience through analytics</li>
              <li>Personalize your experience with relevant digital solutions and offers</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold display-font uppercase mb-4">3. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement industry-standard security measures to protect your personal information. Our platform uses advanced encryption and secure protocols to prevent unauthorized access, disclosure, or modification of your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold display-font uppercase mb-4">4. Cookie Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies and similar tracking technologies to track the activity on our Site and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold display-font uppercase mb-4">5. Third-Party Sharing</h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold display-font uppercase mb-4">6. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              You have the right to access, update, or delete the personal information we have on you. If you wish to exercise any of these rights, please contact us at contact@promoteki.com.
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

export default PrivacyPolicy;
