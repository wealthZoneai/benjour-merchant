import React from 'react';
import { CheckSquare, TrendingUp, DollarSign } from 'lucide-react';
import renderImage from '../../../../utills/render-image';
import Order from "../../../../assets/Order_count.svg";
import { IconName, StatCardProps } from '../../../../types/dashboard';

const iconMap: Record<IconName, React.ElementType> = {
    Orders: () => renderImage({
        src: Order,
        alt: "Orders Icon",
        className: "w-5 h-5",
    }),
    Approved: CheckSquare,
    'Monthly total': TrendingUp,
    Revenue: DollarSign,
};

const StatCard = ({ title, value, iconName }: StatCardProps) => {
    const Icon = iconMap[iconName] || DollarSign;
    const isMainMetric = ['Orders', 'Approved', 'Revenue', 'Monthly total'].includes(title);

    return (
        <div className="bg-[#DCDCE5] p-6 rounded-xl gap-4 shadow-md flex flex-col justify-between h-35 w-65">
            <div className="flex justify-between items-start">
                <h3 className="text-md font-medium text-gray-800">{title}</h3>
                {isMainMetric && (
                    <div className="p-1 rounded-md bg-gray-100 text-black">
                        <Icon className="w-4 h-4" />
                    </div>
                )}
            </div>

            <div className="flex justify-between items-end">
                <p className="text-3xl font-bold text-gray-800">{value}</p>
                {['Monthly total', 'Revenue'].includes(title) && !isMainMetric && (
                    <Icon className="w-5 h-5 text-gray-400" />
                )}
            </div>
        </div>
    );
};

export default StatCard;
