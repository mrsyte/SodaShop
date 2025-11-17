# North Star Soda Shop Game 🥤

A fast-paced, interactive mobile and desktop game where you slide sodas to customers at a bustling Minnesota soda shop! Test your reflexes and strategy as you serve customers before they lose patience. Earn points, buy upgrades, and see how long you can keep the shop running!

---

## Features

- **Dynamic Gameplay**: Slide sodas to moving customers with increasing difficulty as the game progresses.
- **Upgrades**: Use your score to unlock upgrades like faster slides, more customers, and bonus points.
- **Lives System**: Start with 10 lives and lose one each time a customer leaves angry.
- **Responsive Design**: Optimized for both mobile and desktop devices.
- **Vibrant Visuals**: Engaging animations, colorful themes, and fun customer avatars.

---

## How to Play

1. **Slide Sodas**: Click anywhere on the counter to slide a soda to that position.
2. **Hit Customers**: Aim for the moving customers before they lose patience.
3. **Avoid Misses**: Missing customers increases the difficulty and reduces your lives.
4. **Upgrade Your Shop**: Spend your score on upgrades to improve your chances of survival.

---

## Built With

- **Frontend**: 
  - **React.js**: For building the interactive user interface.
  - **Tailwind CSS**: For styling and responsive design.
- **State Management**: React's `useState` and `useEffect` hooks for managing game state and animations.
- **Animations**: CSS keyframes for smooth transitions and effects.
- **Assets**: Custom SVGs and images for customers, sodas, and effects.

---

## Architecture Overview

The game is structured as a single-page React application with the following key components:

1. **Game State Management**:
   - React hooks (`useState`, `useEffect`) are used to manage the game state, including:
     - `score`, `lives`, `missedSodas`, and `upgrades`.
     - Dynamic properties like `customerSpawnRate` and `slideSpeed` that adjust difficulty.
   - Timers (`setInterval`, `setTimeout`) control customer movement, soda animations, and background effects.

2. **UI and Layout**:
   - The game layout is responsive, with a 3D perspective effect for the counter.
   - Tailwind CSS is used for styling, ensuring a clean and modern design.

3. **Core Features**:
   - **Collision Detection**: Checks if a soda hits a customer using position calculations.
   - **Upgrades System**: Allows players to purchase upgrades that modify game parameters.
   - **Game Over Logic**: Ends the game when the player runs out of lives.

4. **Animations**:
   - CSS keyframes are used for:
     - Soda sliding (`slideToTarget`).
     - Customer patience indicators (`pulse`, `shake`).
     - Background bubbles (`float`).
     - Splat effects when a soda hits a customer.

5. **Assets and Themes**:
   - Customer avatars and soda icons are stored as SVGs for scalability.
   - Dynamic color schemes for the counter are implemented using Tailwind's gradient utilities.

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/north-star-soda-shop.git
   cd north-star-soda-shop
