// src/pages/FeatureRequest.tsx
import React, { useState } from 'react';
import { ListChecks, Lightbulb, TrendingUp } from 'lucide-react';

interface FeatureForm {
    email: string;
    title: string;
    category: string;
    description: string;
    useCase: string;
    businessImpact: string;
}

const FeatureRequest: React.FC = () => {
    const [form, setForm] = useState<FeatureForm>({
        email: 'your@Mail.Com',
        title: '',
        category: '',
        description: '',
        useCase: '',
        businessImpact: '',
    });

    const categories = ['Select A Category', 'Order Management', 'Reporting', 'Menu Editing', 'User Interface', 'Other'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Feature request submitted!');
        // API submission logic here
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            {/* Left Column: Form */}
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Submit A Feature Request</h2>
                <p className="text-gray-500 mb-6">Tell Us About The Feature You'd Like To See Added To Our Platform</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address*</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@Mail.Com" required className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Feature Title*</label>
                        <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Brief Title for Your Feature Request" required className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category*</label>
                        <select name="category" value={form.category} onChange={handleChange} required className="mt-1 w-full p-2 border border-gray-300 rounded-lg">
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Feature Description*</label>
                        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe The Feature You'd Like Today To See..." required rows={3} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    {/* Use Case */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Use Case*</label>
                        <textarea name="useCase" value={form.useCase} onChange={handleChange} placeholder="How Would You Use This Feature? What Problem Does It Solve?" required rows={2} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    {/* Business Impact */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Business Impact*</label>
                        <textarea name="businessImpact" value={form.businessImpact} onChange={handleChange} placeholder="How Would This Feature Impact Your Business Operation?" required rows={2} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    
                    <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                        Submit Feature Request
                    </button>
                </form>
            </div>

            {/* Right Column: Process & Tips */}
            <div className="lg:col-span-1 space-y-8 p-4 border-l border-gray-100">
                {/* Process */}
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Feature Request Process</h3>
                    <ol className="space-y-4">
                        <li className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold mr-3">1</span>
                            <div>
                                <p className="font-semibold text-gray-700">Submit Request</p>
                                <p className="text-sm text-gray-500">Fill Out The Form With Feature Ideas</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500 text-white flex items-center justify-center text-sm font-bold mr-3">2</span>
                            <div>
                                <p className="font-semibold text-gray-700">Review Process</p>
                                <p className="text-sm text-gray-500">Your idea is assessed by our product team</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mr-3">3</span>
                            <div>
                                <p className="font-semibold text-gray-700">Development</p>
                                <p className="text-sm text-gray-500">Approved Features Enter Our Development Roadmap</p>
                            </div>
                        </li>
                    </ol>
                </div>

                {/* Tips */}
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-300">
                    <h4 className="text-lg font-bold text-gray-700 mb-3 flex items-center"><Lightbulb className="w-5 h-5 mr-2 text-yellow-600" /> Tips For Better Requests</h4>
                    <ul className="text-sm text-gray-700 space-y-2 list-none pl-0">
                        <li className="flex items-start"><ListChecks className="w-4 h-4 mt-1 mr-2 text-yellow-600 flex-shrink-0" /> Be Specific About The Problem You're Solving</li>
                        <li className="flex items-start"><ListChecks className="w-4 h-4 mt-1 mr-2 text-yellow-600 flex-shrink-0" /> Explain How It Would Benefit Your Business</li>
                        <li className="flex items-start"><ListChecks className="w-4 h-4 mt-1 mr-2 text-yellow-600 flex-shrink-0" /> Include Examples Or Mockups If Possible</li>
                        <li className="flex items-start"><ListChecks className="w-4 h-4 mt-1 mr-2 text-yellow-600 flex-shrink-0" /> Check If Similar Request Is Already Exist</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FeatureRequest;