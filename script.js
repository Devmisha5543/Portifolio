

document.addEventListener('DOMContentLoaded', () => {
  const motionLib = window.Motion || {};
  const animate = typeof motionLib.animate === 'function' ? motionLib.animate : null;
  const spring = typeof motionLib.spring === 'function' ? motionLib.spring : null;
  const inView = typeof motionLib.inView === 'function' ? motionLib.inView : null;

  
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  });

  
  window.addEventListener('scroll', () => {
    const bgText = document.querySelector('.hero-bg-text');
    if (bgText) {
      const scrollY = window.scrollY;
      bgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.22}px))`;
    }
  });


  if (animate) {
    try {
      
      animate(
        'header',
        { y: [-60, 0], opacity: [0, 1] },
        { duration: 0.8, easing: spring ? spring({ stiffness: 120, damping: 16 }) : 'ease-out' }
      );

     
      animate(
        '.availability-badge',
        { opacity: [0, 1], y: [-20, 0] },
        { duration: 0.6, delay: 0.2 }
      );

      animate(
        '.hero-name-title',
        { opacity: [0, 1], y: [30, 0], scale: [0.94, 1] },
        { duration: 1, delay: 0.3, easing: spring ? spring({ stiffness: 100, damping: 15 }) : 'ease-out' }
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
        { duration: 0.7, delay: 0.75, easing: spring ? spring({ stiffness: 110, damping: 14 }) : 'ease-out' }
      );
    } catch (err) {
      console.warn('Motion animation initialization skipped:', err);
    }

    if (inView) {
      try {
        inView('#about', ({ target }) => {
          animate(
            target.querySelectorAll('.about-header h2, .about-header .section-sub'),
            { opacity: [0, 1], y: [40, 0] },
            { duration: 0.7, easing: 'ease-out' }
          );
          animate(
            target.querySelectorAll('.stat-card'),
            { opacity: [0, 1], y: [35, 0], scale: [0.92, 1] },
            { duration: 0.6, delay: 0.15, easing: spring ? spring({ stiffness: 100, damping: 15 }) : 'ease-out' }
          );
          animate(
            target.querySelector('.about-bio-card'),
            { opacity: [0, 1], x: [40, 0] },
            { duration: 0.8, delay: 0.25, easing: spring ? spring({ stiffness: 90, damping: 14 }) : 'ease-out' }
          );
        });

        inView('#skills', ({ target }) => {
          animate(
            target.querySelectorAll('h2, .section-sub'),
            { opacity: [0, 1], y: [35, 0] },
            { duration: 0.6 }
          );
          animate(
            target.querySelectorAll('.skill-card'),
            { opacity: [0, 1], y: [40, 0], scale: [0.9, 1] },
            { duration: 0.6, delay: 0.15, easing: spring ? spring({ stiffness: 110, damping: 14 }) : 'ease-out' }
          );
        });

        inView('#projects', ({ target }) => {
          animate(
            target.querySelectorAll('h2, .section-sub'),
            { opacity: [0, 1], y: [35, 0] },
            { duration: 0.6 }
          );
          animate(
            target.querySelectorAll('.container .glass'),
            { opacity: [0, 1], y: [50, 0], scale: [0.92, 1] },
            { duration: 0.8, delay: 0.2, easing: spring ? spring({ stiffness: 85, damping: 13 }) : 'ease-out' }
          );
        });

        inView('#contact', ({ target }) => {
          animate(
            target.querySelectorAll('h2, .section-sub, .contact-status-banner'),
            { opacity: [0, 1], y: [30, 0] },
            { duration: 0.6 }
          );
          animate(
            target.querySelectorAll('.contact-card-vibe'),
            { opacity: [0, 1], y: [35, 0], scale: [0.92, 1] },
            { duration: 0.6, delay: 0.2, easing: spring ? spring({ stiffness: 100, damping: 15 }) : 'ease-out' }
          );
          animate(
            target.querySelector('.contact-form-card'),
            { opacity: [0, 1], x: [35, 0] },
            { duration: 0.7, delay: 0.3, easing: spring ? spring({ stiffness: 90, damping: 14 }) : 'ease-out' }
          );
        });

        inView('.site-footer', ({ target }) => {
          animate(
            target.querySelectorAll('.footer-cta-banner, .footer-grid'),
            { opacity: [0, 1], y: [35, 0] },
            { duration: 0.8, easing: 'ease-out' }
          );
        });
      } catch (err) {
        console.warn('Scroll reveal animation error:', err);
      }
    }

    document.querySelectorAll('.nav-links a, .btn-nav, .btn-primary-hero, .btn-secondary-hero, .btn-download, .btn-footer-primary, .btn-footer-secondary, .spill, .skill-card, .contact-card-vibe, .back-to-top-btn, .btn-submit-contact').forEach(el => {
      el.addEventListener('pointerenter', () => {
        if (animate) animate(el, { scale: 1.04, y: -4 }, { duration: 0.2 });
      });

      el.addEventListener('pointerleave', () => {
        if (animate) animate(el, { scale: 1, y: 0 }, { duration: 0.2 });
      });
    });
  }

  
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

          if (animate) {
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

  
  const TELEGRAM_BOT_TOKEN = '8958947048:AAF-n7RmH0kSqqeKSSVMNZQnb3LVYhJ4bio'; // e.g. '789123456:AAFx...'
  const TELEGRAM_CHAT_ID = '807045593';     // e.g. '123456789'
  const TARGET_EMAIL = 'wmsm16@gmail.com';

  const contactForm = document.getElementById('contact-form');
  const formToast = document.getElementById('form-toast');

  if (contactForm && formToast) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      formToast.textContent = '⚡ Delivering message...';
      formToast.style.color = 'var(--carbon-black)';

      const nameVal = document.getElementById('contact-name')?.value.trim() || '';
      const emailVal = document.getElementById('contact-email')?.value.trim() || '';
      const messageVal = document.getElementById('contact-message')?.value.trim() || '';

      if (!nameVal || !emailVal || !messageVal) {
        formToast.textContent = '❌ Please fill in all required fields.';
        formToast.style.color = '#ef4444';
        return;
      }

      const promises = [];

      
      if (TELEGRAM_BOT_TOKEN !== 'YOUR_TELEGRAM_BOT_TOKEN' && TELEGRAM_CHAT_ID !== 'YOUR_TELEGRAM_CHAT_ID') {
        const textMsg = `📩 *New Portfolio Contact Message!*\n\n` +
                        `👤 *Name:* ${nameVal}\n` +
                        `📧 *Email:* ${emailVal}\n\n` +
                        `💬 *Message:*\n${messageVal}`;

        const tgPromise = fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: textMsg,
            parse_mode: 'Markdown'
          })
        });
        promises.push(tgPromise);
      }

      
      const emailPayload = {
        name: nameVal,
        email: emailVal,
        message: messageVal,
        _subject: "New Portfolio Message from " + nameVal,
        _template: "table",
        _captcha: "false"
      };

      const emailPromise = fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      });
      promises.push(emailPromise);

      try {
        await Promise.allSettled(promises);
        formToast.textContent = '✅ Message sent successfully! I will get back to you shortly.';
        formToast.style.color = '#10b981';
        if (animate) {
          animate(formToast, { opacity: [0, 1], y: [10, 0] }, { duration: 0.4 });
        }
        contactForm.reset();
      } catch (err) {
        formToast.textContent = '✅ Message sent! Thank you for reaching out.';
        formToast.style.color = '#10b981';
        contactForm.reset();
      }

      setTimeout(() => { formToast.textContent = ''; }, 5000);
    });
  }

  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      if (animate) {
        animate(backToTopBtn, { y: [-8, 0] }, { duration: 0.3 });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

 
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /
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
