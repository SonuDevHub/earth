/**
 * Donation Calculator & Widget Module
 * Manages frequency selection (Once / Monthly), tier presets, and custom input.
 */

export function initDonationWidget() {
  const widget = document.querySelector('.donation-widget');
  if (!widget) return;

  const freqBtns = widget.querySelectorAll('.freq-btn');
  const tierBtns = widget.querySelectorAll('.tier-btn');
  const customInput = widget.querySelector('.custom-amount-input');
  const submitBtn = widget.querySelector('.btn-donate-submit');
  const submitText = widget.querySelector('.submit-amount-text');

  let currentFrequency = 'Once';
  let currentAmount = 50;

  function updateDisplay() {
    if (submitText) {
      submitText.textContent = `$${currentAmount}${currentFrequency === 'Monthly' ? ' / MONTH' : ''}`;
    }
  }

  freqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      freqBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentFrequency = btn.getAttribute('data-freq') || 'Once';
      updateDisplay();
    });
  });

  tierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tierBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const val = parseInt(btn.getAttribute('data-amount') || '50', 10);
      currentAmount = val;
      if (customInput) customInput.value = '';
      updateDisplay();
    });
  });

  if (customInput) {
    customInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value.replace(/\D/g, ''), 10);
      if (!isNaN(val) && val > 0) {
        tierBtns.forEach(b => b.classList.remove('is-active'));
        currentAmount = val;
        updateDisplay();
      }
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Redirect to official Earth Day virtuous donation portal
      const url = `https://earthday.givevirtuous.org/donate/canopytreeproject?amount=${currentAmount}&frequency=${currentFrequency.toLowerCase()}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  updateDisplay();
}

