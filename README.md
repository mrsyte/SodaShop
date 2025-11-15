# 🥤 North Star Soda Shop - First-Person Soda Sliding Game

A fast-paced, arcade-style React game where you slide soda cups down a counter to serve impatient customers in a Minneapolis soda shop!

## 🎮 Game Overview

**North Star Soda Shop** is a first-person perspective game where players must quickly slide soda cups down a counter to hit moving customers before they get angry and leave. The game features dynamic difficulty scaling, colorful animations, and strategic upgrade mechanics.

## 🎯 Gameplay

### Objective
- Click anywhere on the counter to slide a soda cup toward the customers
- Hit customers with sodas before their patience runs out
- Keep the shop running by not letting more than 5 customers leave angry

### Core Mechanics
- **First-Person View**: Play from behind the counter with a 3D perspective
- **Moving Customers**: Customers move back and forth at random speeds (1-3x)
- **Patience System**: Each customer has 5 seconds of patience before getting angry
- **Lives System**: Game ends when 5 customers leave angry (showing as red pulsing lives counter)
- **Miss Penalty**: Every 5 missed sodas makes cups slide 300ms slower (penalty system)
- **Color-Cycling Counter**: Counter changes colors every 5 seconds for visual variety

### Visual Feedback
- 😊 **Happy Customers**: Normal appearance, green patience bar
- 😠 **Annoyed Customers**: Anger emoji appears, yellow patience bar
- 💢 **Very Angry Customers**: Shaking violently, red patience bar, inverted colors
- 💥 **Splat Effect**: Explosion animation when soda hits a customer

## 🎨 Features

### Dynamic Difficulty
- **Auto-Slowdown**: Cups move slower with every 5 misses
- **Random Customer Speed**: Each customer has unique movement speed
- **Escalating Challenge**: More misses = harder gameplay

### Upgrades (3 Available)
1. **⚡ Faster Slide** (10 pts) - Decreases slide time by 150ms per level
2. **📈 More Customers** (25 pts) - Spawns customers more frequently
3. **✨ Bonus Points** (50 pts) - Increases points per successful hit

### Visual Elements
- 6 rotating counter color schemes (Amber, Blue, Green, Purple, Red, Pink)
- Floating bubble background animations
- Wood grain counter texture with perspective
- Drop shadows and lighting effects
- Smooth CSS animations for all movements

## 📁 File Structure

```
soda-slide-first-person.jsx
│
├── Component: MinnesotaSodaShop (Main Game Component)
│   │
│   ├── State Management
│   │   ├── score - Player's current score
│   │   ├── customers - Array of active customers with position, speed, patience
│   │   ├── sodaCups - Array of cups currently sliding
│   │   ├── splatEffects - Temporary explosion effects
│   │   ├── gameOver - Boolean for game state
│   │   ├── customerPatience - 5000ms timeout per customer
│   │   ├── slideSpeed - Dynamic slide speed (starts 1200ms)
│   │   ├── customerSpawnRate - 2500ms between spawns
│   │   ├── colorScheme - Index for counter color rotation
│   │   ├── missedSodas - Counter for missed shots
│   │   ├── customersLost - Lives lost (max 5)
│   │   └── upgrades - Object containing upgrade states
│   │
│   ├── Game Logic (useEffect Hooks)
│   │   ├── Auto-slowdown on misses
│   │   ├── Counter color cycling (5s intervals)
│   │   ├── Customer spawning with random speeds
│   │   ├── Customer movement (back and forth)
│   │   ├── Patience tracking and timeout
│   │   └── Background bubble generation
│   │
│   ├── Functions
│   │   ├── slideSoda() - Creates new cup and triggers animation
│   │   ├── checkCollision() - Detects hits/misses and updates game state
│   │   ├── handleCounterClick() - Converts click position to target percentage
│   │   ├── buyUpgrade() - Handles upgrade purchases and effects
│   │   └── restartGame() - Resets all game state
│   │
│   └── UI Components
│       ├── Background (gradient + floating bubbles)
│       ├── Game Over Modal (score summary + restart button)
│       ├── Score Bar (title, score, stats, lives)
│       ├── Instructions (gameplay hint)
│       ├── Counter (first-person perspective with 3D transform)
│       │   ├── Customers (with patience bars and anger indicators)
│       │   ├── Sliding Cups (animated movement)
│       │   └── Splat Effects (collision animations)
│       └── Upgrade Buttons (3 square buttons in grid)
```

## 🎨 CSS Animations

### Keyframe Animations
- `float` - Bubbles rise and fade
- `slideToTarget` - Cups slide from bottom to top with perspective
- `splat` - Explosion effect with rotation
- `shake` - Angry customer shaking
- `pulse` - Anger emoji pulsing

## 📱 Responsive Design

### Screen Adaptation
- Counter height: `calc(100vh - 280px)` - Dynamically fills available screen space
- Min height: 400px (prevents crushing on small screens)
- Max height: 700px (prevents excessive height on large screens)
- Compact spacing for mobile optimization
- All UI elements fit on single screen

### Layout Breakpoints
- Upgrade buttons scale with screen size
- Text sizes optimized for readability
- Touch-friendly click areas

## 🎲 Game Balance

### Starting Values
- Slide Speed: 1200ms
- Customer Patience: 5000ms (5 seconds)
- Spawn Rate: 2500ms (2.5 seconds)
- Customer Movement Speed: 1-3 (random per customer)
- Lives: 5

### Upgrade Costs
- Faster Slide: 10 pts (increases 1.8x per level)
- More Customers: 25 pts (increases 1.8x per level)
- Bonus Points: 50 pts (increases 1.8x per level)

### Penalties
- Every 5 misses: +300ms slide time (cups get slower)
- Customer leaves: -1 life
- 5 customers leave: Game Over

## 🚀 How to Use

### Installation
1. Copy the `soda-slide-first-person.jsx` file to your React project
2. Ensure you have `lucide-react` installed:
   ```bash
   npm install lucide-react
   ```
3. Import and use the component:
   ```jsx
   import MinnesotaSodaShop from './soda-slide-first-person';
   
   function App() {
     return <MinnesotaSodaShop />;
   }
   ```

### Requirements
- React 16.8+ (uses hooks)
- lucide-react (for icons)
- Tailwind CSS (for styling)

## 🎓 Technical Notes

### Performance Considerations
- Uses `requestAnimationFrame` for smooth animations
- Cleanup functions prevent memory leaks
- Efficient state updates with functional setState
- Collision detection runs only after cup animation completes

### Browser Compatibility
- Modern browsers with CSS `transform` support
- Emoji support required for customer avatars
- CSS gradients and animations

## 🎉 Credits

**Location**: Minneapolis, Minnesota  
**Theme**: North Star Soda Shop  
**Style**: Fast-paced arcade with strategic upgrades  
**Perspective**: First-person counter view

---

**Have fun serving sodas and keeping customers happy!** 🥤✨
