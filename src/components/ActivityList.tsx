'use client';

import { useState } from 'react';
import { useWeekendlyStore } from '@/lib/store';
import ActivityCard from './ActivityCard';
import { Search, Filter } from 'lucide-react';

export default function ActivityList() {
  const { availableActivities, addActivityToDay } = useWeekendlyStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(availableActivities.map(a => a.category)))];

  // Filter activities based on search and category
  const filteredActivities = availableActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-2 h-fit">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Available Activities</h2>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="space-y-4 p-4 max-h-96 overflow-y-auto animate-stagger">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-8 text-gray-500 animate-fade-in">
            <p>No activities found matching your criteria.</p>
          </div>
        ) : (
          filteredActivities.map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onAddToDay={addActivityToDay}
            />
          ))
        )}
      </div>

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Showing {filteredActivities.length} of {availableActivities.length} activities
        </p>
      </div>
    </div>
  );
}
