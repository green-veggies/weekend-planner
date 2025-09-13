'use client';

import { Activity, useWeekendlyStore } from '@/lib/store';
import DraggableActivityCard from './DraggableActivityCard';
import { Calendar, Plus } from 'lucide-react';

interface ScheduleDayProps {
  title: string;
  day: string;
  activities: Activity[];
  onRemoveActivity: (activityId: string) => void;
  onEditActivity?: (activityId: string) => void;
  className?: string;
}

export default function ScheduleDay({
  title,
  day,
  activities,
  onRemoveActivity,
  onEditActivity,
  className = ''
}: ScheduleDayProps) {
  const getTotalDuration = () => {
    return activities.reduce((total, activity) => total + (activity.duration || 0), 0);
  };

  const { updateActivityInSchedule } = useWeekendlyStore();

  const handleVibeChange = (activityId: string, vibe: string) => {
    updateActivityInSchedule(activityId, day, {
      vibe,
    })
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${mins}m`;
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="text-sm text-gray-500">
          {activities.length} {activities.length === 1 ? 'activity' : 'activities'}
          {getTotalDuration() > 0 && (
            <span className="ml-2">• {formatDuration(getTotalDuration())}</span>
          )}
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-3 min-h-[200px]">
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 animate-fade-in">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-lg font-medium mb-2">No activities planned</p>
            <p className="text-sm text-center">
              Add activities from the sidebar to start planning your {title.toLowerCase()}
            </p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <div key={activity.id} className="relative">
              {/* Time indicator */}
              <div className="absolute -left-8 top-4 w-6 h-6 bg-blue-100 border-2 border-white rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                {index + 1}
              </div>

              <DraggableActivityCard
                activity={activity}
                onRemove={() => onRemoveActivity(activity.id)}
                onEdit={onEditActivity ? () => onEditActivity(activity.id) : undefined}
                onVibeChange={(vibe) => handleVibeChange(activity.id, vibe)}
              />
            </div>
          ))
        )}
      </div>

      {/* Footer with stats */}
      {activities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Total duration: {formatDuration(getTotalDuration())}</span>
            <span>
              {activities.filter(a => a.category === 'Outdoors').length} outdoor
              {activities.filter(a => a.category === 'Food').length > 0 &&
                ` • ${activities.filter(a => a.category === 'Food').length} food`
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
