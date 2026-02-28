# ABTalks – 60 Days Industry Coding Challenge

Full-stack platform for a structured 60-day coding challenge (Software Engineering, Machine Learning, AI).

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, TailwindCSS, ShadCN-style UI, Recharts
- **Backend:** Next.js API routes, Prisma ORM
- **Database:** PostgreSQL
- **Auth:** JWT in HTTP-only cookie, bcrypt password hashing

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env` and set:

   - `DATABASE_URL` – PostgreSQL connection string (e.g. `postgresql://user:password@localhost:5432/abtalks?schema=public`)
   - `JWT_SECRET` – Secret for signing JWTs (use a long random string in production)

3. **Database**

   Ensure PostgreSQL is running, then:

   ```bash
   npx prisma migrate dev
   npm run db:seed
   ```

4. **Run**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` – Start dev server
- `npm run build` – Production build
- `npm run start` – Start production server
- `npm run db:migrate` – Run Prisma migrations
- `npm run db:seed` – Seed 60 challenges and sample problems

## Project Structure

- `app/` – App Router pages (dashboard, challenge, problems, profile, login, register)
- `app/api/` – API routes (auth, challenge, problems, submissions, dashboard)
- `components/` – UI components and sidebar
- `lib/` – db, auth, utils
- `prisma/` – schema and seed

## Features

- **60-day challenge:** One challenge per day; Day N unlocks when Day N-1 is solved. Streak and longest streak tracked by calendar day.
- **Problems:** Separate practice set with filters (difficulty, category).
- **Submissions:** Stored with user, challenge/problem, code, result (evaluation is “Passed” for now).
- **Dashboard:** Current day, problems solved, streaks, completion %, recent activity, category pie chart, weekly submissions bar chart.
