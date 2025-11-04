import React, { useState } from 'react';
// Using lucide-react for icons, as they are modern and easy to use
import { Mail, Bell, CreditCard, Wrench, BarChart, User, AlertTriangle, Clock } from 'lucide-react'; 

// --- 1. Type Definitions ---

// Defines the shape of our state object for all notification toggles
interface NotificationSettingsState {
    // Email Notifications
    emailOrderUpdates: boolean;
    emailPaymentAlerts: boolean;
    emailSystemMaintenance: boolean;
    emailPromotional: boolean;
    emailWeeklyReports: boolean;

    // Push Notifications
    pushNewOrders: boolean;
    pushCustomerReviews: boolean;
    pushStaffUpdates: boolean;
    pushPromotional: boolean;
    pushEmergencyAlerts: boolean;
}

// Defines the structure for a single notification item in the feed
interface RecentNotification {
    id: number;
    icon: React.ReactNode;
    text: string;
    time: string;
    color: string;
}

// Defines props for the reusable Toggle component
interface ToggleSwitchProps {
    icon: React.ReactNode;
    label: string;
    description: string;
    isChecked: boolean;
    onToggle: () => void;
}

// --- 2. Reusable Components ---

/**
 * Reusable component for a single notification setting with a toggle switch.
 */
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ icon, label, description, isChecked, onToggle }) => (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
        <div className="flex items-start">
            <div className="p-1 rounded-full bg-indigo-50 mr-3 mt-1">{icon}</div>
            <div>
                <label htmlFor={label.replace(/\s/g, '-')} className="text-base font-medium text-gray-900 block cursor-pointer">
                    {label}
                </label>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
        
        {/* Toggle UI (Tailwind's standard dark mode compatible toggle) */}
        <label htmlFor={label.replace(/\s/g, '-')} className="relative inline-flex items-center cursor-pointer ml-4">
            <input 
                type="checkbox" 
                id={label.replace(/\s/g, '-')} 
                className="sr-only peer" 
                checked={isChecked} 
                onChange={onToggle}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
        </label>
    </div>
);


// --- 3. Main Component ---

