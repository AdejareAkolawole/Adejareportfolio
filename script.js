// Three.js Particle System
const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

// Check if the device is mobile or has low performance
const isMobile = window.innerWidth <= 768;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Adjust particle settings based on device
let particleCount = isMobile ? 400 : 800;
let particleSize = isMobile ? 0.3 : 0.5;
let particleOpacity = isMobile ? 0.6 : 0.8;

if (prefersReducedMotion) {
  particleCount = 200;
  particleSize = 0.2;
  particleOpacity = 0.5;
}

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 50;

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 200;
  velocities[i] = (Math.random() - 0.5) * 0.02;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particlesMaterial = new THREE.PointsMaterial({
  color: 0x00D4FF,
  size: particleSize,
  transparent: true,
  opacity: particleOpacity,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Update particle color based on theme
function updateParticleColor() {
  if (document.body.classList.contains('light-theme')) {
    particlesMaterial.color.setHex(0x00A4FF);
  } else {
    particlesMaterial.color.setHex(0x00D4FF);
  }
}

// Mouse interaction
let mouseX = 0;
let mouseY = 0;

if (!isMobile && !prefersReducedMotion) {
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  if (!prefersReducedMotion) {
    const positions = particlesGeometry.attributes.position.array;
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] += velocities[i] + (isMobile ? 0 : mouseX * 0.01);
      positions[i + 1] += velocities[i + 1] + (isMobile ? 0 : mouseY * 0.01);
      positions[i + 2] += velocities[i + 2];

      if (positions[i] > 100 || positions[i] < -100) velocities[i] *= -1;
      if (positions[i + 1] > 100 || positions[i + 1] < -100) velocities[i + 1] *= -1;
    }
    particlesGeometry.attributes.position.needsUpdate = true;

    particles.rotation.x += 0.001;
    particles.rotation.y += 0.002;
  }

  renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  if (document.body.classList.contains('light-theme')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
  updateParticleColor();
});

// Initial particle color
updateParticleColor();

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(element => {
  observer.observe(element);
});

// Fade-in and slide-in animation for experience items
const experienceItems = document.querySelectorAll('.experience-item');

const experienceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

experienceItems.forEach(item => {
  experienceObserver.observe(item);
});

// Project filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    projectCards.forEach(card => {
      if (filterValue === 'all' || card.classList.contains(filterValue)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });

  button.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      button.click();
    }
  });
});

// Project modal functionality
const projectModal = document.getElementById('project-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTech = document.getElementById('modal-tech');
const modalLink = document.getElementById('modal-link');
const modalClose = document.querySelector('.modal-close');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    modalImage.src = card.getAttribute('data-image');
    modalTitle.textContent = card.getAttribute('data-title');
    modalDescription.textContent = card.getAttribute('data-description');
    modalTech.textContent = card.getAttribute('data-tech');
    modalLink.href = card.getAttribute('data-link');
    projectModal.classList.add('active');
  });
});

modalClose.addEventListener('click', () => {
  projectModal.classList.remove('active');
});

projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) {
    projectModal.classList.remove('active');
  }
});

// Blog posts data (simulating a CMS)
const blogPosts = [
  {
    title: "Intro to Web Development",
    date: "March 1, 2025",
    description: "Learn the basics of building websites.",
    link: "https://example.com/intro-to-web-development"
  },
  {
    title: "Mastering React in 2025",
    date: "March 5, 2025",
    description: "Tips and tricks for building modern web apps with React.",
    link: "https://example.com/mastering-react-2025"
  },
  {
    title: "Scaling Apps with Node.js",
    date: "March 10, 2025",
    description: "Best practices for scaling backend applications.",
    link: "https://example.com/scaling-apps-nodejs"
  },
  {
    title: "The Future of AI in Development",
    date: "March 15, 2025",
    description: "Exploring how AI is transforming software development.",
    link: "https://example.com/future-ai-development"
  }
];

// Render blog posts dynamically with "Read More" links
const blogGrid = document.getElementById('blog-grid');
if (blogGrid) {
  console.log("Blog grid found, rendering blog posts...");
  blogPosts.forEach(post => {
    const blogCard = document.createElement('div');
    blogCard.classList.add('blog-card');
    blogCard.innerHTML = `
      <h3>${post.title}</h3>
      <p>Posted on ${post.date} - ${post.description}</p>
      <a href="${post.link}" target="_blank" class="read-more">Read More</a>
    `;
    blogGrid.appendChild(blogCard);
  });
} else {
  console.error("Blog grid element not found!");
}

// Back to Top button functionality
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Debug log to confirm script is running
console.log("Script loaded successfully!");