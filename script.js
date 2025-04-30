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