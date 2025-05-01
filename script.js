// Theme Toggle
const themeToggle = document.createElement('div');
themeToggle.classList.add('theme-toggle');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const icon = themeToggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// Custom Cursor with Trail
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';

  // Create trail particle
  const trail = document.createElement('div');
  trail.classList.add('trail');
  trail.style.left = e.pageX + 'px';
  trail.style.top = e.pageY + 'px';
  document.body.appendChild(trail);

  // Remove trail particle after animation
  setTimeout(() => {
    trail.remove();
  }, 800);
});

document.querySelectorAll('a, button, .project-card').forEach(elem => {
  elem.addEventListener('mouseenter', () => cursor.classList.add('grow'));
  elem.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
});

// Typewriter Effect for Hero Section Heading
const heroHeading = document.querySelector('#home h1');
const text = heroHeading.textContent;
heroHeading.textContent = '';
let i = 0;

function typeWriter() {
  if (i < text.length) {
    heroHeading.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();

// Parallax Scrolling for Backgrounds
document.querySelectorAll('.parallax-bg').forEach(bg => {
  gsap.to(bg, {
    scrollTrigger: {
      trigger: bg.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    },
    y: 200,
    ease: "none"
  });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
  submissions.push({ name, email, message });
  localStorage.setItem('submissions', JSON.stringify(submissions));
  alert('Message sent! Stored locally.');
  contactForm.reset();
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate Hero Section (excluding the profile image)
gsap.from("#home .container > *:not(.profile-image-wrapper)", {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.3,
  ease: "power3.out",
  delay: 1
});

// Animate About Section
gsap.from("#about .container > *:not(.timeline, .about-images)", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.3,
  ease: "power3.out"
});

// Animate Timeline Items
gsap.from(".timeline-item", {
  scrollTrigger: {
    trigger: ".timeline",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  x: (index) => index % 2 === 0 ? -50 : 50,
  duration: 1,
  stagger: 0.3,
  ease: "power3.out"
});

// Animate About Images with a bounce effect
gsap.from(".about-images img", {
  scrollTrigger: {
    trigger: ".about-images",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  scale: 0.8,
  duration: 1,
  stagger: 0.2,
  ease: "elastic.out(1, 0.5)"
});

// Animate Projects Section
gsap.from("#projects .container > h2", {
  scrollTrigger: {
    trigger: "#projects",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out"
});

// Animate Project Cards with a staggered effect
gsap.from(".project-card", {
  scrollTrigger: {
    trigger: ".projects-grid",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});

// Animate Contact Section
gsap.from("#contact .container > *", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.3,
  ease: "power3.out"
});

// Animate Footer
gsap.from("footer .container > *", {
  scrollTrigger: {
    trigger: "footer",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 30,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});