# The PUB — Blog Application

A modern, lightweight blogging app built with Vite + React and Appwrite for backend services. It provides user authentication, post creation with a rich-text editor, and simple CRUD for posts — ideal as a starter blog or personal publishing platform.

## Table of Contents

- About
- Key Features
- Tech Stack
- Architecture & Data Flow
- Project Structure
- Important Files
- Local Setup
- Environment & Configuration
- Running & Building
- Deployment Notes
- Contributing
- License

## About

The PUB is a single-page application that lets authenticated users create, edit, and publish blog posts. It focuses on a clean developer experience, minimal design, and Appwrite-powered backend services (authentication and database/storage).

## Key Features

- User sign up / log in (Appwrite)
- Create, edit, delete, and view posts
- Rich-text editor for post content
- Responsive UI components and reusable layout
- Client-side state management (Redux Toolkit)

## Tech Stack

- Frontend: React (Vite)
- State: Redux Toolkit
- Backend services: Appwrite (auth, database, storage)
- Styling: plain CSS (index.css) and component-level styles
- Bundler: Vite

## Architecture & Data Flow

- The app is a client-side React SPA. Authentication, persistence, and file storage are handled via Appwrite APIs.
- Users authenticate through Appwrite; the app stores auth state in the Redux store (`src/store/authSlice.js`).
- Posts are saved to Appwrite database collections and retrieved by the frontend. The `PostForm`/`RTE` components handle composing content.

## Project Structure (important parts)

- `src/` — main source folder
  - `appwrite/` — Appwrite client and auth helpers (`config.js`, `auth.js`)
  - `components/` — shared UI components (`Header`, `Footer`, `PostCard`, `RTE`, `Input`, `Button`, etc.)
  - `pages/` — route views (`Home`, `AllPosts`, `Post`, `AddPost`, `EditPost`, `Login`, `Signup`)
  - `store/` — Redux store and slices (`store.js`, `authSlice.js`)
  - `conf/` — app configuration helper(s)
  - `main.jsx`, `App.jsx`, `index.css` — app bootstrap and global styles

## Important Files

- `src/appwrite/config.js` — Appwrite client configuration
- `src/appwrite/auth.js` — Authentication helper wrappers
- `src/components/Post-form/PostForm.jsx` — Create/Edit post UI
- `src/components/RTE.jsx` — Rich-text editor wrapper
- `src/store/authSlice.js` — Authentication state and reducers

## Local Setup

Prerequisites:

- Node.js (recommended >= 16)
- npm or yarn

Steps:

1. Clone the repo

```bash
git clone <repo-url>
cd The-PUB-Blog-Application
```

2. Install dependencies

```bash
npm install
```

3. Add environment configuration

Create a `.env` file (or set environment variables) with your Appwrite values. Typical variables used by the app include:

- `VITE_APPWRITE_ENDPOINT` — Appwrite endpoint URL
- `VITE_APPWRITE_PROJECT_ID` — Appwrite project ID
- any other Appwrite-related IDs referenced in `src/appwrite/config.js` or `src/conf/conf.js`

Example `.env` (replace with your values):

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
```

Refer to `src/appwrite/config.js` for exact environment variables required.

## Running & Building

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Appwrite Integration Notes

- Authentication and database calls are in `src/appwrite/`. Ensure your Appwrite project has the appropriate database collections and permissions for public read or user-scoped access as the app expects.
- If you self-host Appwrite, make sure CORS and allowed origins include your dev and production URLs.

## UI & Components Overview

- `Header` / `Footer`: App layout and navigation (login/logout hooks)
- `AuthLayout`: layout wrapper for auth pages (`Login`, `Signup`)
- `PostCard`: used to list posts on home and listings
- `PostForm` + `RTE`: full editor UI for creating and editing posts
- `Select`, `Input`, `Button`: small reusable form controls

## State Management

- The single source of truth for auth is `src/store/authSlice.js`. Extend slices or add new ones to manage other global state.

## Deployment

- Deploy the production build to any static hosting (Vercel, Netlify, Surge). Ensure the Appwrite endpoint and project ID env variables are configured in the host.
- For Appwrite, either use Appwrite Cloud or a self-hosted instance. Configure CORS and API permissions appropriately.

## Contributing

- Fork the repo, create a feature branch, and open a pull request.
- Keep pull requests focused and include description/testing steps.

---
