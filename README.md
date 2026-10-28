# Route Posts — Social Media Web App

Route Posts is a full-featured social media single-page web application built with React 19, TypeScript, and Tailwind CSS. It connects to the Route Posts REST API to provide user authentication, rich post publishing and editing, threaded comments and replies, likes, shares, bookmarks, user following, notifications, and customizable user profiles with full light/dark mode support.

## Features

- **Authentication & Account Security**: Sign up, sign in, password change with live rule checklist, visibility toggles, and automatic `401` session expiration handling.
- **Feed Views**: Browse the community feed, personal posts (`My Posts`), or bookmarked posts (`Saved`) with responsive desktop sidebar and mobile tab navigation.
- **Posts**: Create, edit, and delete posts with text, emoji picker, image uploads, privacy selector (`Public`, `Followers`, `Only me`), and full-screen image lightbox.
- **Engagement**: Like, share (with optional commentary), and bookmark posts; view shared-post previews inline.
- **Comments & Replies**: Create, edit, delete, and like comments; view and post nested replies with optional image and emoji support.
- **Profiles & Connections**: View and update personal profile avatar and cover photos, inspect other users' profiles and post histories, browse suggested friends with search filtering, and follow/unfollow users.
- **Notifications**: Filter all vs. unread notifications, view unread badge counts, and mark individual or all notifications as read.
- **UI & Accessibility**: Persistent dark/light theme toggle, offline connection banner, accessible modal dialogs (`role="dialog"`, `Escape` key support), and responsive layouts.

## Tech Stack

| Category | Package | Version |
| :--- | :--- | :--- |
| Framework & Language | `react` / `react-dom` / `typescript` | `^19.2.8` / `~6.0.2` |
| Build Tool | `vite` | `^8.3.0` |
| Routing | `react-router` | `^8.4.0` |
| Server State & Caching | `@tanstack/react-query` | `^5.104.0` |
| Styling & UI | `tailwindcss` / `flowbite-react` | `^4.3.3` / `^0.12.17` |
| Forms & Validation | `react-hook-form` / `zod` / `@hookform/resolvers` | `^7.88.0` / `^4.6.5` / `^5.9.1` |
| HTTP Client | `axios` | `^1.20.0` |
| Utilities & Icons | `dayjs` / `sweetalert2` / `emoji-picker-react` / `@fortawesome/fontawesome-free` | `^1.11.23` / `^11.26.25` / `^4.22.2` / `^7.3.1` |
| Status & Feedback | `react-loader-spinner` / `react-detect-offline` | `^8.0.2` / `^2.4.5` |

## Project Structure

```text
src/
├── api/                  # Axios instance, query key registry, and domain API service modules
├── assets/               # Static image assets (default profile avatar and brand logo)
├── components/
│   ├── auth/             # AuthFormLayout shared wrapper for Login and Register pages
│   ├── comment/          # CommentSection, CommentCard, CommentCreator, ReplyList, ReplyCard, ReplyCreator
│   ├── friends/          # FriendCard and SuggestedFriends sidebar widget
│   ├── layout/           # Layout shell, ProtectedRoute guard, Navbar, NavLinks, UserMenu, NotificationBadge
│   ├── notifications/    # NotificationItem row component
│   ├── post/             # PostList, PostCard, PostHeader, PostFooter, PostActions, CreatePost, ShareModal, etc.
│   ├── profile/          # ProfileBanner and PhotoLightbox modal
│   └── ui/               # Reusable primitives (Modal, FormField, PasswordRules, UserAvatar, UserLink, TabBar, PageLoader, ErrorState, EmojiToggle, MediaUploadInput)
├── context/              # AuthContext for token persistence and logged-in user profile state
├── hooks/                # Custom React Query and UI hooks for posts, comments, bookmarks, follow, notifications, profile, and dark mode
├── pages/                # Route-level page components (Feed, Profile, UserProfile, Login, Register, etc.)
├── schemas/              # Shared Zod v4 validation schemas for authentication forms
├── types/                # TypeScript interfaces for posts, comments, friends, and notifications
└── utils/                # getApiErrorMessage helper for extracting Axios API error messages
```

## Getting Started

### Prerequisites

- A recent LTS version of **Node.js** (the project was developed on v24) and **npm**

### Installation & Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Copy `.env.example` to `.env` and set the backend API URL:
   ```bash
   cp .env.example .env
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Environment Variables

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base URL for the Route Posts backend API | `https://route-posts.routemisr.com` |

## Routes

The application uses `createHashRouter`, so all client-side routes are prefixed with `/#/`:

| Path | Page | Access | Description |
| :--- | :--- | :--- | :--- |
| `/#/` | `Register` | Public | New user registration form |
| `/#/Login` | `Login` | Public | User sign-in form |
| `/#/Feed` | `Feed` | Protected | Main feed (`Feed`, `My Posts`, `Saved` tabs) + suggestions sidebar |
| `/#/Profile` | `Profile` | Protected | Logged-in user's profile banner, photo uploads, and posts |
| `/#/user/:id` | `UserProfile` | Protected | Public user profile banner, follow toggle, and posts |
| `/#/PostsDetails/:id` | `PostDetails` | Protected | Single post view with expanded comments and replies |
| `/#/Notifications` | `Notifications` | Protected | Notification center with `All` / `Unread` filters |
| `/#/Suggestions` | `AllSuggestions` | Protected | Searchable directory of suggested users to follow |
| `/#/ChangePassword` | `ChangePassword` | Protected | Account password update form |
| `*` | `<Navigate to="/Feed" replace />` | — | Redirects unknown routes to `/#/Feed` |

## Architecture Notes

- **Central Axios Client (`src/api/client.ts`)**: Automatically injects the `token` header from `localStorage` on every request and intercepts `401` responses (excluding auth endpoints) to clear stale credentials and redirect to `/#/Login`.
- **Domain API Services (`src/api/*.api.ts`)**: All HTTP calls are grouped by domain (`auth`, `posts`, `comments`, `users`, `notifications`) so components never call `axios` directly.
- **Query Keys Registry (`src/api/queryKeys.ts`)**: Centralizes all TanStack Query cache keys (`posts`, `postDetails`, `userPosts`, `bookmarks`, `comments`, `replies`, `notifications`, `unreadCount`, `suggestions`, `allSuggestions`, `profile`) for consistent cache invalidation.
- **Custom Data Hooks (`src/hooks/`)**: Encapsulate `useQuery` and `useMutation` calls and invalidate the relevant query keys on mutation success, keeping UI components declarative.
- **Shared UI Primitives (`src/components/ui/`)**: Consolidate avatars (`UserAvatar`), profile links (`UserLink`), form inputs (`FormField`, `PasswordRules`, `EmojiToggle`, `MediaUploadInput`), modals (`Modal`), tab bars (`TabBar`), and loading/error states (`PageLoader`, `ErrorState`).
- **Schema-Driven Forms (`src/schemas/auth.schema.ts`)**: Uses React Hook Form + Zod v4 with `onTouched` validation and a live password requirements checklist (`PasswordRules`).

## Screenshots

_Screenshots coming soon._
