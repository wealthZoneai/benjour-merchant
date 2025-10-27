import React, { useState } from 'react';
import { MessageSquare, Zap, Target, Mail, Phone, MessageCircle } from 'lucide-react';
import SupportBox from './SupportBox';
import FAQItem from './FAQItem';

const supportBoxes = [
    { title: 'Contact Support', description: 'Get Help From Our Support Team', icon: MessageSquare, gradient: 'from-purple-500 to-indigo-500' },
    { title: 'System Support', description: 'Check Platform Status', icon: Zap, gradient: 'from-green-400 to-green-600' },
    { title: 'Feature Request', description: 'Suggest New Features', icon: Target, gradient: 'from-yellow-400 to-yellow-500' },
];

const faqTopics = [
    'All Topics', 'Order Management', 'Payment & Billing', 'Menu Setup', 'Technical Issues', 'Account Settings'
];

const faqs = [
    { question: 'How Do I Update Order Status?', topic: 'Order Management' },
    { question: 'When Do I Receive Payments?', topic: 'Payment & Billing' },
    { question: 'How Do I Add New Menu Items?', topic: 'Menu Setup' },
    { question: 'Why Am I Not Receiving Order Notifications?', topic: 'Technical Issues' },
    { question: 'How Do I Change My Restaurant Information?', topic: 'Account Settings' },
    { question: 'Can I Cancel An Order After Accepting It?', topic: 'Order Management' },
];

const contactChannels = [
    { title: 'Email Support', icon: Mail, availability: 'Response Time: 2-4 Hours', detail: 'support@restaurant.com', color: 'text-blue-600' },
    { title: 'Phone Support', icon: Phone, availability: 'Available 24/7', detail: '+1 (555) 123-4567', color: 'text-green-600' },
    { title: 'Live Chat', icon: MessageCircle, availability: 'Available 9 AM - 6 PM', detail: 'Start Chat', color: 'text-blue-600' },
];

const HelpAndSupport = () => {
    const [activeTopic, setActiveTopic] = useState('All Topics');

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10 space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Help & Support</h1>
                    <p className="text-gray-500 text-lg">Find answers to common questions or get in touch with our team.</p>
                </div>
                <button className="flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition transform">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Contact Support
                </button>
            </div>

            {/* Support Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {supportBoxes.map((box, i) => (
                    <div
                        key={i}
                        className={`p-6 rounded-2xl shadow-lg hover:shadow-2xl transition bg-gradient-to-r ${box.gradient} text-white flex flex-col justify-between`}
                    >
                        <div className="flex items-center mb-4">
                            <box.icon className="w-7 h-7 mr-3" />
                            <h3 className="text-xl font-bold">{box.title}</h3>
                        </div>
                        <p className="text-sm opacity-90">{box.description}</p>
                    </div>
                ))}
            </div>

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
                <div className="space-y-3">
                    {faqs
                        .filter(f => activeTopic === 'All Topics' || f.topic === activeTopic)
                        .map((faq, i) => (
                            <FAQItem key={i} question={faq.question} />
                        ))
                    }
                </div>
            </div>

            {/* Contact Channels */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Channels</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contactChannels.map((channel, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col justify-between border-t-4 border-transparent hover:border-blue-500">
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
            </div>
        </div>
    );
};

export default HelpAndSupport;
