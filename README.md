# Kora Časopis - Modern Headless Web Portal

A modern, full-stack web portal for "Kora," a literary and culture magazine. This project migrates the magazine from a standard WordPress theme to a **Headless Architecture**, using React for the frontend and existing WordPress as a Headless CMS.

**Live Site:** [https://koracasopis.com](https://koracasopis.com)

## Key Features

- **Headless Architecture:** Fetches content dynamically from a WordPress backend via REST API.
- **Custom Interactivity:** Implemented a **like** system using **Firebase Firestore**, allowing anonymous users to interact with posts.
- **Modern UI:** CSS (no frameworks), featuring glassmorphism, rotating gradient borders and responsive grid layouts.
- **Social Sharing:** Integrated Web Share API.
- **SEO Optimized:** Dynamic metadata using `react-helmet-async`.

## Tech Stack

- **Frontend:** React (Vite), React Router DOM
- **Styling:** Pure CSS
- **Backend (CMS):** WordPress (via REST API)
- **Database:** Firebase Firestore
- **Hosting:** Netlify

## How It Works

- **Content Management:** Editors continue writing posts in the WordPress dashboard they are used to.
- **Data Fetching:** The React app consumes the `wp-json` endpoint to retrieve articles, images, and metadata.
- **User Interaction:** When a user likes a post, the data is stored in Firebase. LocalStorage is used to prevent duplicate likes from the same user.