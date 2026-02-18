# Quick Start Guide

## Angular Project Structure Overview

### Core Configuration Files

- `package.json` - Dependencies and npm scripts
- `angular.json` - Angular CLI configuration
- `tsconfig.json` - TypeScript compiler options
- `src/index.html` - Entry HTML file
- `src/styles.css` - Global styles with design tokens
- `src/main.ts` - Application bootstrap

### Application Files

**Main App:**
- `src/app/app.component.ts` - Root component with header
- `src/app/app.component.html` - Template with router outlet
- `src/app/app.routes.ts` - Route configuration
- `src/app/app.config.ts` - App providers (HttpClient, Router)

**Models:**
- `src/app/models/station.model.ts` - TypeScript interfaces for Station and BroadcastProgram

**Services:**
- `src/app/services/radio.service.ts` - Handles API calls, XML parsing, URL generation
- `src/app/services/audio-player.service.ts` - Manages player state with RxJS

**Components:**

1. **StationListComponent** (Landing Page)
   - `station-list.component.ts`
   - `station-list.component.html`
   - `station-list.component.css`

2. **ProgramListComponent** (Program Schedule)
   - `program-list.component.ts`
   - `program-list.component.html`
   - `program-list.component.css`

3. **AudioPlayerComponent** (Persistent Player)
   - `audio-player.component.ts`
   - `audio-player.component.html`
   - `audio-player.component.css`

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm start
   ```
   App runs at: http://localhost:4200

3. **Build for production:**
   ```bash
   npm run build
   ```

## Key Features Implemented

✅ Standalone Components (Angular 18)
✅ Reactive state management with RxJS
✅ HTTP client for XML data fetching
✅ Router navigation between views
✅ Persistent audio player (doesn't reload on navigation)
✅ Responsive design (mobile & desktop)
✅ Same distinctive aesthetic as original HTML version
✅ TypeScript for type safety
✅ Service-based architecture

## Design Tokens (CSS Variables)

All colors and theme values are in `:root` in `src/styles.css`:
- --primary: #c41e3a (Hungarian red)
- --secondary: #1a1a1a (Black)
- --accent: #f4d03f (Gold)
- --background: #f8f5f0 (Vintage paper)
- --player-bg: #1a1a1a (Player background)

## Component Communication

```
StationListComponent
    ↓ (Router navigation)
ProgramListComponent
    ↓ (AudioPlayerService.play())
AudioPlayerComponent
```

The AudioPlayerService uses a BehaviorSubject to manage state reactively,
allowing the ProgramListComponent to control the player and track what's playing.

## Next Steps

- Customize styles in component CSS files
- Add error handling improvements
- Add loading skeletons
- Implement favorites/bookmarks
- Add search functionality
- Add keyboard shortcuts
- Implement service workers for offline support
