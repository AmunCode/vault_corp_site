/* =============================================
   Vault Retail Group — Main JavaScript
   ============================================= */

(function () {
  'use strict';

  /* ---- Elements ---- */
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.getElementById('nav-links');
  const navToggle = document.getElementById('nav-toggle');
  const links     = navLinks.querySelectorAll('a[data-section]');
  const sections  = Array.from(document.querySelectorAll('.site-section'));
  const filterTabs = document.querySelectorAll('.filter-tab');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  /* ---- Navbar scroll style ---- */
  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
    revealElements();
  }

  /* ---- Active nav link (scroll-spy) ---- */
  function updateActiveLink() {
    const scrollMid = window.scrollY + window.innerHeight / 3;
    let current = '';

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollMid) {
        current = section.id;
      }
    });

    links.forEach(function (link) {
      if (link.dataset.section === current) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* ---- Smooth scroll on nav click ---- */
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.getElementById(link.dataset.section);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      // Close mobile menu if open
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  /* ---- Mobile hamburger toggle ---- */
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  /* ---- Scroll-reveal ---- */
  function revealElements() {
    const revealItems = document.querySelectorAll('.reveal:not(.visible)');
    revealItems.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  /* ---- Inventory filter tabs ---- */
  filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      filterTabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.dataset.filter;
      const cards = document.querySelectorAll('.inventory-card');
      cards.forEach(function (card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ---- Contact form submission ---- */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Simulate submission
      const btn = contactForm.querySelector('.form-submit');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(function () {
        contactForm.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
        if (formSuccess) {
          formSuccess.style.display = 'block';
          setTimeout(function () {
            formSuccess.style.display = 'none';
          }, 5000);
        }
      }, 1200);
    });
  }

  /* ---- Init ---- */
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load
  revealElements();
}());
