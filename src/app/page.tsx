'use client';

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { useWeekendlyStore } from '@/lib/store';
import ActivityList from '@/components/ActivityList';
import DroppableScheduleDay from '@/components/DroppableScheduleDay';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import ActivityCard from '@/components/ActivityCard';
import { Calendar, Plus, Share2, Sparkles, Trash2 } from 'lucide-react';
import LongWeekendTracker from '@/components/LongWeekendTracker';

export default function Home() {
  const { schedule, setSchedule, removeActivityFromDay, generateRandomActivities } = useWeekendlyStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  // State to manage additional days
  const [additionalDays, setAdditionalDays] = useState<string[]>([]);

  // Ordered list of days to be added
  const nextDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Determine which next days can be added
  const remainingDays = nextDays.filter(day => !additionalDays.includes(day));

  const handleAddDay = () => {
    if (remainingDays.length === 0) return;
    const nextDay = remainingDays[0];
    setAdditionalDays([...additionalDays, nextDay]);
    setSchedule({
      ...schedule,
      [nextDay]: []
    });
  };

  const handleRemoveDay = (day: string) => {
    const idx = additionalDays.indexOf(day);
    const newAdditionalDays = additionalDays.filter((d, i) => i < idx);
    setAdditionalDays(newAdditionalDays);
    const newSchedule = { ...schedule };
    delete newSchedule[day];
    setSchedule(newSchedule);
  };


  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find which day the active item belongs to
    let activeDay: 'saturday' | 'sunday' | null = null;
    let activeIndex = -1;

    if (schedule.saturday.find(a => a.id === activeId)) {
      activeDay = 'saturday';
      activeIndex = schedule.saturday.findIndex(a => a.id === activeId);
    } else if (schedule.sunday.find(a => a.id === activeId)) {
      activeDay = 'sunday';
      activeIndex = schedule.sunday.findIndex(a => a.id === activeId);
    }

    if (!activeDay || activeIndex === -1) return;

    // Determine target day
    let targetDay: string;
    if (overId === 'saturday' || overId === 'sunday') {
      targetDay = overId;
    } else {
      // Find which day the over item belongs to
      if (schedule.saturday.find(a => a.id === overId)) {
        targetDay = 'saturday';
      } else if (schedule.sunday.find(a => a.id === overId)) {
        targetDay = 'sunday';
      } else {
        targetDay = overId;
      }
    }

    // If moving within the same day, reorder
    if (activeDay === targetDay) {
      const newSchedule = { ...schedule };
      const items = [...newSchedule[activeDay]];
      const [removed] = items.splice(activeIndex, 1);

      if (overId === activeDay) {
        // Dropped on the day container, add to end
        items.push(removed);
      } else {
        // Dropped on another item, insert before it
        const overIndex = items.findIndex(a => a.id === overId);
        items.splice(overIndex, 0, removed);
      }

      newSchedule[activeDay] = items;
      setSchedule(newSchedule);
    } else {
      // Moving between days
      const newSchedule = { ...schedule };
      const activeItem = newSchedule[activeDay][activeIndex];

      // Remove from source day
      newSchedule[activeDay] = newSchedule[activeDay].filter(a => a.id !== activeId);

      // Add to target day
      if (overId === targetDay) {
        // Dropped on the day container, add to end
        newSchedule[targetDay] = [...newSchedule[targetDay], activeItem];
      } else {
        // Dropped on another item, insert before it
        const overIndex = newSchedule[targetDay].findIndex(a => a.id === overId);
        newSchedule[targetDay].splice(overIndex, 0, activeItem);
      }

      setSchedule(newSchedule);
    }
  };

  const handleGenerateRandomActivities = () => {
    setIsGenerating(true);
    setLoadingMessage('Generating your weekend plan...');

    const delay = Math.floor(Math.random() * 5000) + 1000;

    setTimeout(() => {
      generateRandomActivities();
      setIsGenerating(false);
      setLoadingMessage('');
    }, delay);
  };


  const handleExport = () => {
    window.print();
  };

  const getActiveItem = () => {
    if (!activeId) return null;

    const allActivities = [...schedule.saturday, ...schedule.sunday];
    return allActivities.find(a => a.id === activeId) || null;
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="min-h-screen theme-bg">
        {/* Header */}
        <header className="theme-header sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Weekipedia</h1>
                  <p className="text-sm text-gray-600">Plan your perfect weekend</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleExport}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Export plan"
                >
                  <Share2 className="w-6 h-6 text-gray-600" />
                </button>
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-8 gap-8 animate-fade-in">
            {/* Sidebar - Activity List */}
            <div className="lg:col-span-3 animate-slide-in">
              <ActivityList />
            </div>

            {/* Schedule Days */}
            <div className="printable-area lg:col-span-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-stagger">
                <DroppableScheduleDay
                  id="saturday"
                  title="Saturday"
                  day={"saturday"}
                  activities={schedule.saturday}
                  onRemoveActivity={(id) => removeActivityFromDay(id, 'saturday')}
                />
                <div className="relative">
                  <DroppableScheduleDay
                    id="sunday"
                    title="Sunday"
                    day={"sunday"}
                    activities={schedule.sunday}
                    onRemoveActivity={(id) => removeActivityFromDay(id, 'sunday')}
                  />
                  {/* + Button to add days */}
                  {remainingDays.length > 0 && (
                    <button
                      onClick={handleAddDay}
                      className="absolute top-2 right-2 p-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
                      title="Add day"
                    >
                      <Plus className="w-4 h-4 text-blue-600" />
                    </button>
                  )}
                </div>

                {/* Render additional days */}
                {additionalDays.map((day) => (
                  <div key={day} className="relative">
                    <DroppableScheduleDay
                      id={day}
                      title={day}
                      day={day}
                      activities={schedule[day] ?? []}
                      onRemoveActivity={(id) => removeActivityFromDay(id, day)}
                    />
                    <button
                      onClick={() => handleRemoveDay(day)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
                      title="Remove day"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeId ? (
            <div className="opacity-90">
              <ActivityCard
                activity={getActiveItem()!}
                variant="schedule"
                className="shadow-2xl transform rotate-3"
              />
            </div>
          ) : null}
        </DragOverlay>
        {isGenerating && (
          <div className="fixed bottom-20 right-24 z-50 bg-white text-gray-800 p-2 rounded shadow-md">
            {loadingMessage}
          </div>
        )}

        <button
          onClick={handleGenerateRandomActivities}
          disabled={isGenerating}
          className={`fixed bottom-6 right-24 z-50 bg-gray-500 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          aria-label="Generate random activities"
        >
          <Sparkles className="w-6 h-6" />
        </button>
        <LongWeekendTracker />
      </div>
    </DndContext>
  );
}