/**
 * Floating Pill Header & Navigation Module
 * Handles scroll background transitions and accessible mobile drawer.
 * Guarantees zero scroll lock issues.
 */

export function initNav() {
  const navbar = document.querySelector('.site-header, .navbar-with-cart, #navbar');
  const navWrap = document.querySelector('.nav-wrap');
  const mobileToggle = document.querySelector('.mobile-menu-toggle, #menuToggle, #mobileMenuToggle');
  const mobileDrawer = document.querySelector('.mobile-drawer, #mobileDrawer');
  const mobileClose = document.querySelector('.mobile-drawer-close, .mobile-close, #mobileClose, #mobileDrawerClose');

  if (!navbar) return;

  function handleScroll() {
    const currentScrollY = window.scrollY;

    // Add solid navy styling when scrolled past 30px
    if (currentScrollY > 30) {
      navbar.classList.add('is-scrolled');
      if (navWrap) navWrap.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
      if (navWrap) navWrap.classList.remove('nav-scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile Drawer Toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileDrawer.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    }

    // Close when clicking any mobile link
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
        mobileDrawer.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active Link Highlighting
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';
  document.querySelectorAll('.menu-item, .mobile-drawer-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.replace(/\/$/, '');
    if (currentPath.endsWith(cleanHref) || (cleanHref === 'index.html' && (currentPath === '' || currentPath.endsWith('/')))) {
      link.classList.add('active');
    }
  });
}
