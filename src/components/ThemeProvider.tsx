'use client';

import { useEffect } from 'react';
import { useWeekendlyStore } from '@/lib/store';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { activeTheme } = useWeekendlyStore();

  useEffect(() => {
    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove('theme-default-weekend', 'theme-lazy-weekend', 'theme-adventurous-weekend', 'theme-family-weekend');

    // Add current theme class
    root.classList.add(`theme-${activeTheme}`);
  }, [activeTheme]);

  return <>{children}</>;
}