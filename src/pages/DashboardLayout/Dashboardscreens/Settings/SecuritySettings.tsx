import React, { useState } from 'react';
import { Lock, Check, KeyRound, Smartphone } from 'lucide-react';

// --- 1. Type Definitions ---

// Define the shape of the password change form state
interface PasswordForm {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

// Define the structure for password requirements
interface Requirement {
    text: string;
    isValid: (password: string) => boolean;
}

// --- 2. Constants and Requirements ---

// Password complexity requirements
const passwordRequirements: Requirement[] = [
    { text: 'at least 8 characters long', isValid: (p) => p.length >= 8 },
    { text: 'contains uppercase and lowercase letters', isValid: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
    { text: 'contains at least one number', isValid: (p) => /\d/.test(p) },
    { text: 'contains at least one special character', isValid: (p) => /[!@#$%^&*()]/.test(p) },
];

// --- 3. Main Component ---

const SecuritySettings: React.FC = () => {
    // Password Form State
    const [passwordForm, setPasswordForm] = useState<PasswordForm>({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    // 2FA State (Assuming it's initially enabled based on the image)
    const [is2faEnabled, setIs2faEnabled] = useState(true);

    // Handler for form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordForm(prev => ({ ...prev, [name]: value }));
    };

    // Calculate which requirements are met
    const requirementsMet = passwordRequirements.map(req => 
        req.isValid(passwordForm.newPassword)
    );
    const allRequirementsMet = requirementsMet.every(Boolean) && 
                                passwordForm.newPassword === passwordForm.confirmNewPassword &&
                                passwordForm.newPassword.length > 0;

    // Handler for password submission (stub)
    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (allRequirementsMet) {
            alert('Password update initiated (API call would happen here)');
            // Reset form or show success message
        } else {
            alert('Please meet all password requirements and ensure passwords match.');
        }
    };
    
    // Handler for 2FA toggle (stub)
    const handle2faToggle = () => {
        setIs2faEnabled(prev => !prev);
        alert(is2faEnabled ? 'Two-Factor Authentication Disabled.' : 'Two-Factor Authentication Enabled.');
    };

    return (
        <div className="flex-1 p-6 bg-white rounded-xl shadow-lg min-h-[70vh]">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">🛡️ Security</h2>
            <p className="text-gray-500 mb-8">Manage account security settings and preferences.</p>

            {/* A. Password Management Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                
                {/* Password Form */}
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                        <KeyRound className="w-5 h-5 mr-2 text-purple-500" /> Password Management
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">Updates your account password</p>

                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Current Password</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={passwordForm.currentPassword}
                                onChange={handleChange}
                                placeholder="Enter Current Password"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={passwordForm.newPassword}
                                onChange={handleChange}
                                placeholder="Enter New Password"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                            <input
                                type="password"
                                name="confirmNewPassword"
                                value={passwordForm.confirmNewPassword}
                                onChange={handleChange}
                                placeholder="Confirm New Password"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!allRequirementsMet}
                            className={`w-full py-2 rounded-lg font-semibold transition duration-150 ${
                                allRequirementsMet ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            Update Password
                        </button>
                    </form>
                </div>

                {/* Password Requirements */}
                <div className="p-6">
                    <h4 className="text-base font-semibold text-gray-700 mb-3">Password Requirements</h4>
                    <div className="space-y-2">
                        {passwordRequirements.map((req, index) => (
                            <div key={index} className="flex items-center">
                                <Check 
                                    className={`w-5 h-5 mr-2 ${requirementsMet[index] ? 'text-green-500' : 'text-gray-400'}`} 
                                />
                                <span className={`text-sm ${requirementsMet[index] ? 'text-gray-900' : 'text-gray-500'}`}>
                                    {req.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <hr className="my-8" />

            {/* B. Two-Factor Authentication Section */}
            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 flex items-center">
                        <Smartphone className="w-5 h-5 mr-2 text-green-500" /> Two Factor Authentication
                    </h3>
                    <div className="flex items-center">
                        <span className={`mr-2 font-medium ${is2faEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                            {is2faEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                        {/* Custom Toggle Switch */}
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={is2faEnabled} 
                                onChange={handle2faToggle} 
                                className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                        </label>
                    </div>
                </div>
                <p className="text-gray-500 mb-4">Add an extra layer of security to your account</p>

                {is2faEnabled && (
                    <div className="p-4 bg-green-50 border border-green-300 rounded-lg">
                        <div className="flex items-start">
                            <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                            <div className="ml-3">
                                <p className="text-green-800 font-medium">Two factor authentication is active</p>
                                <p className="text-sm text-green-700 mt-1">
                                    Your account is protected with SMS-based two-factor authentication.
                                </p>
                                <div className="mt-3 space-x-3">
                                    <button className="px-4 py-2 text-sm border border-green-600 text-green-600 rounded-lg hover:bg-green-100 transition duration-150">
                                        Send Test SMS
                                    </button>
                                    <button className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150">
                                        Change Phone Number
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SecuritySettings;