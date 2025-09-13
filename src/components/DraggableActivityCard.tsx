'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Activity } from '@/lib/store';
import ActivityCard from './ActivityCard';

interface DraggableActivityCardProps {
  activity: Activity;
  onRemove?: () => void;
  onEdit?: () => void;
  onVibeChange?: (value: string) => void;
  className?: string;
}

export default function DraggableActivityCard({
  activity,
  onRemove,
  onEdit,
  onVibeChange,
  className = ''
}: DraggableActivityCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? 'opacity-50 z-50' : ''} ${className}`}
      {...attributes} // Still needed for accessibility
    >
      <ActivityCard
        activity={activity}
        variant="schedule"
        onRemove={onRemove}
        onEdit={onEdit}
        onVibeChange={onVibeChange}
        dragHandleProps={listeners} // Pass listeners only to drag handle
      />
    </div>
  );
}
