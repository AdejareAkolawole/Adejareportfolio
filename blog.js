// Theme Toggle with Local Storage
const themeToggle = document.createElement('div');
themeToggle.classList.add('theme-toggle');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeToggle);

const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.body.classList.add(savedTheme);

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const icon = themeToggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
  const theme = document.body.classList.contains('light-mode') ? 'light-mode' : '';
  localStorage.setItem('theme', theme);
});

// Custom Cursor with Trail
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';

  const trail = document.createElement('div');
  trail.classList.add('trail');
  trail.style.left = e.pageX + 'px';
  trail.style.top = e.pageY + 'px';
  document.body.appendChild(trail);

  setTimeout(() => trail.remove(), 800);
});

document.querySelectorAll('a, button, .blog-post, .skill-item, .cta-button').forEach(elem => {
  elem.addEventListener('mouseenter', () => cursor.classList.add('grow'));
  elem.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
});

// Fetch and Render Blog Posts (unchanged)
const blogGrid = document.getElementById('blogGrid');

fetch('./posts.json')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
    return response.json();
  })
  .then(posts => {
    if (posts.length > 0) {
      posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('blog-post');
        postDiv.innerHTML = `
          <img src="${post.image}" alt="${post.title}" class="post-image" loading="lazy" onerror="this.src='https://via.placeholder.com/300x200.png?text=Image+Not+Found';">
          <h3>${post.title}</h3>
          <p class="post-date">${post.date}</p>
          <p class="post-category">Category: ${post.category}</p>
          <p>${post.excerpt}</p>
          <a href="post.html?id=${post.id}">Read More</a>
        `;
        blogGrid.appendChild(postDiv);
      });
    } else blogGrid.innerHTML = '<p>No blog posts available.</p>';
  })
  .catch(error => {
    console.error('Error fetching blog posts:', error);
    blogGrid.innerHTML = '<p>Failed to load blog posts. Check the console for details.</p>';
  });

// Skills Animation
gsap.from(".skill-item", {
  scrollTrigger: {
    trigger: "#skills",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});

// Testimonials Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
if (slides.length) {
  setInterval(() => {
    slides.forEach(slide => slide.style.display = 'none');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.display = 'block';
  }, 5000);
  slides[currentSlide].style.display = 'block';
}

// Contact Form with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  emailjs.init('YOUR_EMAILJS_USER_ID'); // Replace with your EmailJS User ID
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formStatus = document.getElementById('formStatus');
    formStatus.innerHTML = '<p>Sending...</p>';
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
      .then(() => {
        formStatus.innerHTML = '<p>Message sent successfully!</p>';
        contactForm.reset();
        setTimeout(() => formStatus.innerHTML = '', 3000);
      }, (error) => {
        formStatus.innerHTML = `<p>Failed to send: ${error.text}</p>`;
        setTimeout(() => formStatus.innerHTML = '', 3000);
      });
  });
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Parallax Hero
gsap.to(".parallax-bg", {
  scrollTrigger: {
    trigger: "#home",
    start: "top top",
    scrub: true
  },
  y: "20%",
  ease: "none"
});

gsap.from(".hero-container h1", {
  scrollTrigger: {
    trigger: "#home",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".hero-container .tagline, .cta-button", {
  scrollTrigger: {
    trigger: "#home",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 30,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});

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

gsap.from("#contact .container > h2", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out"
});

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