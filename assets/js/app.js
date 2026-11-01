/**
 * EARTHDAY.ORG Core Application
 * Orchestrates Native Smooth Navigation, GSAP ScrollTrigger,
 * Three.js 3D Interactive Earth, and UI Component Modules.
 *
 * SCROLL RELIABILITY GUARANTEE:
 * - Native window scrolling with zero scrolljacking or wheel event trapping.
 * - Lenis is NOT used (reference design hasLenis: false).
 */

import { initNav } from './modules/nav.js';
import { initAnimations } from './modules/animations.js';
import { initSlider } from './modules/slider.js';
import { initDonationWidget } from './modules/donate.js';
import { EarthGlobe } from './modules/earth.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Floating Navigation & Drawer
  initNav();

  // 2. Initialize GSAP ScrollTrigger Motion Reveals
  initAnimations();

  // 3. Initialize Interactive 3D Earth Globe (Section 7 Campaign Hub & Earth Hub page)
  if (document.getElementById('earth-canvas-container')) {
    new EarthGlobe({
      containerId: 'earth-canvas-container',
      isMini: false
    });
  }

  // 4. Initialize Mini Ambient Globe in Impact Section if container exists
  if (document.getElementById('impact-earth-canvas')) {
    new EarthGlobe({
      containerId: 'impact-earth-canvas',
      isMini: true
    });
  }

  // 5. Initialize Campaign Slider
  initSlider();

  // 6. Initialize Donation Widget
  initDonationWidget();

  // 7. Initialize FAQs Accordion
  initFaqAccordion();

  console.log('EARTHDAY.ORG Application Initialized.');
});

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
