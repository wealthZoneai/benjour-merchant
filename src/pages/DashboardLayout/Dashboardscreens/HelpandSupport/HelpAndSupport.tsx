// src/pages/HelpAndSupportPage.js
import React, { useState } from 'react';
import { MessageSquare, Zap, Target, Mail, Phone, MessageCircle } from 'lucide-react';
import SupportBox from './SupportBox';
import FAQItem from './FAQItem';

// --- Mock Data ---
const supportBoxes = [
    { title: 'Contact Support', description: 'Get Help From Our Support Team', icon: MessageSquare, color: { bg: 'bg-purple-100', text: 'text-purple-600' } },
    { title: 'System Support', description: 'Check Platform Status', icon: Zap, color: { bg: 'bg-green-100', text: 'text-green-600' } },
    { title: 'Feature Request', description: 'Suggest New Features', icon: Target, color: { bg: 'bg-gray-200', text: 'text-gray-700' } },
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
    { title: 'Email Support', icon: Mail, availability: 'Response Time: 2-4 Hours', detail: 'support@restaurant.com', detailColor: 'text-blue-600' },
    { title: 'Phone Support', icon: Phone, availability: 'Available 24/7', detail: '+1 (555) 123-4567', detailColor: 'text-green-600' },
    { title: 'Live Chat', icon: MessageCircle, availability: 'Available 9 AM - 6 PM', detail: 'Start Chat', detailColor: 'text-blue-600' },
];
// -----------------

const HelpAndSupport = () => {
    const [activeTopic, setActiveTopic] = useState('All Topics');

    // In a real app, you would filter faqs based on activeTopic here

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            {/* Header and Top Button */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Help & Support</h1>
                    <p className="text-gray-600 mt-1">Find Answers To Common Questions Or Get In Touch With Our Support Team</p>
                </div>
                <button className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Support
                </button>
            </div>

            {/* Top Support Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {supportBoxes.map((box, index) => (
                    <SupportBox
                        key={index}
                        title={box.title}
                        description={box.description}
                        icon={box.icon}
                        colorClass={box.color}
                    />
                ))}
            </div>

            {/* Frequently Asked Section */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked</h2>

            {/* FAQ Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
                {faqTopics.map((topic) => (
                    <button
                        key={topic}
                        onClick={() => setActiveTopic(topic)}
                        className={`px-4 py-2 text-sm rounded-lg transition-colors
                            ${activeTopic === topic
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {topic}
                    </button>
                ))}
            </div>

            {/* FAQ List */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-12">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} />
                ))}
            </div>

            {/* Contact Channels Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactChannels.map((channel, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between border-t-4 border-gray-200">
                        <div className="flex items-center mb-4">
                            <channel.icon className="w-6 h-6 mr-3 text-gray-500" />
                            <h3 className="text-lg font-semibold text-gray-800">{channel.title}</h3>
                        </div>
                        <p className="text-sm text-gray-500">{channel.availability}</p>
                        <p className={`font-medium mt-1 ${channel.detailColor}`}>{channel.detail}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HelpAndSupport;