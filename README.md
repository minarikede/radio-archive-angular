# Magyar Rádió Archívum - Angular Application

A modern web application for browsing and listening to archived Hungarian radio programs, built with Angular 18 and standalone components.

## Features

- **7 Radio Stations**: Browse programs from Kossuth Rádió, Petőfi Rádió, Bartók Rádió, Dankó Rádió, Nemzeti Sportrádió, Szakcsi Rádió, and Csukas Rádió
- **Date-based Browsing**: Select any date to view the daily program schedule
- **Persistent Audio Player**: Fixed player at the bottom that doesn't reload when navigating
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Distinctive Aesthetic**: Retro-broadcast editorial design with Hungarian national colors

## Architecture

This application uses Angular 18's latest features:

- **Standalone Components**: No NgModule required
- **Reactive Services**: State management with RxJS
- **HttpClient**: For fetching XML program data
- **Angular Router**: For navigation between stations and programs

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── station-list/         # Landing page with all stations
│   │   ├── program-list/         # Program schedule for selected station
│   │   └── audio-player/         # Persistent player component
│   ├── models/
│   │   └── station.model.ts      # TypeScript interfaces
│   ├── services/
│   │   ├── radio.service.ts      # API calls and data fetching
│   │   └── audio-player.service.ts  # Player state management
│   ├── app.component.*           # Root component
│   ├── app.routes.ts             # Route configuration
│   └── app.config.ts             # Application configuration
├── styles.css                    # Global styles
└── index.html                    # Entry HTML
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to:
```
http://localhost:4200
```

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Services

### RadioService

Handles all data fetching and formatting:
- Manages the list of available radio stations
- Fetches daily program XML from MediaKlikk API
- Parses XML to extract program information
- Generates audio URLs with correct timestamp parameters
- Formats dates and times

### AudioPlayerService

Manages the persistent audio player state:
- Uses RxJS BehaviorSubject for reactive state management
- Tracks currently playing program
- Communicates between ProgramList and AudioPlayer components

## Components

### StationListComponent

- Displays all 7 radio stations as interactive cards
- Navigates to program list when a station is selected
- Animated entrance with staggered delays

### ProgramListComponent

- Shows date selector and back button
- Fetches and displays programs for selected date
- Each program has play and download buttons
- Tracks currently playing program for UI feedback

### AudioPlayerComponent

- Fixed position player at bottom of screen
- Slides up when content is played
- Shows program title, station, and time range
- Full HTML5 audio controls
- Doesn't reload when navigating between pages

## Design Details

### Typography
- **Bebas Neue**: Headlines and station names (bold, broadcast-style)
- **Crimson Pro**: Body text (editorial, readable)
- **JetBrains Mono**: Technical details and timestamps

### Color Palette
- Primary: `#c41e3a` (Hungarian red)
- Secondary: `#1a1a1a` (Deep black)
- Accent: `#f4d03f` (Gold/yellow)
- Background: `#f8f5f0` (Vintage paper)

### Animations
- Slide-in effects for content loading
- Staggered entrance for station cards
- Smooth transitions on hover
- Retro scanline texture overlay


## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available for personal and educational use.
