# React Native Basic

> **This is a learning repository** for studying React Native and Expo fundamentals. It is intended for educational purposes and experimentation.

A mobile application built with [Expo](https://expo.dev) (SDK 57) and [React Native](https://reactnative.dev).

## Tech Stack

- **Framework:** Expo SDK 57 / React Native 0.86
- **Routing:** Expo Router (file-based, tab navigation)
- **State Management:** Zustand
- **Data Fetching:** TanStack React Query
- **Animations:** React Native Reanimated
- **Gestures:** React Native Gesture Handler

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Xcode](https://developer.apple.com/xcode/) (for iOS Simulator)
- [Android Studio](https://developer.android.com/studio) (for Android Emulator)

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the app

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web

# Or start the dev server and choose a platform interactively
npm start
```

## Project Structure

```
├── app/                  # Screens and layouts (file-based routing)
│   ├── (tabs)/           # Tab navigation screens
│   ├── _layout.tsx       # Root layout
│   ├── modal.tsx         # Modal screen
│   ├── +html.tsx         # HTML template (web)
│   └── +not-found.tsx    # 404 screen
├── assets/               # Images, fonts, and static files
├── components/           # Reusable UI components
├── constants/            # App-wide constants
├── app.json              # Expo configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Available Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm start`       | Start the Expo dev server          |
| `npm run ios`     | Start on iOS Simulator             |
| `npm run android` | Start on Android Emulator          |
| `npm run web`     | Start in the browser               |

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native](https://reactnative.dev/docs/getting-started)
