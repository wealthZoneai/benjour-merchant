// src/pages/SystemSupport.tsx
import React, { useState } from 'react';
import { ChevronDown, AlertTriangle, RefreshCw, HelpCircle, FileText } from 'lucide-react';

interface FAQ {
    question: string;
    answer: string;
}

const mockFaqs: FAQ[] = [
    { question: 'How Do I Update Order Status?', answer: 'Order status can be updated directly from the Orders Dashboard by clicking the status badge next to the order ID.' },
    { question: 'Troubleshooting App Connectivity Issues?', answer: 'First, check your internet connection. If the issue persists, try clearing your browser cache or restarting the app.' },
    { question: 'Why am I Not Receiving Notifications?', answer: 'Check your notification settings in the Settings panel. Also, ensure your browser or phone has permission to send push notifications.' },
    { question: 'Can I Cancel Order After Accepting It?', answer: 'Orders can be canceled within the first 5 minutes of acceptance. After that, contact support for assistance.' },
];

const SystemSupport: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">System Support</h2>
            <p className="text-gray-500 mb-8">Get Help From Dedicated Support Team. We Are Here For Assist You 24/7.</p>

            {/* Quick Access Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition cursor-pointer">
                    <AlertTriangle className="w-6 h-6 text-indigo-500 mb-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Troubleshooting</h3>
                    <p className="text-sm text-gray-500">Solve common issues</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition cursor-pointer">
                    <RefreshCw className="w-6 h-6 text-indigo-500 mb-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Platform Updates</h3>
                    <p className="text-sm text-gray-500">See What's New</p>
                </div>
            </div>

            {/* FAQ Accordion */}
            <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <HelpCircle className="w-6 h-6 mr-2 text-blue-500" /> Frequently Asked Questions
                </h3>
                
                <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                    {mockFaqs.map((faq, index) => (
                        <div key={index}>
                            <button
                                className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-700 hover:bg-gray-50 transition"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="text-base">{faq.question}</span>
                                <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? 'transform rotate-180' : ''}`} />
                            </button>
                            {openIndex === index && (
                                <div className="p-4 bg-gray-50 text-gray-600 text-sm border-t border-gray-200">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SystemSupport;