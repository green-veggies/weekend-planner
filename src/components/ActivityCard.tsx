'use client';

import { Activity } from '@/lib/store';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { LucideIcon } from 'lucide-react';
import {
  Coffee,
  Mountain,
  Film,
  BookOpen,
  Building2,
  Gamepad2,
  ChefHat,
  Heart,
  Sun,
  Music,
} from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  variant?: 'default' | 'schedule' | 'compact';
  onAddToDay?: (activityId: string, day: 'saturday' | 'sunday') => void;
  onRemove?: () => void;
  onVibeChange?: (value: string) => void;
  onEdit?: () => void;
  dragHandleProps?: SyntheticListenerMap; // New prop for drag handle listeners
  className?: string;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Coffee,
  Mountain,
  Film,
  BookOpen,
  Building2,
  Gamepad2,
  ChefHat,
  Heart,
  Sun,
  Music
};

export default function ActivityCard({
  activity,
  variant = 'default',
  onAddToDay,
  onVibeChange,
  onRemove,
  onEdit,
  dragHandleProps,
  className = ''
}: ActivityCardProps) {
  const IconComponent = iconMap[activity.icon] || Coffee;

  const getCategoryColor = (category: string) => {
    const colors = {
      'Food': 'bg-orange-100 text-orange-800 border-orange-200',
      'Outdoors': 'bg-green-100 text-green-800 border-green-200',
      'Entertainment': 'bg-purple-100 text-purple-800 border-purple-200',
      'Relax': 'bg-blue-100 text-blue-800 border-blue-200',
      'Culture': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Social': 'bg-pink-100 text-pink-800 border-pink-200',
      'Learning': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Wellness': 'bg-emerald-100 text-emerald-800 border-emerald-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:scale-105 transition-all duration-200 ${className}`}>
        <IconComponent className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-900">{activity.title}</span>
        <span className="text-xs text-gray-500">{activity.mood}</span>
      </div>
    );
  }

  if (variant === 'schedule') {
    return (
      <div className={`group bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ${className}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div {...dragHandleProps} className="p-2 bg-gray-100 rounded-lg cursor-move">
              <IconComponent className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{activity.title}</h3>
              <p className="text-sm text-gray-600">{activity.mood}</p>
              {activity.duration && (
                <p className="text-xs text-gray-500 mt-1">
                  {Math.floor(activity.duration / 60)}h {activity.duration % 60}m
                </p>
              )}
            </div>
          </div>
          {onVibeChange && (
            <div className="relative">
              <select
                onChange={(e) => onVibeChange(e.target.value)}
                value={activity.vibe ?? ""}
                defaultValue=""
                className="w-full px-3 py-1 text-sm border border-gray-300 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-blue-300 hover:border-blue-500 bg-white pr-8"
              >
                <option value="" disabled>Select a vibe</option>
                <option value="happy">Happy</option>
                <option value="energetic">Energetic</option>
                <option value="lazy">Lazy</option>
                <option value="relaxed">Relaxed</option>
                <option value="focused">Focused</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="Edit activity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
            {onRemove && (
              <button
                onClick={onRemove}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                aria-label="Remove activity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ${className}`}>
      <div className="flex items-start gap-3 mb-3">
        <div {...dragHandleProps} className="p-2 bg-gray-100 rounded-lg cursor-move">
          <IconComponent className="w-6 h-6 text-gray-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{activity.mood}</p>
          {activity.description && (
            <p className="text-sm text-gray-500 mb-2">{activity.description}</p>
          )}
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(activity.category)}`}>
              {activity.category}
            </span>
            {activity.duration && (
              <span className="text-xs text-gray-500">
                {Math.floor(activity.duration / 60)}h {activity.duration % 60}m
              </span>
            )}
          </div>
        </div>
      </div>

      {onAddToDay && (
        <div className="flex gap-2">
          <button
            onClick={() => onAddToDay(activity.id, 'saturday')}
            className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
          >
            Add to Saturday
          </button>
          <button
            onClick={() => onAddToDay(activity.id, 'sunday')}
            className="flex-1 px-3 py-2 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors"
          >
            Add to Sunday
          </button>
        </div>
      )}
    </div>
  );
}
