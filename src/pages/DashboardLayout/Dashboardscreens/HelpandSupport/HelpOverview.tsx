// src/pages/HelpOverview.tsx
import React, { useState } from 'react';
import { ChevronDown, MessageSquare, Zap, Target, Mail, Phone, MessageCircle } from 'lucide-react';

// --- Types ---
interface FAQ {
    question: string;
    topic: string;
    answer: string;
}

interface HelpOverviewProps {
    setActiveView: (view: 'Overview' | 'Contact Support' | 'System Support' | 'Feature Request') => void;
}

// --- Data ---
const faqTopics = [
    'All Topics', 'Order Management', 'Payment & Billing', 'Menu Setup', 'Technical Issues', 'Account Settings'
];

const faqs: FAQ[] = [
    { question: 'How Do I Update Order Status?', topic: 'Order Management', answer: 'You can update the order status directly on the Order Dashboard by clicking the status badge and selecting the new stage.' },
    { question: 'Troubleshooting App Connectivity Issues?', topic: 'Technical Issues', answer: 'Check your internet connection, refresh the page, or view the System Support page for detailed steps.' },
    { question: 'Why Am I Not Receiving Order Notifications?', topic: 'Technical Issues', answer: 'Ensure your browser has permission for notifications and check your Settings > Notifications page.' },
    { question: 'Can I Cancel An Order After Accepting It?', topic: 'Order Management', answer: 'Cancellations after acceptance are handled by contacting support directly via the Contact Support page.' },
    { question: 'When Do I Receive Payments?', topic: 'Payment & Billing', answer: 'Payments are typically processed within 2-3 business days after the successful delivery or service.' },
];

const contactChannels = [
    { title: 'Email Support', icon: Mail, availability: 'Response Time: 2-4 Hours', detail: 'support@restaurant.com', color: 'text-blue-600' },
    { title: 'Phone Support', icon: Phone, availability: 'Available 24/7', detail: '+1 (555) 123-4567', color: 'text-green-600' },
    { title: 'Live Chat', icon: MessageCircle, availability: 'Available 9 AM - 6 PM', detail: 'Start Chat', color: 'text-blue-600' },
];

const HelpOverview: React.FC<HelpOverviewProps> = ({ setActiveView }) => {
    const [activeTopic, setActiveTopic] = useState('All Topics');
    const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

    const filteredFaqs = faqs.filter(f => activeTopic === 'All Topics' || f.topic === activeTopic);

    return (
        <div className="space-y-10">
            {/* FAQ Section */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked</h2>

                {/* FAQ Filter */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {faqTopics.map((topic) => (
                        <button
                            key={topic}
                            onClick={() => setActiveTopic(topic)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition
                                ${activeTopic === topic
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {topic}
                        </button>
                    ))}
                </div>

                {/* FAQ List */}
                <div className="space-y-3 border border-gray-200 rounded-lg divide-y divide-gray-200 bg-white">
                    {filteredFaqs.map((faq, i) => (
                         <div key={i}>
                            <button
                                className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-700 hover:bg-gray-50 transition"
                                onClick={() => setOpenFAQIndex(openFAQIndex === i ? null : i)}
                            >
                                <span className="text-base">{faq.question}</span>
                                <ChevronDown className={`w-5 h-5 transition-transform ${openFAQIndex === i ? 'transform rotate-180' : ''}`} />
                            </button>
                            {openFAQIndex === i && (
                                <div className="p-4 bg-gray-50 text-gray-600 text-sm border-t border-gray-200">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Channels Preview */}
            {/* <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Channels</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contactChannels.map((channel, i) => (
                        <div 
                            key={i} 
                            onClick={() => setActiveView('Contact Support')} // Directs to ContactSupport on click
                            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col justify-between border-t-4 border-transparent hover:border-blue-500 cursor-pointer"
                        >
                            <div className="flex items-center mb-4">
                                <div className="p-3 bg-gray-100 rounded-full mr-3">
                                    <channel.icon className="w-6 h-6 text-gray-600" />
                                </div>
                                <h3 className="text-lg font-semibold">{channel.title}</h3>
                            </div>
                            <p className="text-gray-500 text-sm">{channel.availability}</p>
                            <p className={`font-medium mt-1 ${channel.color}`}>{channel.detail}</p>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    );
};

export default HelpOverview;