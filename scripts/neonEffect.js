// Neon 3D Tubes Effect - Full Page
// Loads dynamically when user discovers the retro theme
//
// Tubes Cursor Effect by Kevin Levron
// Source: https://freefrontend.com/code/neon-3d-tubes-cursor-trail-2026-02-05/
// Licence CC BY-NC-SA 4.0
// Attribution — You must give appropriate credit.
// Non Commercial — You may not use the material for commercial purposes.
// https://creativecommons.org/licenses/by-nc-sa/4.0/

let effectActive = false;
let tubesApp = null;

async function initNeonEffect() {
  if (effectActive) return;
  
  console.log('Initializing neon effect...');

  try {
    // Create canvas element for the effect
    const canvas = document.createElement('canvas');
    canvas.id = 'neon-tubes-canvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: -1;
    `;
    
    // Insert canvas into body
    document.body.appendChild(canvas);
    
    // Allow scrolling on touch devices
    document.body.style.touchAction = 'pan-y pan-x';
    canvas.style.touchAction = 'none';

    // Load Three.js
    if (!window.THREE) {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
    }

    // Import TubesCursor as ES module (default export)
    console.log('Loading TubesCursor module...');
    const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
    const TubesCursor = module.default;
    console.log('TubesCursor loaded:', typeof TubesCursor);

    // Initialize the effect
    console.log('Creating TubesCursor instance...');
    tubesApp = TubesCursor(canvas, {
      tubes: {
        colors: ["#ff6b35", "#f7931e", "#fbb040"], // Orange theme matching the site
        lights: {
          intensity: 200,
          colors: ["#ff6b35", "#f7931e", "#fbb040", "#ff8c42"]
        }
      }
    });

    effectActive = true;
    console.log('Neon effect activated successfully!');
    
    // Add frosted glass class to body
    document.documentElement.classList.add('neon-active');
    
    // Show activation message
    showNeonMessage();
    
  } catch (error) {
    console.error('Failed to initialize neon effect:', error);
    console.error(error.stack);
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

function showNeonMessage() {
  const msg = document.createElement('div');
  msg.textContent = '✨ NEON EFFECT UNLOCKED ✨';
  msg.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: 2px solid #fbb040;
    padding: 15px 25px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 16px;
    font-weight: bold;
    z-index: 10000;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 107, 53, 0.4);
    animation: slideIn 0.5s ease-out;
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(msg);
  setTimeout(() => {
    msg.style.transition = 'opacity 0.5s, transform 0.5s';
    msg.style.opacity = '0';
    msg.style.transform = 'translateX(400px)';
    setTimeout(() => msg.remove(), 500);
  }, 3000);
}

// Auto-initialize if effect should be active
if (typeof window !== 'undefined') {
  console.log('Neon effect script loaded');
  
  // Don't check on page load - only activate via event
  // The effect should only trigger when leaving retro mode
  
  // Listen for activation event (triggered when leaving retro mode)
  window.addEventListener('activateNeonEffect', () => {
    console.log('Neon effect activation event received');
    setTimeout(() => initNeonEffect(), 500);
  });
}
