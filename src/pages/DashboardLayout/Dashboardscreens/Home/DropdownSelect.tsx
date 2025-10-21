import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const DropdownSelect = ({ options, selectedOption, onSelect }:any) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const handleSelect = (option:any) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                type="button"
                className="inline-flex justify-center items-center px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {selectedOption}
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                >
                    <div className="py-1" role="none">
                        {options.map((option: boolean | React.Key | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined) => (
                            <button
                                key={option}
                                onClick={() => handleSelect(option)}
                                className={`block w-full text-left px-4 py-2 text-sm transition-colors
                                    ${option === selectedOption 
                                        ? 'bg-blue-50 text-blue-700 font-semibold' 
                                        : 'text-gray-700 hover:bg-gray-100'}`}
                                role="menuitem"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownSelect;