/**
 * GSAP Motion & ScrollTrigger Animations Module
 * Replicates the reference's entrance reveals, counters, card entrance, and hover dynamics.
 */

export function initAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    console.log('Reduced motion preferred: skipping GSAP scroll animations.');
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (!gsap || !ScrollTrigger) {
    console.warn('GSAP or ScrollTrigger not detected. Running fallback CSS reveals.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero Load Sequence
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Video background gentle reveal
    heroTl.fromTo('.hero-video-bg',
      { scale: 1.05, opacity: 0.3 },
      { scale: 1.0, opacity: 1, duration: 1.6, ease: 'power3.out' }
    );

    // Display Headline
    const heroHeading = heroSection.querySelector('.h1-left');
    if (heroHeading) {
      heroTl.fromTo(heroHeading,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1 },
        '-=1.2'
      );
    }

    // Lead text & buttons
    heroTl.fromTo('.hero-text, .hero-actions, .hero-right-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
      '-=0.7'
    );
  }

  // 2. Vision Cards Staggered Reveal
  const visionBottom = document.querySelector('.vision-bottom');
  if (visionBottom) {
    gsap.fromTo(visionBottom.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: visionBottom,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // 3. Section Titles & Headings
  document.querySelectorAll('.about-heading, .initiatives-heading, .featured-heading, .campaign-title, .cta-heading, .faq-heading').forEach(el => {
    gsap.fromTo(el,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // 4. Initiatives Cards 2x2 Grid Reveal
  const initiativesGrid = document.querySelector('.initiatives-items');
  if (initiativesGrid) {
    gsap.fromTo('.initiatives-card',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: initiativesGrid,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // 5. Impact Numbers Count-Up Animation
  document.querySelectorAll('.number .h2-left').forEach(counter => {
    const rawText = counter.textContent.trim();
    const match = rawText.match(/(\d+)(.*)/);
    if (!match) return;

    const targetNum = parseInt(match[1], 10);
    const suffix = match[2];

    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: targetNum,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = Math.floor(obj.val).toLocaleString() + suffix;
          }
        });
      }
    });
  });

  // 6. Featured Project List Rows
  document.querySelectorAll('.featured-listing').forEach(card => {
    gsap.fromTo(card,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // 7. Team Cards
  const teamContent = document.querySelector('.team-content');
  if (teamContent) {
    gsap.fromTo('.team-card',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: teamContent,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
}
