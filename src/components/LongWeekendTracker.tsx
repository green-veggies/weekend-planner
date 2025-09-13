'use client';

import { useState, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';
import { GET } from "../app/api/holidays/routes";

// Type definitions
interface Holiday {
  date: {
    iso: string;
  };
  name: string;
}

interface HolidayProcessed {
  name: string;
  date: Date;
  weekday: number;
}

interface LongWeekend {
  startDate: Date;
  endDate: Date;
  duration: number;
  name: string;
  holidays: string[];
}

interface ApiResponse {
  holidays: Holiday[];
}

interface HolidaysByDate {
  [key: string]: HolidayProcessed;
}

const LongWeekendTracker: React.FC = () => {
  const [longWeekends, setLongWeekends] = useState<LongWeekend[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLongWeekends = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await GET();
      if (!response.ok) {
        throw new Error('Failed to fetch holidays');
      }
      const data: ApiResponse = await response.json();
      const holidays: Holiday[] = data.holidays;
      const longWeekendsList: LongWeekend[] = findLongWeekends(holidays);
      setLongWeekends(longWeekendsList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLongWeekends();
  }, []);

  const findLongWeekends = (holidays: Holiday[]): LongWeekend[] => {
    const longWeekends: LongWeekend[] = [];

    const holidaysByDate: HolidaysByDate = {};
    holidays.forEach((holiday: Holiday) => {
      const date = new Date(holiday.date.iso);
      holidaysByDate[holiday.date.iso] = {
        name: holiday.name,
        date: date,
        weekday: date.getDay(),
      };
    });

    Object.values(holidaysByDate).forEach((holiday: HolidayProcessed) => {
      const holidayDate: Date = holiday.date;
      const holidayDay: number = holiday.weekday;

      if (holidayDay === 5) { // Friday
        const saturday = new Date(holidayDate);
        saturday.setDate(saturday.getDate() + 1);

        const sunday = new Date(holidayDate);
        sunday.setDate(sunday.getDate() + 2);

        longWeekends.push({
          startDate: holidayDate,
          endDate: sunday,
          duration: 3,
          name: holiday.name,
          holidays: [holiday.name, 'Saturday', 'Sunday'],
        });
      }

      if (holidayDay === 1) { // Monday
        const saturday = new Date(holidayDate);
        saturday.setDate(saturday.getDate() - 2);

        const sunday = new Date(holidayDate);
        sunday.setDate(sunday.getDate() - 1);

        longWeekends.push({
          startDate: saturday,
          endDate: holidayDate,
          duration: 3,
          name: holiday.name,
          holidays: ['Saturday', 'Sunday', holiday.name],
        });
      }

      if (holidayDay === 4) { // Thursday
        const friday = new Date(holidayDate);
        friday.setDate(friday.getDate() + 1);

        const saturday = new Date(holidayDate);
        saturday.setDate(saturday.getDate() + 2);

        const sunday = new Date(holidayDate);
        sunday.setDate(sunday.getDate() + 3);

        longWeekends.push({
          startDate: holidayDate,
          endDate: sunday,
          duration: 4,
          name: holiday.name,
          holidays: [holiday.name, 'Friday', 'Saturday', 'Sunday'],
        });
      }

      if (holidayDay === 2) { // Tuesday
        const saturday = new Date(holidayDate);
        saturday.setDate(saturday.getDate() - 3);

        const sunday = new Date(holidayDate);
        sunday.setDate(sunday.getDate() - 2);

        const monday = new Date(holidayDate);
        monday.setDate(monday.getDate() - 1);

        longWeekends.push({
          startDate: saturday,
          endDate: holidayDate,
          duration: 4,
          name: holiday.name,
          holidays: ['Saturday', 'Sunday', 'Monday', holiday.name],
        });
      }
    });

    return longWeekends
      .filter((weekend: LongWeekend, index: number, self: LongWeekend[]) =>
        index === self.findIndex((w: LongWeekend) => w.startDate.getTime() === weekend.startDate.getTime())
      )
      .sort((a: LongWeekend, b: LongWeekend) => a.startDate.getTime() - b.startDate.getTime())
      .filter((weekend: LongWeekend) => weekend.startDate > new Date());
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleOpenModal = (): void => {
    setIsOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsOpen(false);
  };

  const handleRetry = (): void => {
    fetchLongWeekends();
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gray-500 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors flex items-center justify-center group"
        aria-label="View upcoming long weekends"
        type="button"
      >
        <Calendar className="w-6 h-6" />
        <span className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          View upcoming long weekends
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header - fixed height */}
            <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
              <h2 className="text-2xl font-bold text-gray-800">Upcoming Long Weekends</h2>
              <button
                onClick={handleCloseModal}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
                type="button"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto p-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="text-center py-12 text-red-600">
                  <p>Failed to load holidays: {error}</p>
                  <button
                    onClick={handleRetry}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    type="button"
                  >
                    Try Again
                  </button>
                </div>
              ) : longWeekends.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>No upcoming long weekends found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {longWeekends.map((weekend: LongWeekend, index: number) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{weekend.name}</h3>
                          <p className="text-gray-600">
                            {formatDate(weekend.startDate)} - {formatDate(weekend.endDate)}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {weekend.duration} days • {weekend.holidays.join(' + ')}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium whitespace-nowrap">
                          {weekend.duration} days
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LongWeekendTracker;