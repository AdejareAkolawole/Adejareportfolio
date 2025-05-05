// Initialize EmailJS with the public key
emailjs.init('Gtq_VYBePn5z2g2cg');

// Theme Toggle with Local Storage
const themeToggle = document.createElement('div');
themeToggle.classList.add('theme-toggle');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeToggle);

// Check local storage for theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light-mode') {
  document.body.classList.add('light-mode');
  themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const icon = themeToggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
  // Save theme preference to local storage
  if (document.body.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light-mode');
  } else {
    localStorage.setItem('theme', 'dark-mode');
  }
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

document.querySelectorAll('a, button, .project-card, .skill-item').forEach(elem => {
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

// Contact Form Submission with EmailJS
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formStatus.textContent = 'Sending...';
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // EmailJS submission
  emailjs.send('service_va12vm7', 'template_sa4fvxr', {
    from_name: name,
    from_email: email,
    message: message
  })
  .then((response) => {
    formStatus.textContent = 'Message sent successfully!';
    formStatus.style.color = '#FFD700';
    contactForm.reset();

    // Store submission locally as a fallback
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    submissions.push({ name, email, message, timestamp: new Date().toISOString() });
    localStorage.setItem('submissions', JSON.stringify(submissions));
  }, (error) => {
    formStatus.textContent = 'Failed to send message. Please try again.';
    formStatus.style.color = '#FF4500';

    // Store submission locally even if EmailJS fails
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    submissions.push({ name, email, message, timestamp: new Date().toISOString(), status: 'failed' });
    localStorage.setItem('submissions', JSON.stringify(submissions));
  });
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

// Animate Skills Section
gsap.from("#skills .container > h2", {
  scrollTrigger: {
    trigger: "#skills",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out"
});

// Animate Skills Progress Bars
gsap.from(".skill-item", {
  scrollTrigger: {
    trigger: ".skills-grid",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 30,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  onStart: () => {
    // Animate progress bars when the skills section is in view
    document.querySelectorAll('.progress').forEach(progress => {
      const width = progress.getAttribute('data-progress');
      gsap.to(progress, {
        width: `${width}%`,
        duration: 1.5,
        ease: "power3.out"
      });
    });
  }
});

// Animate Testimonials Section
gsap.from("#testimonials .container > h2", {
  scrollTrigger: {
    trigger: "#testimonials",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out"
});

// Animate Testimonial Slides
gsap.from(".testimonial-slide", {
  scrollTrigger: {
    trigger: ".testimonial-carousel",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 30,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});

// Testimonials Carousel
const slides = document.querySelectorAll('.testimonial-slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Initial slide
showSlide(currentSlide);
// Auto-scroll every 5 seconds
setInterval(nextSlide, 5000);

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