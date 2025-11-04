// src/pages/ContactSupport.tsx
import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, AlertTriangle, Clock, Check } from 'lucide-react';

interface ContactForm {
    email: string;
    phone: string;
    subject: string;
    category: string;
    description: string;
}

interface ContactChannel {
    title: string;
    icon: React.ElementType;
    detail: string;
    color: string;
    availability: string;
    availabilityColor: string; // New field for specific availability text color
}

// Updated data to match the image colors and details
const contactChannels: ContactChannel[] = [
    { title: 'Live Chat', icon: MessageSquare, detail: 'Get instant help from our support team', color: 'text-green-500', availability: 'Available', availabilityColor: 'bg-green-100 text-green-700' },
    { title: 'Phone Support', icon: Phone, detail: 'Call us at +(555) 123-456', color: 'text-blue-500', availability: 'Available', availabilityColor: 'bg-blue-100 text-blue-700' },
    { title: 'Email Support', icon: Mail, detail: 'support@fooddelivery.com', color: 'text-purple-500', availability: 'Available', availabilityColor: 'bg-purple-100 text-purple-700' },
];

const ContactSupport: React.FC = () => {
    const [form, setForm] = useState<ContactForm>({
        email: 'your@Mail.Com',
        phone: '',
        subject: '',
        category: '',
        description: '',
    });

    const categories = ['Select A Category', 'Technical Issue', 'Billing Inquiry', 'Order Problem', 'Feedback'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Support request submitted!');
        // API submission logic here
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            {/* Contact Channels (Matching Screenshot 171039.png Top Section) */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {contactChannels.map((channel, i) => (
                    <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-md">
                        <div className="flex items-center mb-4">
                            <channel.icon className={`w-8 h-8 mr-3 ${channel.color}`} />
                            <h3 className="text-lg font-semibold text-gray-800">{channel.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{channel.detail}</p>
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${channel.availabilityColor}`}>
                            {channel.availability}
                        </span>
                    </div>
                ))}
            </div>

            {/* Left Column: Form (lg:col-span-2) */}
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Submit A Support Request</h2>
                <p className="text-gray-500 mb-6">Fill Out The Below And We'll Get Back To You As Soon As Possible</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address*</label>
                            <input type="email" name="email" value={form.email} onChange={handleChange} required className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Your Phone Number" className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                    {/* Subject */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subject*</label>
                        <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Brief Description of Your Issue" required className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category*</label>
                        <select name="category" value={form.category} onChange={handleChange} required className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description*</label>
                        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Please Provide Detailed Information Of Your Issue" required rows={4} className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    </div>

                    <button type="submit" className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                        Submit Support Request
                    </button>
                </form>
            </div>

            {/* Right Column: Hours & Tips (lg:col-span-1) */}
            <div className="lg:col-span-1 space-y-6">
                {/* Support Hours */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-700 mb-3">Support Hours</h3>
                    <div className="text-sm text-gray-700 space-y-1">
                        <div className="flex justify-between"><span>Monday - Friday</span> <span>24/7</span></div>
                        <div className="flex justify-between"><span>Satday - Sunday</span> <span>24/7</span></div>
                        <div className="flex justify-between"><span>Response Time</span> <span className="text-green-600 font-medium">With in 2 Hours</span></div>
                    </div>
                </div>

                {/* Before Contacting */}
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-700 mb-3">Before You Contact Us</h3>
                    <ul className="text-sm text-gray-700 space-y-2 list-none pl-0">
                        <li className="flex items-start"><Check className="w-4 h-4 mt-1 mr-2 text-green-500 flex-shrink-0" /> Check Our Help & Support Section For Quick Answers</li>
                        <li className="flex items-start"><Check className="w-4 h-4 mt-1 mr-2 text-green-500 flex-shrink-0" /> Include Screenshots If Reporting Technical Issues</li>
                        <li className="flex items-start"><Check className="w-4 h-4 mt-1 mr-2 text-green-500 flex-shrink-0" /> Be As Specific As Possible About The Problem</li>
                    </ul>
                </div>

                {/* Emergency */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-300">
                    <h4 className="text-lg font-bold text-gray-700 mb-1 flex items-center"><AlertTriangle className="w-5 h-5 mr-2 text-blue-600" /> Emergency Support</h4>
                    <p className="text-sm text-gray-700">For Urgent Issues Affecting Your Ability to Receive Orders, Call Our Emergency Line **+6(555) 98-FOOD**</p>
                </div>
            </div>
        </div>
    );
};

export default ContactSupport;