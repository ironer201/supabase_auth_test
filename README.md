# Supabase Authentication + Profile Dashboard

A small HTML/CSS/JS demo that uses Supabase Auth for email/password sign up and login, then lets users view and edit a profile record stored in a Supabase table.

## Features

- Email/password sign up and login with Supabase Auth
- On first login, creates a profile row if missing
- Profile view and edit UI on a dashboard page
- Data saved with an upsert on the profile table

## Project Structure

- [index.html](index.html): Login and sign up page
- [script.js](script.js): Auth logic and profile row creation
- [style.css](style.css): Auth page styles
- [dashboard.html](dashboard.html): Profile dashboard UI
- [dashboard.js](dashboard.js): Profile load/update logic
- [dashboard.css](dashboard.css): Dashboard styles
- [supabaseClient.js](supabaseClient.js): Supabase client config

## Prerequisites

- A Supabase project
- A table to store profile data (see schema below)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Update Supabase credentials in [supabaseClient.js](supabaseClient.js):
   - `SUPABASE_URL`
   - `supabaseAnonKey`

3. Open [index.html](index.html) in a browser.

## Database Schema

Create a table named `auth` in Supabase with these columns:

- `Email` (text, primary key or unique)
- `Name` (text)
- `Phone` (text)
- `PresentAddress` (text)
- `PermanentAddress` (text)
- `Gender` (text)
- `Nationality` (text)

The app uses `Email` as the identity key when reading and writing profile data.

## How It Works

- Sign up: `script.js` calls `supabase.auth.signUp()`.
- Login: `script.js` calls `supabase.auth.signInWithPassword()`.
- After login, the user email is saved in `localStorage` as `loggedInEmail`.
- If no profile row exists, a blank row is inserted into `auth`.
- The dashboard loads the profile by email and allows updates via upsert.

## Notes

- The Supabase anon key in [supabaseClient.js](supabaseClient.js) should be treated like a public key, but do not commit secrets.
- This is a static frontend demo; there is no backend server.

## Optional Improvements

- Add client-side validation for profile fields
- Add email verification status checks
- Add row-level security policies and user-based access controls

## License

No license specified. Add one if you plan to distribute this project.
