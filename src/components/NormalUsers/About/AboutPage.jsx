"use client";

const AboutPage = () => {
    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-gray-900">About Us</h1>
                <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                    Your trusted source for breaking news, insightful articles, and engaging stories. Stay informed, stay inspired.
                </p>
            </div>

            {/* Who We Are */}
         {/* Who We Are */}
<div className="bg-gray-100 text-gray-800 p-8 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold">Who We Are</h2>
    <p className="mt-4 text-lg leading-relaxed">
        We are a team of passionate writers, journalists, and industry experts committed to bringing you the latest and 
        most reliable news. Whether it's politics, technology, lifestyle, or entertainment, we cover it all with integrity and depth.
    </p>
</div>

            {/* Mission Section */}
            <div className="mt-12 bg-gray-100 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                    Our mission is simple: to provide accurate, timely, and thought-provoking content that educates and empowers our readers. 
                    In a world of misinformation, we strive to be a beacon of truth and credibility.
                </p>
            </div>

            {/* Our Values */}
            <div className="mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-blue-500">
                        <h3 className="text-xl font-semibold text-gray-800">Integrity</h3>
                        <p className="text-gray-600 mt-2">
                            We uphold the highest ethical standards, ensuring our content is accurate, unbiased, and thoroughly researched.
                        </p>
                    </div>
                    <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-green-500">
                        <h3 className="text-xl font-semibold text-gray-800">Innovation</h3>
                        <p className="text-gray-600 mt-2">
                            We embrace digital transformation, utilizing cutting-edge technology to deliver news in a fast and engaging manner.
                        </p>
                    </div>
                    <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-red-500">
                        <h3 className="text-xl font-semibold text-gray-800">Transparency</h3>
                        <p className="text-gray-600 mt-2">
                            We believe in honest reporting and always credit our sources, ensuring full transparency with our audience.
                        </p>
                    </div>
                    <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-purple-500">
                        <h3 className="text-xl font-semibold text-gray-800">Community</h3>
                        <p className="text-gray-600 mt-2">
                            Our readers are at the heart of everything we do. We encourage open discussions and value diverse perspectives.
                        </p>
                    </div>
                </div>
            </div>

            {/* Meet The Team */}
            <div className="mt-12 bg-blue-50 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
                <p className="mt-4 text-lg text-gray-700">
                    Behind every article is a talented team of journalists, content creators, and editors dedicated to bringing you quality content. 
                    Want to join us? Get in touch today!
                </p>
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
                <h2 className="text-2xl font-bold text-gray-800">Stay Connected</h2>
                <p className="text-lg text-gray-600 mt-2">
                    Follow us on social media and never miss an update. Your voice matters—join the conversation!
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
