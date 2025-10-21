import React from 'react';

interface ProfileHeaderProps {
    name: string;
    role: string;
    onEditClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, role, onEditClick }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <img
                        src={`https://placehold.co/80x80/0099FF/FFFFFF?text=${name.charAt(0)}`}
                        alt="Profile Avatar"
                        className="w-20 h-20 rounded-full object-cover border-4 border-[#0099FF] shadow-lg"
                        onError={(e: any) => e.target.src = `https://placehold.co/80x80/0099FF/FFFFFF?text=${name.charAt(0)}`}
                    />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
                    <p className="text-base text-gray-500 font-medium">{role}</p>
                </div>
            </div>
            
            <button
                onClick={onEditClick}
                className="flex items-center gap-2 px-4 py-2 bg-[#0099FF] text-white rounded-full hover:bg-blue-600 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-edit"
                >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
                </svg>
                Edit Profile
            </button>
        </div>
    );
};

export default ProfileHeader;
