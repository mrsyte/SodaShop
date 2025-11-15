# Soda Shop Game - Updated with Images! 🎮

## What Changed

All emojis have been replaced with SVG images that will work on all devices:

### Images Created:
- **Customer Avatars** (8 different characters):
  - `/public/images/customer1.svg` through `customer8.svg`
  - Each with unique hair, clothing colors, and styles
  
- **Game Elements**:
  - `/public/images/soda.svg` - Red soda cup with straw
  - `/public/images/splash.svg` - Yellow explosion/splat effect
  - `/public/images/angry.svg` - Red anger symbol (Japanese style)
  - `/public/images/worried.svg` - Blue sweat drop

### Files Updated:
- `src/soda-slide-first-person.jsx` - All emoji references replaced with `<img>` tags

## Deploy to Vercel

### Quick Steps:

1. **Extract the archive**

2. **Navigate to folder in terminal**

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Test locally (optional):**
   ```bash
   npm run dev
   ```
   Visit http://localhost:5173

5. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Soda shop game with image assets"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

6. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your repository
   - Click "Deploy"

That's it! The images are in the `public/images/` folder and will automatically be served by Vercel.

## Troubleshooting

### If images don't show:
1. Make sure the `public/images/` folder is included in your git commit
2. Check browser console for 404 errors
3. Verify image paths start with `/images/` (not `./images/` or `../images/`)

### If build fails:
1. Run `npm install` again
2. Check that all dependencies are in package.json
3. Try `npm run build` locally first to catch errors

## Project Structure

```
soda-shop-game/
├── public/
│   └── images/           ← All game images here
│       ├── customer1.svg
│       ├── customer2.svg
│       ├── customer3.svg
│       ├── customer4.svg
│       ├── customer5.svg
│       ├── customer6.svg
│       ├── customer7.svg
│       ├── customer8.svg
│       ├── soda.svg
│       ├── splash.svg
│       ├── angry.svg
│       └── worried.svg
├── src/
│   ├── main.jsx
│   ├── index.css
│   └── soda-slide-first-person.jsx  ← Updated to use images
├── index.html
├── package.json
└── vite.config.js
```

## Notes

- SVG images are scalable and will look crisp on all screen sizes
- Images load fast (each is only a few KB)
- Works on all browsers including iOS Safari
- No emoji compatibility issues!

Enjoy your game! 🎉
