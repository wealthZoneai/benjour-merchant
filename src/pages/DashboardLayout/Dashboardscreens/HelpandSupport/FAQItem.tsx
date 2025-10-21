// src/components/FAQItem.js
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }:any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200">
            <button
                className="flex justify-between items-center w-full py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                {question}
                {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 py-2' : 'max-h-0 opacity-0'}`}
            >
                <p className="pb-4 text-gray-600 pl-4 border-l-2 border-blue-200 ml-1">
                    {/* Placeholder Answer - you would populate this dynamically */}
                    {answer || "Thank you for your question. You can find the detailed answer in our full support documentation."}
                </p>
            </div>
        </div>
    );
};

export default FAQItem;