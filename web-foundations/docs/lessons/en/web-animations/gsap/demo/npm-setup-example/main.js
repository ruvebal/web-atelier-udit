// Import GSAP core
import { gsap } from 'gsap';

// Import plugins you need
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// Basic Animations
// ============================================

// Animate boxes on page load
gsap.from('.box', {
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: 'back.out(1.7)'
});

// Hover effect with GSAP (smoother than CSS)
document.querySelectorAll('.box').forEach(box => {
  box.addEventListener('mouseenter', () => {
    gsap.to(box, {
      scale: 1.1,
      rotation: 5,
      duration: 0.3,
      ease: 'back.out(2)'
    });
  });

  box.addEventListener('mouseleave', () => {
    gsap.to(box, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});

// ============================================
// ScrollTrigger Animations
// ============================================

// Fade in scroll card
gsap.from('.scroll-card', {
  y: 100,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.scroll-card',
    start: 'top 80%',
    end: 'top 20%',
    toggleActions: 'play none none reverse',
    markers: false // Set to true for debugging
  }
});

// Create a timeline for complex sequences
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.scroll-section',
    start: 'top center',
    end: 'bottom center',
    scrub: 1
  }
});

tl.to('.scroll-card h2', { x: 100, duration: 1 })
  .to('.scroll-card p', { x: -100, duration: 1 }, '-=0.5');

// ============================================
// Accessibility
// ============================================

// Respect prefers-reduced-motion
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(100); // Make animations instant
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

// ============================================
// Console log for debugging
// ============================================

console.log('✅ GSAP loaded via npm!');
console.log('🎯 ScrollTrigger registered!');
console.log('📦 Bundle size optimized with tree-shaking!');

