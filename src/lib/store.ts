import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface Activity {
  id: string;
  title: string;
  category: string;
  mood: string;
  icon: string;
  description?: string;
  duration?: number;
  vibe?: string;
}

export type Schedule = Record<string, Activity[]>;

export type Theme =
  | "default-weekend"
  | "lazy-weekend"
  | "adventurous-weekend"
  | "family-weekend";

interface WeekendlyStore {
  // State
  availableActivities: Activity[];
  schedule: Schedule;
  activeTheme: Theme;

  // Actions
  addActivityToDay: (
    activityId: string,
    day: "saturday" | "sunday" | string
  ) => void;
  removeActivityFromDay: (
    activityId: string,
    day: "saturday" | "sunday" | string
  ) => void;
  setSchedule: (schedule: Schedule) => void;
  setTheme: (theme: Theme) => void;
  updateActivityInSchedule: (
    activityId: string,
    day: "saturday" | "sunday" | string,
    updates: Partial<Activity>
  ) => void;
  generateRandomActivities: () => void;
}

// Sample activities data
const sampleActivities: Activity[] = [
  {
    id: "1",
    title: "Brunch",
    category: "Food",
    mood: "😌 Relaxed",
    icon: "Coffee",
    description: "Enjoy a leisurely brunch with friends or family",
    duration: 90,
  },
  {
    id: "2",
    title: "Hiking",
    category: "Outdoors",
    mood: "🥾 Energetic",
    icon: "Mountain",
    description: "Explore nature trails and get some fresh air",
    duration: 180,
  },
  {
    id: "3",
    title: "Movie Night",
    category: "Entertainment",
    mood: "🎬 Cozy",
    icon: "Film",
    description: "Watch a movie at home or at the cinema",
    duration: 120,
  },
  {
    id: "4",
    title: "Read a Book",
    category: "Relax",
    mood: "📚 Thoughtful",
    icon: "BookOpen",
    description: "Dive into a good book and unwind",
    duration: 60,
  },
  {
    id: "5",
    title: "Museum Visit",
    category: "Culture",
    mood: "🎨 Curious",
    icon: "Building2",
    description: "Explore art, history, or science exhibits",
    duration: 150,
  },
  {
    id: "6",
    title: "Game Night",
    category: "Social",
    mood: "🎲 Fun",
    icon: "Gamepad2",
    description: "Play board games or video games with friends",
    duration: 120,
  },
  {
    id: "7",
    title: "Cooking Class",
    category: "Learning",
    mood: "👨‍🍳 Creative",
    icon: "ChefHat",
    description: "Learn new recipes and cooking techniques",
    duration: 120,
  },
  {
    id: "8",
    title: "Yoga Session",
    category: "Wellness",
    mood: "🧘‍♀️ Peaceful",
    icon: "Heart",
    description: "Practice yoga for physical and mental wellness",
    duration: 60,
  },
  {
    id: "9",
    title: "Beach Day",
    category: "Outdoors",
    mood: "🏖️ Sunny",
    icon: "Sun",
    description: "Relax by the water and enjoy the sunshine",
    duration: 240,
  },
  {
    id: "10",
    title: "Concert",
    category: "Entertainment",
    mood: "🎵 Excited",
    icon: "Music",
    description: "Attend a live music performance",
    duration: 180,
  },
  // ✅ Additional 40 activities below
  {
    id: "11",
    title: "Photography Walk",
    category: "Outdoors",
    mood: "📸 Inspired",
    icon: "Mountain",
    description: "Capture nature or urban landscapes on camera",
    duration: 120,
  },
  {
    id: "12",
    title: "Karaoke Night",
    category: "Entertainment",
    mood: "🎤 Cheerful",
    icon: "Music",
    description: "Sing your favorite songs with friends",
    duration: 90,
  },
  {
    id: "13",
    title: "Potluck Dinner",
    category: "Food",
    mood: "🍽️ Friendly",
    icon: "ChefHat",
    description: "Share dishes and enjoy food with family or friends",
    duration: 180,
  },
  {
    id: "14",
    title: "Cycling",
    category: "Outdoors",
    mood: "🚴‍♂️ Adventurous",
    icon: "Mountain",
    description: "Go for a bike ride through trails or parks",
    duration: 150,
  },
  {
    id: "15",
    title: "Spa Day",
    category: "Wellness",
    mood: "🧖‍♀️ Rejuvenated",
    icon: "Heart",
    description: "Pamper yourself with massages and relaxation therapies",
    duration: 120,
  },
  {
    id: "16",
    title: "Painting Class",
    category: "Learning",
    mood: "🎨 Imaginative",
    icon: "BookOpen",
    description: "Learn techniques to create beautiful artwork",
    duration: 120,
  },
  {
    id: "17",
    title: "Camping",
    category: "Outdoors",
    mood: "🔥 Adventurous",
    icon: "Mountain",
    description: "Spend a night under the stars with campfires and tents",
    duration: 480,
  },
  {
    id: "18",
    title: "Board Game Tournament",
    category: "Social",
    mood: "♟️ Competitive",
    icon: "Gamepad2",
    description: "Challenge friends in board games for fun prizes",
    duration: 180,
  },
  {
    id: "19",
    title: "Gardening",
    category: "Relax",
    mood: "🌱 Calm",
    icon: "Building2",
    description: "Plant flowers or vegetables in your garden",
    duration: 90,
  },
  {
    id: "20",
    title: "Dance Class",
    category: "Entertainment",
    mood: "💃 Joyful",
    icon: "Music",
    description: "Learn new dance moves and routines",
    duration: 90,
  },
  {
    id: "21",
    title: "Stargazing",
    category: "Outdoors",
    mood: "✨ Wonder",
    icon: "Mountain",
    description: "Watch stars and constellations at night",
    duration: 120,
  },
  {
    id: "22",
    title: "Wine Tasting",
    category: "Food",
    mood: "🍷 Sophisticated",
    icon: "ChefHat",
    description: "Sample a variety of wines with expert guidance",
    duration: 120,
  },
  {
    id: "23",
    title: "Craft Workshop",
    category: "Learning",
    mood: "🧵 Creative",
    icon: "BookOpen",
    description: "Make handmade crafts and gifts",
    duration: 150,
  },
  {
    id: "24",
    title: "Fishing",
    category: "Outdoors",
    mood: "🎣 Relaxed",
    icon: "Mountain",
    description: "Spend time fishing by the lake or river",
    duration: 180,
  },
  {
    id: "25",
    title: "Picnic",
    category: "Food",
    mood: "🍉 Joyful",
    icon: "Sun",
    description: "Pack food and enjoy outdoor meals with friends",
    duration: 180,
  },
  {
    id: "26",
    title: "Meditation Retreat",
    category: "Wellness",
    mood: "🧘‍♂️ Serene",
    icon: "Heart",
    description: "Participate in guided meditation sessions",
    duration: 240,
  },
  {
    id: "27",
    title: "Sailing",
    category: "Outdoors",
    mood: "⛵ Free",
    icon: "Mountain",
    description: "Enjoy a day out sailing on a lake or sea",
    duration: 180,
  },
  {
    id: "28",
    title: "Baking",
    category: "Learning",
    mood: "🍰 Delightful",
    icon: "ChefHat",
    description: "Bake delicious treats from scratch",
    duration: 120,
  },
  {
    id: "29",
    title: "Volunteer Work",
    category: "Social",
    mood: "🤝 Helpful",
    icon: "Building2",
    description: "Support community projects or charitable events",
    duration: 180,
  },
  {
    id: "30",
    title: "Theater Play",
    category: "Entertainment",
    mood: "🎭 Dramatic",
    icon: "Film",
    description: "Watch live theater performances",
    duration: 150,
  },
  {
    id: "31",
    title: "Horse Riding",
    category: "Outdoors",
    mood: "🐎 Brave",
    icon: "Mountain",
    description: "Experience horseback riding adventures",
    duration: 120,
  },
  {
    id: "32",
    title: "Photography Exhibit",
    category: "Culture",
    mood: "📷 Curious",
    icon: "Building2",
    description: "Visit a gallery showcasing stunning photographs",
    duration: 90,
  },
  {
    id: "33",
    title: "Fruit Picking",
    category: "Outdoors",
    mood: "🍓 Fresh",
    icon: "Sun",
    description: "Pick fresh fruits from local farms",
    duration: 150,
  },
  {
    id: "34",
    title: "Language Class",
    category: "Learning",
    mood: "🗣️ Ambitious",
    icon: "BookOpen",
    description: "Learn new languages with expert tutors",
    duration: 120,
  },
  {
    id: "35",
    title: "Pottery Workshop",
    category: "Learning",
    mood: "🖌️ Creative",
    icon: "ChefHat",
    description: "Shape and paint pottery pieces",
    duration: 150,
  },
  {
    id: "36",
    title: "City Tour",
    category: "Culture",
    mood: "🏙️ Curious",
    icon: "Building2",
    description: "Explore local attractions and landmarks",
    duration: 180,
  },
  {
    id: "37",
    title: "Ice Skating",
    category: "Entertainment",
    mood: "⛸️ Playful",
    icon: "Sun",
    description: "Skate at a rink and enjoy winter fun",
    duration: 120,
  },
  {
    id: "38",
    title: "Bird Watching",
    category: "Outdoors",
    mood: "🦜 Observant",
    icon: "Mountain",
    description: "Observe and photograph birds in their natural habitat",
    duration: 120,
  },
  {
    id: "39",
    title: "Comedy Show",
    category: "Entertainment",
    mood: "😂 Humorous",
    icon: "Film",
    description: "Watch comedians perform live",
    duration: 90,
  },
  {
    id: "40",
    title: "Sunset Walk",
    category: "Outdoors",
    mood: "🌅 Peaceful",
    icon: "Sun",
    description: "Take a walk while enjoying a beautiful sunset",
    duration: 60,
  },
  {
    id: "41",
    title: "Music Workshop",
    category: "Learning",
    mood: "🎸 Passionate",
    icon: "Music",
    description: "Learn to play musical instruments or improve skills",
    duration: 150,
  },
  {
    id: "42",
    title: "Fishing Trip",
    category: "Outdoors",
    mood: "🎣 Relaxed",
    icon: "Mountain",
    description: "Spend a full day fishing with friends or family",
    duration: 240,
  },
  {
    id: "43",
    title: "Potluck Breakfast",
    category: "Food",
    mood: "🥞 Sociable",
    icon: "ChefHat",
    description: "Share homemade breakfast dishes with friends",
    duration: 120,
  },
  {
    id: "44",
    title: "Archery Practice",
    category: "Outdoors",
    mood: "🏹 Focused",
    icon: "Mountain",
    description: "Improve your aim with archery sessions",
    duration: 120,
  },
  {
    id: "45",
    title: "Board Game Design",
    category: "Learning",
    mood: "🧠 Inventive",
    icon: "Gamepad2",
    description: "Create and test new board game ideas",
    duration: 180,
  },
  {
    id: "46",
    title: "Street Food Tour",
    category: "Food",
    mood: "🌮 Adventurous",
    icon: "ChefHat",
    description: "Taste local street food and discover new flavors",
    duration: 150,
  },
  {
    id: "47",
    title: "Wellness Workshop",
    category: "Wellness",
    mood: "🧘‍♀️ Balanced",
    icon: "Heart",
    description: "Learn techniques for mental and physical well-being",
    duration: 120,
  },
  {
    id: "48",
    title: "Botanical Garden Visit",
    category: "Outdoors",
    mood: "🌼 Refreshing",
    icon: "Building2",
    description: "Explore exotic plants and flowers",
    duration: 120,
  },
  {
    id: "49",
    title: "Craft Fair",
    category: "Culture",
    mood: "🎁 Delightful",
    icon: "Building2",
    description: "Shop for handmade crafts and artworks",
    duration: 180,
  },
  {
    id: "50",
    title: "Sunrise Meditation",
    category: "Wellness",
    mood: "🌄 Centered",
    icon: "Heart",
    description: "Start your day with peaceful meditation at sunrise",
    duration: 60,
  },
];

