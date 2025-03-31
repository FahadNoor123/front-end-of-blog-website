"use client";

const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-lg text-gray-700">
                Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit our blog.
            </p>

            {/* Data Collection */}
            <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Information We Collect</h2>
                <p className="text-gray-700">
                    We may collect personal information such as your name and email if you subscribe to our newsletter. We also collect non-personal data like IP addresses and browser types for analytics.
                </p>
            </div>

            {/* Cookies */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies</h2>
                <p className="text-gray-700">
                    Our website uses cookies to enhance your experience. You can choose to disable cookies in your browser settings.
                </p>
            </div>

            {/* Third-Party Services */}
            <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Services</h2>
                <p className="text-gray-700">
                    We use Google AdSense to serve ads, and Google Analytics to track website performance. These services may collect information as per their own privacy policies.
                </p>
            </div>

            {/* User Rights */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
                <p className="text-gray-700">
                    You have the right to request access, modification, or deletion of your personal data. Contact us if you have concerns.
                </p>
            </div>

            {/* Contact Info */}
            <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-gray-700">
                    If you have any questions about this Privacy Policy, please contact us at <span className="font-bold">your-email@example.com</span>.
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
