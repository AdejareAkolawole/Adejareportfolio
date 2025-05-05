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

document.querySelectorAll('a, button, .blog-post').forEach(elem => {
  elem.addEventListener('mouseenter', () => cursor.classList.add('grow'));
  elem.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
});

// Fetch and Render Blog Posts
const blogGrid = document.getElementById('blogGrid');

fetch('./posts.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(posts => {
    if (posts.length > 0) {
      posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('blog-post');
        postDiv.innerHTML = `
          <img src="${post.image}" alt="${post.title}" class="post-image" onerror="this.src='https://via.placeholder.com/300x200.png?text=Image+Not+Found';">
          <h3>${post.title}</h3>
          <p class="post-date">${post.date}</p>
          <p class="post-category">Category: ${post.category}</p>
          <p>${post.excerpt}</p>
          <a href="posts.html?id=${post.id}">Read More</a>
        `;
        blogGrid.appendChild(postDiv);
      });
    } else {
      blogGrid.innerHTML = '<p>No blog posts available.</p>';
    }
  })
  .catch(error => {
    console.error('Error fetching blog posts:', error);
    blogGrid.innerHTML = '<p>Failed to load blog posts. Check the console for details.</p>';
  });

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate Blog Section
gsap.from("#blog .container > h2", {
  scrollTrigger: {
    trigger: "#blog",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".blog-post", {
  scrollTrigger: {
    trigger: ".blog-grid",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.2,
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