export const useWeekendlyStore = create<WeekendlyStore>()(
  persist(
    immer((set) => ({
      // Initial state
      availableActivities: sampleActivities,
      schedule: {
        saturday: [],
        sunday: [],
      },
      activeTheme: "lazy-weekend",

      // Actions
      addActivityToDay: (
        activityId: string,
        day: "saturday" | "sunday" | string
      ) => {
        set((state) => {
          const activity = state.availableActivities.find(
            (a) => a.id === activityId
          );
          if (
            activity &&
            !state.schedule[day].find((a) => a.id === activityId)
          ) {
            state.schedule[day].push(activity);
          }
        });
      },

      removeActivityFromDay: (
        activityId: string,
        day: "saturday" | "sunday" | string
      ) => {
        set((state) => {
          state.schedule[day] = state.schedule[day].filter(
            (a) => a.id !== activityId
          );
        });
      },

      setSchedule: (schedule: Schedule) => {
        set((state) => {
          state.schedule = schedule;
        });
      },

      setTheme: (theme: Theme) => {
        set((state) => {
          state.activeTheme = theme;
        });
      },

      updateActivityInSchedule: (
        activityId: string,
        day: "saturday" | "sunday" | string,
        updates: Partial<Activity>
      ) => {
        set((state) => {
          const activityIndex = state.schedule[day].findIndex(
            (a) => a.id === activityId
          );
          if (activityIndex !== -1) {
            Object.assign(state.schedule[day][activityIndex], updates);
          }
        });
      },

      generateRandomActivities: () => {
        set((state) => {
          const allCategories = new Set<string>();
          const pickedActivities: Activity[] = [];

          // Shuffle the available activities array
          const shuffled = [...state.availableActivities].sort(
            () => Math.random() - 0.5
          );

          for (const activity of shuffled) {
            if (!allCategories.has(activity.category)) {
              allCategories.add(activity.category);
              pickedActivities.push(activity);
            }
            if (pickedActivities.length === 4) break;
          }

          if (pickedActivities.length < 4) {
            console.warn("Not enough unique categories to pick from!");
            return;
          }

          // Assign first 2 to saturday, next 2 to sunday
          state.schedule.saturday = pickedActivities.slice(0, 2);
          state.schedule.sunday = pickedActivities.slice(2, 4);
        });
      },
    })),

    {
      name: "weekendly-storage",
      partialize: (state) => ({
        schedule: state.schedule,
        activeTheme: state.activeTheme,
      }),
    }
  )
);
