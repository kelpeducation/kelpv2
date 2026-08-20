'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import { FileCheck, BookOpen, AlertCircle, HelpCircle, Phone, Mail } from 'lucide-react';
import { DecorativeBackground } from '@/components/ui/decorative-background';

const TermsOfService = () => {
    const containerRef = useGSAPAnimation();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main ref={containerRef} className="pt-24 pb-16">
                {/* Hero Section */}
                <section className="relative bg-primary text-white py-20 px-6">
                    <div className="container-custom relative z-10 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-secondary/20 rounded-full mb-6 backdrop-blur-sm">
                            <FileCheck className="text-secondary" size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            Please read these terms carefully before using our services.
                        </p>
                    </div>
                    {/* Background Pattern */}
                    <DecorativeBackground gridOpacity={0.03} gridSize={40} />
                </section>

                {/* Content Section */}
                <div className="container-custom py-16 max-w-4xl">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 space-y-12">

                        {/* Agreement */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                                <div className="w-8 h-1 bg-secondary rounded-full"></div>
                                Agreement to Terms
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                By accessing or using the services provided by Kennis Education for Literacy and Potential Ltd ("KELP Ltd"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
                            </p>
                        </div>

                        {/* Services Description */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                                <div className="w-8 h-1 bg-secondary rounded-full"></div>
                                Our Educational Services
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                KELP Ltd provides a range of educational solutions, including but not limited to:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4 mt-4">
                                {[
                                    "Modern Languages Consultancy",
                                    "Coaching & Mentorship",
                                    "Program & Curriculum Development",
                                    "Content Strategies",
                                    "Teacher Training",
                                    "After-School Programs",
                                    "Literacy & Life Skills Workshops"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 text-slate-700">
                                        <BookOpen size={16} className="text-secondary" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* User Obligations */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                                <div className="w-8 h-1 bg-secondary rounded-full"></div>
                                User Responsibilities
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                As a user of our services, you agree to:
                            </p>
                            <ul className="list-disc pl-6 space-y-3 text-slate-600 marker:text-secondary">
                                <li>Provide accurate and complete information during registration or enrollment.</li>
                                <li>Respect the intellectual property rights of KELP Ltd and our content.</li>
                                <li>Conduct yourself in a respectful manner towards instructors, staff, and fellow students.</li>
                                <li>Pay all applicable fees for selected courses or services in a timely manner.</li>
                            </ul>
                        </div>

                        {/* Intellectual Property */}
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4">
                            <AlertCircle className="text-secondary shrink-0" size={24} />
                            <div>
                                <h3 className="font-semibold text-primary mb-2">Intellectual Property Rights</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    All content, materials, curricula, and methodologies provided by KELP Ltd are the exclusive property of KELP Ltd. You may not reproduce, distribute, or create derivative works without our express written permission.
                                </p>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                                <div className="w-8 h-1 bg-secondary rounded-full"></div>
                                Limitation of Liability
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                While we strive for excellence in all our educational programs, KELP Ltd shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our services. Our commitment is to provide the highest quality education and support to help you reach your potential.
                            </p>
                        </div>

                        {/* Updates to Terms */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                                <div className="w-8 h-1 bg-secondary rounded-full"></div>
                                Changes to Terms
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                We reserve the right to modify these terms at any time. We will notify users of any significant changes. Your continued use of our services following any changes indicates your acceptance of the new terms.
                            </p>
                        </div>

                        {/* Contact Section */}
                        <div className="bg-primary text-white p-8 rounded-3xl mt-12">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">Questions?</h3>
                                    <p className="text-slate-300">
                                        Contact our support team for any clarifications.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <a href="tel:+250734155573" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                                        <Phone className="text-secondary" size={20} />
                                    </a>
                                    <a href="mailto:kelpeducation@gmail.com" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                                        <Mail className="text-secondary" size={20} />
                                    </a>
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

export default TermsOfService;
