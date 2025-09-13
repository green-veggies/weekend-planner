'use client';

import { useState } from 'react';
import { useWeekendlyStore, Theme } from '@/lib/store';
import { Palette, X } from 'lucide-react';

// Custom SVG Icon Components (same as before)
const SnowIcon = (props: { className?: string }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);

const LazyWeekendIcon = (props: { className?: string }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h14v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <path d="M6 1V4" />
    <path d="M10 1V4" />
    <path d="M14 1V4" />
  </svg>
);

const AdventurousWeekendIcon = (props: { className?: string }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
  </svg>
);

const FamilyWeekendIcon = (props: { className?: string }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const themes: { key: Theme; label: string; icon: React.ComponentType<{ className?: string }>; description: string }[] = [
  {
    key: 'default-weekend',
    label: 'Minimal',
    icon: SnowIcon,
    description: 'Simple, white and minimal'
  },
  {
    key: 'lazy-weekend',
    label: 'Lazy Weekend',
    icon: LazyWeekendIcon,
    description: 'Relaxed, warm, and comforting'
  },
  {
    key: 'adventurous-weekend',
    label: 'Adventurous Weekend',
    icon: AdventurousWeekendIcon,
    description: 'Energetic, natural, and bold'
  },
  {
    key: 'family-weekend',
    label: 'Family Weekend',
    icon: FamilyWeekendIcon,
    description: 'Bright, cheerful, and welcoming'
  }
];

export default function NavbarThemeSwitcher() {
  const { activeTheme, setTheme } = useWeekendlyStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Theme icon button in navbar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Change theme"
        title="Change Theme"
      >
        <Palette className="w-6 h-6 text-gray-600" />
      </button>

      {/* Popup box */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg border border-gray-200 shadow-lg z-50 animate-fade-in">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Choose Theme</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close theme selector"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Theme options */}
          <div className="p-4">
            <div className="space-y-2">
              {themes.map((theme) => {
                const IconComponent = theme.icon;
                const isActive = activeTheme === theme.key;
                
                return (
                  <button
                    key={theme.key}
                    onClick={() => {
                      setTheme(theme.key);
                      setIsOpen(false); // Close popup after selection
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                      isActive
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{theme.label}</div>
                      <div className="text-sm text-gray-500">{theme.description}</div>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}