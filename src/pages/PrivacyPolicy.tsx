import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import { Shield, Lock, FileText, Mail, MapPin } from 'lucide-react';
import Head from 'next/head';

const PrivacyPolicy = () => {
    const containerRef = useGSAPAnimation();

    return (
        <div className="min-h-screen bg-background">
            <Head>
                <title>Privacy Policy | KELP Education</title>
                <meta name="description" content="Read KELP Education's privacy policy to learn how we collect, use, and protect your information." />
            </Head>
            <Navbar />
            <main ref={containerRef} className="pt-24 pb-16">
                {/* Hero Section */}
                <section className="relative bg-primary text-white py-20 px-6">
                    <div className="container-custom relative z-10 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-secondary/20 rounded-full mb-6 backdrop-blur-sm">
                            <Shield className="text-secondary" size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            We value your trust and are committed to protecting your personal information.
                        </p>
                    </div>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,182,213,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(18,182,213,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
                </section>

                {/* Content Section */}
                <div className="container-custom py-16 max-w-4xl">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 space-y-12">

                        {/* Introduction */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                                <div className="w-8 h-1 bg-secondary rounded-full"></div>
                                Introduction
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                Kennis Education for Literacy and Potential Ltd ("KELP Ltd") is dedicated to providing transformative, sustainable, and accessible educational solutions. We respect your privacy and are committed to protecting the personal data we collect from our students, parents, partners, and website visitors.
                            </p>
                        </div>

                        {/* Company Info */}
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h3 className="font-semibold text-primary mb-4">Company Overview</h3>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li className="flex gap-2"><strong className="min-w-[100px]">Full Name:</strong> Kennis Education for Literacy and Potential Ltd</li>
                                <li className="flex gap-2"><strong className="min-w-[100px]">Founded:</strong> August 2024, Rwanda</li>
                                <li className="flex gap-2"><strong className="min-w-[100px]">TIN:</strong> 123112910</li>
                                <li className="flex gap-2"><strong className="min-w-[100px]">Head Office:</strong> Busasamana, Nyanza, Southern Province, Rwanda</li>
                            </ul>
                        </div>

                        {/* Data Collection */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                                <div className="w-8 h-1 bg-secondary rounded-full"></div>
                                Information We Collect
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                We collect information necessary to provide our educational services effectively. This may include:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-slate-600 marker:text-secondary">
                                <li><strong>Personal Identification:</strong> Name, email address, phone number, and location.</li>
                                <li><strong>Educational Data:</strong> Student progress, enrollment details, and assessment results.</li>
                                <li><strong>Communications:</strong> Messages sent via our contact forms or email.</li>
                                <li><strong>Usage Data:</strong> Information on how you interact with our website and digital resources.</li>
                            </ul>
                        </div>

                        {/* How We Use Info */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                                <div className="w-8 h-1 bg-secondary rounded-full"></div>
                                How We Use Your Information
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                Your data helps us to:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    "Deliver personalized coaching and mentorship",
                                    "Process enrollments and payments",
                                    "Improve our curriculum and programs",
                                    "Communicate important updates and offers",
                                    "Ensure the safety and security of our services",
                                    "Comply with legal obligations"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-secondary/30 transition-colors">
                                        <FileText className="text-secondary shrink-0 mt-1" size={16} />
                                        <span className="text-slate-600 text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Data Protection */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                                <div className="w-8 h-1 bg-secondary rounded-full"></div>
                                Data Protection & Security
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                We implement robust security measures to safeguard your personal data against unauthorized access, alteration, disclosure, or destruction. We practice data minimization and only retain information for as long as necessary to fulfill our educational mission and legal requirements.
                            </p>
                        </div>

                        {/* Contact Section */}
                        <div className="bg-primary text-white p-8 rounded-3xl mt-12 text-center">
                            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
                            <p className="text-slate-300 mb-8">
                                If you have any questions about this Privacy Policy, please contact us:
                            </p>
                            <div className="flex flex-col md:flex-row justify-center gap-6">
                                <a href="mailto:kelpeducation@gmail.com" className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-all">
                                    <Mail className="text-secondary" size={20} />
                                    <span>kelpeducation@gmail.com</span>
                                </a>
                                <div className="flex items-center justify-center gap-3 bg-white/10 px-6 py-3 rounded-xl">
                                    <MapPin className="text-secondary" size={20} />
                                    <span>Busasamana, Nyanza, Rwanda</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
