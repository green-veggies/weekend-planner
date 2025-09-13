'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Activity } from '@/lib/store';
import ScheduleDay from './ScheduleDay';

interface DroppableScheduleDayProps {
  id: string;
  title: string;
  day: string;
  activities: Activity[];
  onRemoveActivity: (activityId: string) => void;
  onEditActivity?: (activityId: string) => void;
  onVibeChange?: (value: string) => void;
  className?: string;
}

export default function DroppableScheduleDay({
  id,
  title,
  day,
  activities,
  onRemoveActivity,
  onEditActivity,
  className = ''
}: DroppableScheduleDayProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`transition-colors duration-200 ${isOver ? 'bg-blue-50 border-blue-300' : ''
        } ${className}`}
    >
      <SortableContext items={activities.map(a => a.id)} strategy={verticalListSortingStrategy}>
        <ScheduleDay
          title={title}
          day={day}
          activities={activities}
          onRemoveActivity={onRemoveActivity}
          onEditActivity={onEditActivity}
        />
      </SortableContext>
    </div>
  );
}
