# 🍑 Operation Big Butt

A personalized workout tracking app built with React + Vite + TypeScript.
Vanderbilt-inspired black and gold theme. Hosted on GitHub Pages, zero backend required.

---

## Features

- **5 workout types** — Glute Day 1, Glute Day 2, Upper, Softball Practice, Softball Game
- **Full exercise templates** pre-loaded for each gym day
- **Check off exercises** as you go, with optional actual weight/rep logging
- **Softball logging** — attendance, intensity slider, focus fields
- **Workout history** with filter by type and expandable session cards
- **Stats dashboard** — streak, total sessions, weekly count, type breakdown
- **Confetti celebration** when you complete a workout
- **Delete entries** from history
- **Fully offline** — all data lives in `localStorage`

---

## Local Development

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/operation-big-butt.git
cd operation-big-butt

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173/operation-big-butt/](http://localhost:5173/operation-big-butt/) in your browser.

---

## Build for Production

```bash
npm run build
```

Output is in the `dist/` folder. Preview it locally with:

```bash
npm run preview
```

---

## Deploy to GitHub Pages

### One-time setup

1. **Create a GitHub repo** named `operation-big-butt` (or whatever you want).

2. **Update the base path** in `vite.config.ts` to match your repo name:
   ```ts
   base: '/operation-big-butt/',   // ← change this to your repo name
   ```

3. **Push your code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/operation-big-butt.git
   git push -u origin main
   ```

4. **Enable GitHub Pages** from the repo's Settings → Pages:
   - Source: **GitHub Actions**

5. **Add the deploy workflow** — create `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: pages
     cancel-in-progress: true

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - uses: actions/checkout@v4

         - name: Set up Node
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: npm

         - name: Install dependencies
           run: npm ci

         - name: Build
           run: npm run build

         - name: Upload Pages artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: dist

         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

6. **Push the workflow file** and GitHub Actions will build and deploy automatically on every push to `main`.

Your app will be live at:
```
https://YOUR_USERNAME.github.io/operation-big-butt/
```

---

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Sticky top nav
│   ├── WorkoutTypeCard.tsx # Clickable card for each workout type
│   ├── ExerciseRow.tsx     # Single exercise with checkbox + input
│   ├── StatsGrid.tsx       # Streak / session count dashboard
│   └── SessionCard.tsx     # Expandable history entry
├── pages/
│   ├── HomePage.tsx        # Main landing + workout selection
│   ├── LogPage.tsx         # Workout logging form
│   └── HistoryPage.tsx     # All past sessions with filter
├── hooks/
│   └── useWorkoutLog.ts    # React state + localStorage sync
├── utils/
│   └── storage.ts          # Read/write helpers + stat calculations
├── data/
│   └── workouts.ts         # Exercise templates + workout metadata
├── types/
│   └── index.ts            # TypeScript interfaces + enums
├── App.tsx                 # Router setup
├── main.tsx                # Entry point
└── index.css               # Tailwind + global styles
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| TypeScript | Type safety |
| Tailwind CSS v3 | Styling |
| React Router v6 (HashRouter) | Navigation (GitHub Pages compatible) |
| canvas-confetti | Celebration animation |
| localStorage | Persistent data storage |

---

## Customization

- **Add / change exercises** — edit `src/data/workouts.ts`
- **Change colors** — update `tailwind.config.js` (gold: `#CFB53B`, background: `#0d0d0d`)
- **Change the tagline** — edit `src/pages/HomePage.tsx`