const NotificationSettings: React.FC = () => {
    // Initial state matching the structure of the image (all active by default except for promotional)
    const [settings, setSettings] = useState<NotificationSettingsState>({
        emailOrderUpdates: true,
        emailPaymentAlerts: true,
        emailSystemMaintenance: true,
        emailPromotional: false,
        emailWeeklyReports: true,

        pushNewOrders: true,
        pushCustomerReviews: true,
        pushStaffUpdates: true,
        pushPromotional: false,
        pushEmergencyAlerts: true,
    });

    // Handler function to toggle a specific setting by key
    const handleToggle = (key: keyof NotificationSettingsState) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    // Example data for recent notifications, closely mirroring the image
    const recentNotifications: RecentNotification[] = [
        { id: 1, icon: <Bell className="w-5 h-5 text-blue-500" />, text: "New Order Received: Order #553 from John Doe – $45.99", time: "5 minutes ago", color: "text-blue-600" },
        { id: 2, icon: <CreditCard className="w-5 h-5 text-green-500" />, text: "Payment Processed: Payment of $45.99 successfully processed.", time: "10 minutes ago", color: "text-green-600" },
        { id: 3, icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />, text: "Low Inventory Alert: Chicken Breast is Running Low (5 items left)", time: "1 hour ago", color: "text-yellow-600" },
        { id: 4, icon: <User className="w-5 h-5 text-purple-500" />, text: "New Customer Review: Sarah M. left a 5-Star Review for your restaurant.", time: "2 hours ago", color: "text-purple-600" },
        { id: 5, icon: <Wrench className="w-5 h-5 text-pink-500" />, text: "Staff Schedule Update: Mike Johnson updated his availability for next week.", time: "3 hours ago", color: "text-pink-600" },
    ];

    return (
        <div className="flex-1 p-6 bg-white rounded-xl shadow-lg min-h-[70vh]">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">🔔 Notification Settings</h2>
            <p className="text-gray-500 mb-8">Manage Email Notification Preferences</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* LEFT SIDE: Notification Toggles */}
                <div>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 divide-y divide-gray-200">
                        
                        {/* Email Settings Group */}
                        <div className="py-4">
                            <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center"><Mail className="w-5 h-5 mr-2 text-indigo-500" /> Email Notifications</h3>
                            <ToggleSwitch
                                icon={<Bell className="w-4 h-4 text-blue-500" />}
                                label="Order Updates"
                                description="Get notified when orders are placed, updated, or completed."
                                isChecked={settings.emailOrderUpdates}
                                onToggle={() => handleToggle('emailOrderUpdates')}
                            />
                            <ToggleSwitch
                                icon={<CreditCard className="w-4 h-4 text-green-500" />}
                                label="Payment Alerts"
                                description="Receive alerts for successful payments and failed transactions."
                                isChecked={settings.emailPaymentAlerts}
                                onToggle={() => handleToggle('emailPaymentAlerts')}
                            />
                             <ToggleSwitch
                                icon={<Wrench className="w-4 h-4 text-red-500" />}
                                label="System Maintenance"
                                description="Notifications about scheduled maintenance and system updates."
                                isChecked={settings.emailSystemMaintenance}
                                onToggle={() => handleToggle('emailSystemMaintenance')}
                            />
                            <ToggleSwitch
                                icon={<Bell className="w-4 h-4 text-pink-500" />}
                                label="Promotional Emails"
                                description="Marketing emails about new features and special offers."
                                isChecked={settings.emailPromotional}
                                onToggle={() => handleToggle('emailPromotional')}
                            />
                            <ToggleSwitch
                                icon={<BarChart className="w-4 h-4 text-yellow-500" />}
                                label="Weekly Reports"
                                description="Marketing emails about new features and special offers."
                                isChecked={settings.emailWeeklyReports}
                                onToggle={() => handleToggle('emailWeeklyReports')}
                            />
                        </div>

                        {/* Push Settings Group */}
                        <div className="pt-6 pb-2">
                            <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center"><AlertTriangle className="w-5 h-5 mr-2 text-indigo-500" /> Push Notifications</h3>
                            <p className="text-sm text-gray-500 mb-3">Real-time notifications on your device</p>

                            <ToggleSwitch
                                icon={<Bell className="w-4 h-4 text-blue-500" />}
                                label="New Orders"
                                description="Instant notifications when new orders are received."
                                isChecked={settings.pushNewOrders}
                                onToggle={() => handleToggle('pushNewOrders')}
                            />
                            <ToggleSwitch
                                icon={<User className="w-4 h-4 text-purple-500" />}
                                label="Customer Reviews"
                                description="Notifications for new customer reviews and rating."
                                isChecked={settings.pushCustomerReviews}
                                onToggle={() => handleToggle('pushCustomerReviews')}
                            />
                            <ToggleSwitch
                                icon={<Wrench className="w-4 h-4 text-pink-500" />}
                                label="Staff Updates"
                                description="Notifications about staff schedules and updates."
                                isChecked={settings.pushStaffUpdates}
                                onToggle={() => handleToggle('pushStaffUpdates')}
                            />
                            <ToggleSwitch
                                icon={<Bell className="w-4 h-4 text-red-500" />}
                                label="Promotional Emails (Push)"
                                description="Marketing emails about new features and special offers."
                                isChecked={settings.pushPromotional}
                                onToggle={() => handleToggle('pushPromotional')}
                            />
                            <ToggleSwitch
                                icon={<AlertTriangle className="w-4 h-4 text-orange-500" />}
                                label="Emergency Alerts"
                                description="Critical system alerts and emergency notifications."
                                isChecked={settings.pushEmergencyAlerts}
                                onToggle={() => handleToggle('pushEmergencyAlerts')}
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Recent Notifications Feed */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Recent Notifications
                    </h3>
                    <p className="text-gray-500 mb-4">Your latest notification activity</p>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
                        {recentNotifications.map((notif) => (
                            <div key={notif.id} className="flex items-start p-3 bg-white rounded-md shadow-sm border border-gray-100 transition duration-150 hover:border-indigo-300">
                                <div className={`flex-shrink-0 ${notif.color} mr-3`}>
                                    {notif.icon}
                                </div>
                                <div className="flex-1 flex justify-between items-start">
                                    <p className="text-sm font-medium text-gray-800 leading-tight pr-4">{notif.text}</p>
                                    <p className="text-xs text-gray-500 flex-shrink-0 whitespace-nowrap">{notif.time}</p>
                                </div>
                            </div>
                        ))}
                        <div className="text-center pt-2">
                            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition duration-150">
                                View full history &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettings;