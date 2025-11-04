// src/pages/HelpAndSupport.tsx
import React, { useState } from 'react';
import { MessageSquare, Zap, Target, Mail, Phone, MessageCircle } from 'lucide-react';
import HelpOverview from './HelpOverview';
import SystemSupport from './SystemSupport';
import ContactSupport from './ContactSupport';
import FeatureRequest from './FeatureRequest';


// --- Type Definitions ---
type ActiveView = 'Overview' | 'Contact Support' | 'System Support' | 'Feature Request';

interface SupportBoxProps {
    title: ActiveView; // Use ActiveView as the title type
    description: string;
    icon: React.ElementType;
    gradient: string;
}

const supportBoxes: SupportBoxProps[] = [
    { title: 'System Support', description: 'Check Platform Status, FAQs, and Troubleshooting', icon: Zap, gradient: 'from-green-400 to-green-600' },
    { title: 'Contact Support', description: 'Get help from our dedicated support team 24/7', icon: MessageSquare, gradient: 'from-blue-500 to-indigo-500' },
    { title: 'Feature Request', description: 'Suggest new features and improvements for our platform', icon: Target, gradient: 'from-yellow-400 to-yellow-500' },
];

const HelpAndSupport: React.FC = () => {
    // State to manage the active view (defaults to 'Overview')
    const [activeView, setActiveView] = useState<ActiveView>('Overview');

    // Function to render the correct component based on the active view
    const renderContent = () => {
        switch (activeView) {
            case 'Overview':
                // Renders the main view with the clickable boxes and FAQs
                return <HelpOverview setActiveView={setActiveView} />; 
            case 'System Support':
                return <SystemSupport />;
            case 'Contact Support':
                return <ContactSupport />;
            case 'Feature Request':
                return <FeatureRequest />;
            default:
                return <HelpOverview setActiveView={setActiveView} />;
        }
    };
    
    // Renders the main layout wrapper
    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10 space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Help & Support</h1>
                    <p className="text-gray-500 text-lg">Find answers to common questions or get in touch with our team.</p>
                </div>
                {/* Back button visible on detail screens */}
                {activeView !== 'Overview' && (
                    <button 
                        onClick={() => setActiveView('Overview')}
                        className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
                    >
                        &larr; Back to Frequently Asked
                    </button>
                )}
            </div>

            {/* Content Area */}
            {activeView === 'Overview' ? (
                // Display the clickable support boxes on the Overview page
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {supportBoxes.map((box, i) => (
                        <div
                            key={i}
                            onClick={() => setActiveView(box.title)} // Set the active view on click
                            className={`p-6 rounded-2xl shadow-xl hover:shadow-2xl transition bg-gradient-to-r ${box.gradient} text-white flex flex-col justify-between cursor-pointer transform hover:scale-[1.02]`}
                        >
                            <div className="flex items-center mb-4">
                                <box.icon className="w-8 h-8 mr-3" />
                                <h3 className="text-xl font-bold">{box.title}</h3>
                            </div>
                            <p className="text-sm opacity-90">{box.description}</p>
                        </div>
                    ))}
                </div>
            ) : null}

            {/* Render the Active Component */}
            <div className='pt-4'>
                {renderContent()}
            </div>
        </div>
    );
};

export default HelpAndSupport;