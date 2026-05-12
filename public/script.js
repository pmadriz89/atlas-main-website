const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('[data-nav-links]');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name') || '';
    const org = data.get('organization') || '';
    const email = data.get('email') || '';
    const service = data.get('service') || '';
    const message = data.get('message') || '';

    const body = [
      `Name: ${name}`,
      `Organization: ${org}`,
      `Email: ${email}`,
      `Service Interest: ${service}`,
      '',
      'Message:',
      message
    ].join('\n');

    const subject = encodeURIComponent(`Atlas Service Group Consultation - ${service}`);
    const mailBody = encodeURIComponent(body);
    window.location.href = `mailto:admin@atlas-sg.com?subject=${subject}&body=${mailBody}`;
  });
}
