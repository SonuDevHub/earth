/**
 * Campaign Slider & Carousel Module
 * Handles arrow navigation, touch/mouse dragging for campaigns.
 */

export function initSlider() {
  const slider = document.querySelector('.campaign-slider, .campaigns-slider-track');
  if (!slider) return;

  const prevBtn = document.querySelector('.campaign-left, .slider-prev-btn');
  const nextBtn = document.querySelector('.campaign-right, .slider-next-btn');
  const slideList = slider.querySelector('.campaign-slider-list, .campaigns-track');

  if (prevBtn && slideList) {
    prevBtn.addEventListener('click', () => {
      slideList.scrollBy({ left: -380, behavior: 'smooth' });
    });
  }

  if (nextBtn && slideList) {
    nextBtn.addEventListener('click', () => {
      slideList.scrollBy({ left: 380, behavior: 'smooth' });
    });
  }
}
