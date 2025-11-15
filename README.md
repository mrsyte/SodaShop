# North Star Soda Shop Game 🥤

A fast-paced mobile game where you slide sodas to customers at a Minnesota soda shop!

## Deploy to Vercel

### Method 1: Via GitHub (Recommended)

1. Create a new repository on GitHub
2. In your project folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com)
4. Click "Add New Project"
5. Import your GitHub repository
6. Vercel will auto-detect the settings - just click "Deploy"!

### Method 2: Via Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. From your project folder:
   ```bash
   vercel
   ```

3. Follow the prompts and you'll get a live URL!

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

## Build for Production

```bash
npm run build
```

This creates a `dist` folder with your optimized game ready to deploy.

## Project Structure

```
soda-shop-game/
├── src/
│   ├── main.jsx                    # React entry point
│   ├── index.css                   # Global styles
│   └── soda-slide-first-person.jsx # Game component
├── index.html                       # HTML entry point
├── package.json                     # Dependencies
├── vite.config.js                   # Build config
├── tailwind.config.js               # Tailwind config
└── postcss.config.js                # PostCSS config
```

## How to Play

Click anywhere on the counter to slide a soda to that position. Try to hit the moving customers before they get angry and leave!

- **Lives**: You start with 10 lives. Lose one each time a customer leaves angry.
- **Upgrades**: Use your score to buy upgrades for faster slides, more customers, and bonus points.
- **Difficulty**: The game gets faster the more sodas you miss!

Enjoy! 🎮
