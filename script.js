// Small interactions are kept here so the HTML remains easy to edit.
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

// Reveal sections as they enter the screen.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// A restrained 3D shift makes the hero feel responsive without being distracting.
const hero = document.querySelector('.hero');
const orb = document.querySelector('.hero-orb');
const orbit = document.querySelector('.code-orbit');
const glow = document.querySelector('.cursor-glow');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
  hero.addEventListener('pointermove', (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    orb.style.transform = `translate(${x * 25}px, ${y * 25}px)`;
    orbit.style.margin = `${y * 12}px 0 0 ${x * 12}px`;
  });

  window.addEventListener('pointermove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });

  // Light magnetic pull for primary buttons.
  document.querySelectorAll('.magnetic').forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      const box = button.getBoundingClientRect();
      const x = event.clientX - box.left - box.width / 2;
      const y = event.clientY - box.top - box.height / 2;
      button.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });
    button.addEventListener('pointerleave', () => { button.style.transform = ''; });
  });
}

// Keep the footer current automatically.
document.querySelector('#year').textContent = new Date().getFullYear();

// The sample form does not send data yet. Replace this handler with Formspree,
// EmailJS, or a backend endpoint when you want the form to deliver messages.
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Thanks! Connect this form to your preferred email service to receive messages.');
});
