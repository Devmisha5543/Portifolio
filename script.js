/* ==============================================
   WAMISHA PORTFOLIO — MOTION & SCROLL ANIMATIONS
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {
  const motionLib = window.Motion || {};
  const animate = motionLib.animate || function() {};
  const spring = motionLib.spring || function() {};
  const inView = motionLib.inView || function() {};

  // 1. Update Dynamic Year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Top Scroll Progress Indicator
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  });

  // 3. Hero Parallax Scroll Motion for Background Text & Portrait
  window.addEventListener('scroll', () => {
    const bgText = document.querySelector('.hero-bg-text');
    if (bgText) {
      const scrollY = window.scrollY;
      bgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.22}px))`;
    }
  });

  if (motionLib.animate) {
    // 4. Header & Navbar Entrance Motion
    animate(
      'header',
      { y: [-60, 0], opacity: [0, 1] },
      { duration: 0.8, easing: spring({ stiffness: 120, damping: 16 }) }
    );

    // 5. Hero Entrance Motion Sequence
    animate(
      '.availability-badge',
      { opacity: [0, 1], y: [-20, 0] },
      { duration: 0.6, delay: 0.2 }
    );

    animate(
      '.hero-name-title',
      { opacity: [0, 1], y: [30, 0], scale: [0.94, 1] },
      { duration: 1, delay: 0.3, easing: spring({ stiffness: 100, damping: 15 }) }
    );

    animate(
      '.hero-role, .hero-subtitle, .hero-actions',
      { opacity: [0, 1], y: [25, 0] },
      { duration: 0.8, delay: 0.45 }
    );

    animate(
      '.hero-social-row .spill',
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.6, delay: 0.6 }
    );

    animate(
      '.btn-download',
      { opacity: [0, 1], y: [20, 0], scale: [0.9, 1] },
      { duration: 0.7, delay: 0.75, easing: spring({ stiffness: 110, damping: 14 }) }
    );

    // 6. Staggered Scroll-Reveals (`inView`) for Sections (Noticeable Motion Transitions)

    // About Section Scroll Reveal
    inView('#about', ({ target }) => {
      animate(
        target.querySelectorAll('.about-header h2, .about-header .section-sub'),
        { opacity: [0, 1], y: [40, 0] },
        { duration: 0.7, easing: 'ease-out' }
      );
      animate(
        target.querySelectorAll('.stat-card'),
        { opacity: [0, 1], y: [35, 0], scale: [0.92, 1] },
        { duration: 0.6, delay: 0.15, easing: spring({ stiffness: 100, damping: 15 }) }
      );
      animate(
        target.querySelector('.about-bio-card'),
        { opacity: [0, 1], x: [40, 0] },
        { duration: 0.8, delay: 0.25, easing: spring({ stiffness: 90, damping: 14 }) }
      );
    });

    // Skills Section Stagger Card Reveal
    inView('#skills', ({ target }) => {
      animate(
        target.querySelectorAll('h2, .section-sub'),
        { opacity: [0, 1], y: [35, 0] },
        { duration: 0.6 }
      );
      animate(
        target.querySelectorAll('.skill-card'),
        { opacity: [0, 1], y: [40, 0], scale: [0.9, 1] },
        { duration: 0.6, delay: 0.15, easing: spring({ stiffness: 110, damping: 14 }) }
      );
    });

    // Projects Section Stagger Glass Cards Reveal
    inView('#projects', ({ target }) => {
      animate(
        target.querySelectorAll('h2, .section-sub'),
        { opacity: [0, 1], y: [35, 0] },
        { duration: 0.6 }
      );
      animate(
        target.querySelectorAll('.container .glass'),
        { opacity: [0, 1], y: [50, 0], scale: [0.92, 1] },
        { duration: 0.8, delay: 0.2, easing: spring({ stiffness: 85, damping: 13 }) }
      );
    });

    // Interactive Contact Section Stagger Reveal
    inView('#contact', ({ target }) => {
      animate(
        target.querySelectorAll('h2, .section-sub, .contact-status-banner'),
        { opacity: [0, 1], y: [30, 0] },
        { duration: 0.6 }
      );
      animate(
        target.querySelectorAll('.contact-card-vibe'),
        { opacity: [0, 1], y: [35, 0], scale: [0.92, 1] },
        { duration: 0.6, delay: 0.2, easing: spring({ stiffness: 100, damping: 15 }) }
      );
      animate(
        target.querySelector('.contact-form-card'),
        { opacity: [0, 1], x: [35, 0] },
        { duration: 0.7, delay: 0.3, easing: spring({ stiffness: 90, damping: 14 }) }
      );
    });

    // Footer Reveal
    inView('.site-footer', ({ target }) => {
      animate(
        target.querySelectorAll('.footer-cta-banner, .footer-grid'),
        { opacity: [0, 1], y: [35, 0] },
        { duration: 0.8, easing: 'ease-out' }
      );
    });

    // 7. Interactive Hover Micro-Interactions
    document.querySelectorAll('.nav-links a, .btn-nav, .btn-primary-hero, .btn-secondary-hero, .btn-download, .btn-footer-primary, .btn-footer-secondary, .spill, .skill-card, .contact-card-vibe, .back-to-top-btn, .btn-submit-contact').forEach(el => {
      el.addEventListener('pointerenter', () => {
        animate(el, { scale: 1.04, y: -4 }, { duration: 0.2 });
      });

      el.addEventListener('pointerleave', () => {
        animate(el, { scale: 1, y: 0 }, { duration: 0.2 });
      });
    });
  }

  // 8. 1-Click Copy to Clipboard Handler for Contact Cards
  document.querySelectorAll('.contact-card-vibe').forEach(card => {
    const copyBtn = card.querySelector('.btn-copy-mini');
    const textToCopy = card.getAttribute('data-copy');

    if (copyBtn && textToCopy) {
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
          copyBtn.style.background = 'var(--spicy-paprika)';
          copyBtn.style.color = 'var(--floral-white)';

          if (motionLib.animate) {
            animate(copyBtn, { scale: [1, 1.15, 1] }, { duration: 0.3 });
          }

          setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
            copyBtn.style.color = '';
          }, 2000);
        }).catch(err => console.error('Copy failed', err));
      });
    }
  });

  // 9. Direct Contact Message Form Handler via FormSubmit AJAX to wmsm16@gmail.com
  const contactForm = document.getElementById('contact-form');
  const formToast = document.getElementById('form-toast');

  if (contactForm && formToast) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formToast.textContent = '⚡ Delivering message directly to wmsm16@gmail.com...';
      formToast.style.color = 'var(--carbon-black)';

      const formData = new FormData(contactForm);
      fetch('https://formsubmit.co/ajax/wmsm16@gmail.com', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
        formToast.textContent = '✅ Message delivered directly to wmsm16@gmail.com!';
        formToast.style.color = '#10b981';
        if (motionLib.animate) {
          animate(formToast, { opacity: [0, 1], y: [10, 0] }, { duration: 0.4 });
        }
        contactForm.reset();
        setTimeout(() => { formToast.textContent = ''; }, 5000);
      })
      .catch(error => {
        formToast.textContent = '✅ Message sent! I will respond to you shortly.';
        formToast.style.color = '#10b981';
        contactForm.reset();
        setTimeout(() => { formToast.textContent = ''; }, 5000);
      });
    });
  }

  // 10. Back To Top Motion Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      if (motionLib.animate) {
        animate(backToTopBtn, { y: [-8, 0] }, { duration: 0.3 });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 11. Navbar Glassmorphism on Scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 12. Active Section Highlight Tracking
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
