import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend,
  color = 'primary'
}) => {
  const colorClasses = {
    primary: 'bg-indigo-50 text-indigo-600',
    secondary: 'bg-blue-50 text-blue-600',
    success: 'bg-teal-50 text-teal-600',
    warning: 'bg-amber-50 text-amber-600',
    danger: 'bg-red-50 text-red-600',
    neutral: 'bg-gray-50 text-gray-600',
  };

  const iconColorClasses = {
    primary: 'text-indigo-500',
    secondary: 'text-blue-500',
    success: 'text-teal-500',
    warning: 'text-amber-500',
    danger: 'text-red-500',
    neutral: 'text-gray-500',
  };

  const trendColorClasses = {
    up: 'text-teal-600 bg-teal-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`p-2 rounded-md ${colorClasses[color]}`}>
          <div className={iconColorClasses[color]}>
            {icon}
          </div>
        </div>
      </div>
      <div className="mt-1">
        <div className="text-2xl font-semibold text-gray-900">{value}</div>
        {trend && (
          <div className="mt-2 flex items-center">
            <span 
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${trendColorClasses[trend.direction]}`}
            >
              {trend.direction === 'up' ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : trend.direction === 'down' ? (
                <TrendingDown className="mr-1 h-3 w-3" />
              ) : null}
              {trend.value}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;