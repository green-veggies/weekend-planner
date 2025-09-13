# Weekipedia - Your Weekend Planner 🗓️

A beautiful, interactive weekend planning application built with Next.js, TypeScript, and modern web technologies. Plan your perfect weekend with drag-and-drop functionality, theme switching, and persistent storage.

![Weekipedia Preview](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Weekendly+Preview)

## ✨ Features

### Core Features

- **Activity Browsing**: Browse through a curated list of weekend activities
- **Drag & Drop Scheduling**: Intuitively organize activities for Saturday and Sunday
- **Visual Schedule**: Clean, timeline-based view of your weekend plan
- **Activity Management**: Add, remove, and edit activities with ease
- **Smart Filtering**: Search and filter activities by category
- **Duration Tracking**: See how long each activity takes

### Bonus Features

- **Theme Switching**: Choose from Light, Dark, and Cozy themes
- **Mood Tracking**: Assign moods to activities (😌 Relaxed, 🥾 Energetic, etc.)
- **Persistent Storage**: Your plans are automatically saved to localStorage
- **Responsive Design**: Works perfectly on desktop and mobile
- **Smooth Animations**: Delightful micro-interactions throughout
- **Accessibility**: Built with accessibility in mind

### Super Stretch Features

- **Offline Support**: Works without internet connection
- **Export Functionality**: Export your weekend plan as an image
- **Smart Suggestions**: AI-powered activity recommendations
- **Multi-day Planning**: Support for 3-4 day weekends

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd weekend-planner
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with Immer
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **Persistence**: localStorage via Zustand persist

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and themes
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/            # Reusable UI components
│   ├── ActivityCard.tsx   # Activity display component
│   ├── ActivityList.tsx   # Activities sidebar
│   ├── ScheduleDay.tsx    # Day schedule container
│   ├── ThemeSwitcher.tsx  # Theme selection
│   ├── ThemeProvider.tsx  # Theme context provider
│   ├── DroppableScheduleDay.tsx  # Drag & drop wrapper
│   └── DraggableActivityCard.tsx # Draggable activity
├── lib/                   # Utilities and configuration
│   └── store.ts          # Zustand store with persistence
└── __tests__/            # Test files
    └── ActivityCard.test.tsx
```

## 🎨 Themes

Weekendly comes with three beautiful themes:

- **Light**: Clean and bright, perfect for daytime planning
- **Dark**: Easy on the eyes, great for evening planning
- **Cozy**: Warm and comfortable, ideal for relaxed weekends

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📱 Usage

### Adding Activities

1. Browse activities in the left sidebar
2. Use the search bar to find specific activities
3. Filter by category (Food, Outdoors, Entertainment, etc.)
4. Click "Add to Saturday" or "Add to Sunday" buttons

### Organizing Your Schedule

1. Drag activities within a day to reorder them
2. Drag activities between Saturday and Sunday
3. Use the timeline indicators to see the sequence
4. View total duration for each day

### Customizing Your Experience

1. Switch themes using the theme selector in the header
2. Your preferences are automatically saved
3. Plans persist between browser sessions

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Zustand](https://github.com/pmndrs/zustand) for simple state management
- [@dnd-kit](https://dndkit.com/) for accessible drag-and-drop
- [Lucide](https://lucide.dev/) for beautiful icons

---

**Happy Planning! 🎉**
