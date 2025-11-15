import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, TrendingUp } from 'lucide-react';

export default function MinnesotaSodaShop() {
  const [score, setScore] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [sodaCups, setSodaCups] = useState([]);
  const [bubbles, setBubbles] = useState([]);
  const [splatEffects, setSplatEffects] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [customerPatience, setCustomerPatience] = useState(5000); // 5 seconds - faster!
  const [slideSpeed, setSlideSpeed] = useState(1200); // ms to slide
  const [customerSpawnRate, setCustomerSpawnRate] = useState(2500);
  const [colorScheme, setColorScheme] = useState(0);
  const [missedSodas, setMissedSodas] = useState(0);
  const [customersLost, setCustomersLost] = useState(0);
  const maxCustomersLost = 5;
  const [upgrades, setUpgrades] = useState({
    fasterSlide: { cost: 10, level: 0 },
    moreCustomers: { cost: 25, level: 0 },
    bonusPoints: { cost: 50, level: 0, multiplier: 1 }
  });

  // Color schemes for the counter
  const colorSchemes = [
    { from: 'from-amber-600', to: 'to-amber-800', border: 'border-amber-900', name: 'Amber' },
    { from: 'from-blue-600', to: 'to-blue-800', border: 'border-blue-900', name: 'Blue' },
    { from: 'from-green-600', to: 'to-green-800', border: 'border-green-900', name: 'Green' },
    { from: 'from-purple-600', to: 'to-purple-800', border: 'border-purple-900', name: 'Purple' },
    { from: 'from-red-600', to: 'to-red-800', border: 'border-red-900', name: 'Red' },
    { from: 'from-pink-600', to: 'to-pink-800', border: 'border-pink-900', name: 'Pink' },
  ];

  // Auto-decrease speed (slower) every 5 misses - MUCH SLOWER NOW
  useEffect(() => {
    if (missedSodas > 0 && missedSodas % 5 === 0) {
      setSlideSpeed(prev => prev + 300); // Increase time = much slower speed
    }
  }, [missedSodas]);

  // Change counter color every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setColorScheme(prev => (prev + 1) % colorSchemes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Customer emojis/avatars
  const customerTypes = ['👨', '👩', '👦', '👧', '🧑', '👴', '👵', '👨‍🦰', '👩‍🦰', '🧔', '👱‍♀️', '👱‍♂️'];

  // Spawn customers at random intervals
  useEffect(() => {
    if (gameOver) return;
    
    const interval = setInterval(() => {
      const newCustomer = {
        id: Date.now() + Math.random(),
        emoji: customerTypes[Math.floor(Math.random() * customerTypes.length)],
        position: Math.random() * 80 + 10, // Random position across the counter end
        direction: Math.random() > 0.5 ? 1 : -1, // Moving left or right
        speed: Math.random() * 2 + 1, // Random speed between 1 and 3
        spawnTime: Date.now()
      };
      setCustomers(prev => [...prev, newCustomer]);
      
      // Set timeout for customer getting mad (faster pace)
      setTimeout(() => {
        setCustomers(current => {
          const stillExists = current.find(c => c.id === newCustomer.id);
          if (stillExists) {
            // Customer got mad and left!
            setCustomersLost(prev => {
              const newCount = prev + 1;
              if (newCount >= maxCustomersLost) {
                setGameOver(true);
              }
              return newCount;
            });
            // Remove the customer
            return current.filter(c => c.id !== newCustomer.id);
          }
          return current;
        });
      }, customerPatience);
      
    }, customerSpawnRate);
    
    return () => clearInterval(interval);
  }, [customerSpawnRate, gameOver, customerPatience]);

  // Move customers back and forth
  useEffect(() => {
    if (gameOver) return;
    
    const interval = setInterval(() => {
      setCustomers(prev => prev.map(customer => {
        let newPos = customer.position + (customer.direction * customer.speed);
        let newDir = customer.direction;
        
        // Bounce at edges
        if (newPos <= 10) {
          newPos = 10;
          newDir = 1;
        } else if (newPos >= 90) {
          newPos = 90;
          newDir = -1;
        }
        
        return { ...customer, position: newPos, direction: newDir };
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, [gameOver]);

  // Check customer patience
  useEffect(() => {
    if (gameOver) return;
    
    const interval = setInterval(() => {
      const now = Date.now();
      setCustomers(prev => prev.map(customer => {
        const timeWaiting = now - customer.spawnTime;
        const patience = timeWaiting / customerPatience;
        return { ...customer, patience };
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, [customerPatience, gameOver]);

  // Generate background bubbles
  useEffect(() => {
    const interval = setInterval(() => {
      const newBubble = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 30 + 10,
        duration: Math.random() * 3 + 2
      };
      setBubbles(prev => [...prev, newBubble]);
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
      }, newBubble.duration * 1000);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const slideSoda = (targetX) => {
    if (gameOver) return;
    
    const newCup = {
      id: Date.now() + Math.random(),
      targetX: targetX,
      startTime: Date.now()
    };
    setSodaCups(prev => [...prev, newCup]);
    
    // Check for collision after animation completes
    setTimeout(() => {
      checkCollision(newCup);
      // Remove cup after animation
      setSodaCups(prev => prev.filter(c => c.id !== newCup.id));
    }, slideSpeed);
  };

  const checkCollision = (cup) => {
    // Check if any customer is near the target position
    const hitCustomer = customers.find(c => 
      Math.abs(c.position - cup.targetX) < 10
    );
    
    if (hitCustomer) {
      // HIT! Create splat effect
      setScore(s => s + upgrades.bonusPoints.multiplier);
      
      const splat = {
        id: Date.now() + Math.random(),
        position: hitCustomer.position
      };
      setSplatEffects(prev => [...prev, splat]);
      setTimeout(() => {
        setSplatEffects(prev => prev.filter(s => s.id !== splat.id));
      }, 500);
      
      // Remove customer
      setCustomers(prev => prev.filter(c => c.id !== hitCustomer.id));
    } else {
      // MISS! Increment missed counter
      setMissedSodas(prev => prev + 1);
    }
  };

  const handleCounterClick = (e) => {
    if (gameOver) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentX = (clickX / rect.width) * 100;
    
    slideSoda(percentX);
  };

  const buyUpgrade = (type) => {
    const upgrade = upgrades[type];
    if (score >= upgrade.cost) {
      setScore(score - upgrade.cost);
      
      const newUpgrades = { ...upgrades };
      newUpgrades[type] = {
        ...upgrade,
        level: upgrade.level + 1,
        cost: Math.floor(upgrade.cost * 1.8)
      };
      
      if (type === 'fasterSlide') {
        setSlideSpeed(Math.max(400, slideSpeed - 150));
      } else if (type === 'moreCustomers') {
        setCustomerSpawnRate(Math.max(800, customerSpawnRate - 350));
      } else if (type === 'bonusPoints') {
        newUpgrades[type].multiplier = upgrade.multiplier + 1;
      }
      
      setUpgrades(newUpgrades);
    }
  };

  const restartGame = () => {
    setScore(0);
    setCustomers([]);
    setSodaCups([]);
    setSplatEffects([]);
    setGameOver(false);
    setSlideSpeed(1200);
    setCustomerSpawnRate(2500);
    setCustomerPatience(5000);
    setMissedSodas(0);
    setCustomersLost(0);
    setUpgrades({
      fasterSlide: { cost: 10, level: 0 },
      moreCustomers: { cost: 25, level: 0 },
      bonusPoints: { cost: 50, level: 0, multiplier: 1 }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-700 overflow-hidden relative">
      {/* Background bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-white opacity-10"
          style={{
            left: `${bubble.left}%`,
            bottom: '-50px',
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animation: `float ${bubble.duration}s ease-in-out forwards`
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          to {
            transform: translateY(-110vh);
            opacity: 0;
          }
        }
        @keyframes slideToTarget {
          from { 
            bottom: 10%;
            transform: translateX(-50%) scale(1);
            opacity: 1;
          }
          to { 
            bottom: 85%;
            transform: translateX(-50%) scale(0.6);
            opacity: 1;
          }
        }
        @keyframes splat {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.8) rotate(180deg); opacity: 0.9; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0) scale(1); }
          25% { transform: translateX(-3px) scale(1.05); }
          75% { transform: translateX(3px) scale(1.05); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl p-12 text-center shadow-2xl border-8 border-white max-w-md">
            <div className="text-8xl mb-4">😡</div>
            <h2 className="text-white text-5xl font-black mb-4">GAME OVER!</h2>
            <p className="text-white text-xl mb-2">{maxCustomersLost} customers left angry!</p>
            <p className="text-yellow-200 text-3xl font-bold mb-2">Final Score: {score}</p>
            <p className="text-white/80 text-sm mb-8">Missed sodas: {missedSodas}</p>
            <button
              onClick={restartGame}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-xl hover:bg-yellow-200 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Try Again! 🔄
            </button>
          </div>
        </div>
      )}

      {/* Score bar */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 px-4 shadow-2xl">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">🥤 North Star Soda Shop</h1>
            <p className="text-blue-200 text-xs">Minneapolis, MN • Fast-paced service!</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black">Score: {score}</div>
            <div className="text-blue-200 text-xs flex items-center justify-end gap-2">
              <span>+{upgrades.bonusPoints.multiplier}/hit</span>
              <span className="text-red-300">• Miss: {missedSodas}</span>
              <span className={`font-bold ${customersLost >= 3 ? 'text-red-400 animate-pulse' : 'text-green-300'}`}>
                • Lives: {maxCustomersLost - customersLost}/{maxCustomersLost}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main game area - First Person View */}
      <div className="max-w-6xl mx-auto px-4 py-2">
        {/* Instructions */}
        <div className="text-center text-white mb-1">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 inline-block">
            <p className="text-xs font-bold">Click anywhere on the counter to slide a soda! 🎯</p>
          </div>
        </div>

        {/* First-person counter view */}
        <div className="relative" style={{ perspective: '1000px' }}>
          {/* The Counter - First Person View */}
          <div
            onClick={handleCounterClick}
            className={`relative bg-gradient-to-b ${colorSchemes[colorScheme].from} ${colorSchemes[colorScheme].to} rounded-t-3xl shadow-2xl cursor-crosshair border-8 ${colorSchemes[colorScheme].border} overflow-hidden transition-colors duration-1000 ${
              gameOver ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{
              height: 'calc(100vh - 280px)',
              minHeight: '400px',
              maxHeight: '700px',
              transform: 'rotateX(45deg)',
              transformOrigin: 'bottom center'
            }}
          >
            {/* Counter texture/wood grain */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-300/20 via-transparent to-orange-900/30"></div>
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(0,0,0,0.1)_20px,rgba(0,0,0,0.1)_22px)]"></div>
            
            {/* Counter edge highlight */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber-950/60 to-transparent"></div>
            
            {/* You are here indicator (bottom of screen = where you are) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs font-bold">
              YOU ARE HERE ↓
            </div>

            {/* Sliding soda cups */}
            {sodaCups.map(cup => (
              <div
                key={cup.id}
                className="absolute text-5xl"
                style={{
                  left: `${cup.targetX}%`,
                  animation: `slideToTarget ${slideSpeed}ms ease-out forwards`,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                }}
              >
                🥤
              </div>
            ))}

            {/* Customers at the far end (top of counter) */}
            <div className="absolute top-12 left-0 right-0 h-32">
              {customers.map(customer => {
                const patience = customer.patience || 0;
                const isAngry = patience > 0.6;
                const isVeryAngry = patience > 0.85;
                const isMad = patience > 0.75; // Invert colors when mad
                
                return (
                  <div
                    key={customer.id}
                    className="absolute transition-all duration-100"
                    style={{
                      left: `${customer.position}%`,
                      transform: 'translateX(-50%)',
                      animation: isVeryAngry ? 'shake 0.15s infinite' : 'none',
                      filter: isMad ? 'invert(1) hue-rotate(180deg)' : 'none'
                    }}
                  >
                    <div className="relative">
                      {/* Customer emoji - scaled up at far end */}
                      <div className="text-8xl" style={{
                        filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))'
                      }}>
                        {customer.emoji}
                      </div>
                      
                      {/* Anger indicator */}
                      {isAngry && (
                        <div className="absolute -top-4 -right-2 text-4xl" style={{animation: 'pulse 0.5s infinite'}}>
                          {isVeryAngry ? '💢' : '😠'}
                        </div>
                      )}
                      
                      {/* Patience bar */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-2 bg-black/40 rounded-full overflow-hidden border border-white/30">
                        <div
                          className={`h-full transition-all ${
                            patience < 0.4 ? 'bg-green-400' : 
                            patience < 0.7 ? 'bg-yellow-400' : 
                            'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(100, patience * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Splat effects */}
              {splatEffects.map(splat => (
                <div
                  key={splat.id}
                  className="absolute text-9xl"
                  style={{
                    left: `${splat.position}%`,
                    transform: 'translateX(-50%)',
                    animation: 'splat 0.5s ease-out forwards',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
                  }}
                >
                  💥
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upgrade buttons - Square layout */}
        <div className="grid grid-cols-3 gap-3 mt-3 max-w-2xl mx-auto">
          {/* Faster Slide */}
          <button
            onClick={() => buyUpgrade('fasterSlide')}
            disabled={score < upgrades.fasterSlide.cost || gameOver}
            className={`aspect-square p-2 rounded-lg shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 border-3 flex flex-col items-center justify-center ${
              score >= upgrades.fasterSlide.cost && !gameOver
                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-200 hover:shadow-yellow-500/50'
                : 'bg-gray-400 border-gray-300 opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="mb-1">
              <Zap size={24} className="text-white" />
            </div>
            <h3 className="text-white font-bold text-xs mb-0.5">Faster Slide</h3>
            <p className="text-white/90 text-[10px] mb-1">Slide faster!</p>
            <div className="text-white font-bold text-sm">
              {upgrades.fasterSlide.cost}
            </div>
            <div className="text-white/80 text-[10px]">Lvl {upgrades.fasterSlide.level}</div>
          </button>

          {/* More Customers */}
          <button
            onClick={() => buyUpgrade('moreCustomers')}
            disabled={score < upgrades.moreCustomers.cost || gameOver}
            className={`aspect-square p-2 rounded-lg shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 border-3 flex flex-col items-center justify-center ${
              score >= upgrades.moreCustomers.cost && !gameOver
                ? 'bg-gradient-to-br from-green-400 to-emerald-600 border-green-200 hover:shadow-green-500/50'
                : 'bg-gray-400 border-gray-300 opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="mb-1">
              <TrendingUp size={24} className="text-white" />
            </div>
            <h3 className="text-white font-bold text-xs mb-0.5">More Customers</h3>
            <p className="text-white/90 text-[10px] mb-1">Busier shop!</p>
            <div className="text-white font-bold text-sm">
              {upgrades.moreCustomers.cost}
            </div>
            <div className="text-white/80 text-[10px]">Lvl {upgrades.moreCustomers.level}</div>
          </button>

          {/* Bonus Points */}
          <button
            onClick={() => buyUpgrade('bonusPoints')}
            disabled={score < upgrades.bonusPoints.cost || gameOver}
            className={`aspect-square p-2 rounded-lg shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 border-3 flex flex-col items-center justify-center ${
              score >= upgrades.bonusPoints.cost && !gameOver
                ? 'bg-gradient-to-br from-purple-400 to-pink-600 border-purple-200 hover:shadow-purple-500/50'
                : 'bg-gray-400 border-gray-300 opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="mb-1">
              <Sparkles size={24} className="text-white" />
            </div>
            <h3 className="text-white font-bold text-xs mb-0.5">Bonus Points</h3>
            <p className="text-white/90 text-[10px] mb-1">More per hit!</p>
            <div className="text-white font-bold text-sm">
              {upgrades.bonusPoints.cost}
            </div>
            <div className="text-white/80 text-[10px]">Lvl {upgrades.bonusPoints.level} • +{upgrades.bonusPoints.multiplier}</div>
          </button>
        </div>
      </div>
    </div>
  );
}