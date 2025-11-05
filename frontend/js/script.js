// Enhanced Wanderly JavaScript - Professional functionality
document.addEventListener('DOMContentLoaded', () => {
  
  // NAVBAR TOGGLE & MOBILE MENU
  const navToggle = document.getElementById('nav-toggle');
  const navbar = document.getElementById('navbar');
  
  if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
      navbar.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !navToggle.contains(e.target)) {
        navbar.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
    
    // Close mobile menu when clicking nav links
    navbar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  // YEAR PLACEHOLDERS
  document.querySelectorAll('[id*="year"]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // DESTINATIONS FILTERING
  const destList = document.getElementById('dest-list');
  const searchInput = document.getElementById('dest-search');
  const regionFilter = document.getElementById('region-filter');
  const typeFilter = document.getElementById('type-filter');
  const searchBtn = document.getElementById('search-btn');

  function filterDestinations() {
    if (!destList) return;
    
    const query = (searchInput?.value || '').toLowerCase();
    const region = regionFilter?.value || 'all';
    const type = typeFilter?.value || 'all';
    
    destList.querySelectorAll('.dest-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      const cardRegion = card.dataset.region;
      const cardType = card.dataset.type;
      
      const matchesQuery = !query || text.includes(query);
      const matchesRegion = region === 'all' || cardRegion === region;
      const matchesType = type === 'all' || cardType === type;
      
      card.style.display = (matchesQuery && matchesRegion && matchesType) ? 'block' : 'none';
    });
  }

  if (searchBtn) searchBtn.addEventListener('click', filterDestinations);
  if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') filterDestinations();
    });
  }
  if (regionFilter) regionFilter.addEventListener('change', filterDestinations);
  if (typeFilter) typeFilter.addEventListener('change', filterDestinations);

  // BOOKING FORM VALIDATION
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('book-name')?.value.trim();
      const email = document.getElementById('book-email')?.value.trim();
      const dest = document.getElementById('book-dest')?.value;
      const checkin = document.getElementById('book-checkin')?.value;
      const checkout = document.getElementById('book-checkout')?.value;
      
      if (!name || !email || !dest || !checkin || !checkout) {
        showMessage('Please fill in all required fields.', 'error');
        return;
      }
      
      if (new Date(checkout) <= new Date(checkin)) {
        showMessage('Check-out date must be after check-in date.', 'error');
        return;
      }
      
      showMessage(`Thank you ${name}! Your booking request for ${dest} has been received. We'll contact you at ${email} within 24 hours.`, 'success');
      bookingForm.reset();
    });
  }

  // CONTACT FORM VALIDATION
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const fname = document.getElementById('contact-fname')?.value.trim();
      const lname = document.getElementById('contact-lname')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();
      
      if (!fname || !email || !message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
      }
      
      showMessage(`Thank you ${fname}! Your message has been sent. We'll respond to ${email} within 24 hours.`, 'success');
      contactForm.reset();
    });
  }

  // AUTHENTICATION FORMS
  const signinForm = document.getElementById('signin-form');
  const signupForm = document.getElementById('signup-form');
  
  if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      
      if (!email || !password) {
        showMessage('Please enter both email and password.', 'error');
        return;
      }
      
      // Simulate login success
      showMessage('Sign in successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = 'profile.html';
      }, 1500);
    });
  }
  
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstName = document.getElementById('firstName').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const terms = document.getElementById('terms').checked;
      
      if (!firstName || !email || !password || !confirmPassword) {
        showMessage('Please fill in all required fields.', 'error');
        return;
      }
      
      if (password !== confirmPassword) {
        showMessage('Passwords do not match.', 'error');
        return;
      }
      
      if (!terms) {
        showMessage('Please accept the Terms & Conditions.', 'error');
        return;
      }
      
      showMessage('Account created successfully! Please sign in.', 'success');
      setTimeout(() => {
        window.location.href = 'signin.html';
      }, 1500);
    });
  }

  // FAQ ACCORDION
  document.querySelectorAll('.acc-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const panel = button.nextElementSibling;
      const isOpen = panel.style.display === 'block';
      
      // Close all panels
      document.querySelectorAll('.acc-panel').forEach(p => {
        p.style.display = 'none';
      });
      
      // Toggle current panel
      panel.style.display = isOpen ? 'none' : 'block';
      
      // Update button appearance
      document.querySelectorAll('.acc-toggle').forEach(btn => {
        btn.style.backgroundColor = '';
      });
      
      if (!isOpen) {
        button.style.backgroundColor = 'rgba(11,118,255,0.05)';
      }
    });
  });

  // GALLERY LIGHTBOX
  const galleryImages = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.close-btn');

  if (lightbox && lightboxImg) {
    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
      }
    });
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  // SMOOTH SCROLLING FOR ANCHOR LINKS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // LOADING ANIMATION FOR FORMS
  function showLoading(button) {
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;
    
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 2000);
  }

  // MESSAGE DISPLAY FUNCTION
  function showMessage(message, type = 'info') {
    // Remove existing messages
    document.querySelectorAll('.temp-message').forEach(msg => msg.remove());
    
    const messageEl = document.createElement('div');
    messageEl.className = `temp-message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      z-index: 1000;
      max-width: 400px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease;
    `;
    
    if (type === 'success') {
      messageEl.style.backgroundColor = '#28a745';
    } else if (type === 'error') {
      messageEl.style.backgroundColor = '#dc3545';
    } else {
      messageEl.style.backgroundColor = '#007bff';
    }
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
      messageEl.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => messageEl.remove(), 300);
    }, 4000);
  }

  // ERROR HANDLING FOR IMAGES
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
    });
  });

  // SCROLL TO TOP BUTTON
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '↑';
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--accent);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(11,118,255,0.3);
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(scrollTopBtn);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// CSS Animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  .scroll-top-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(11,118,255,0.4);
  }
`;
document.head.appendChild(style);