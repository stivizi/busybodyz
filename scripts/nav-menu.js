const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const dropdown = document.querySelector('.dropdown');
const servicesLink = dropdown.querySelector('a');

// Toggle main menu - only on mobile
toggle.onclick = () => {
  if (window.innerWidth <= 768) {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }
};

// Toggle dropdown on mobile
servicesLink.addEventListener('click', function(e) {
  // Only handle click for mobile view
  if (window.innerWidth <= 768) {
    e.preventDefault(); // Prevent navigation on mobile
    dropdown.classList.toggle('active');
  }
});

// Close menu when clicking outside - only on mobile
window.onclick = (e) => {
  if (window.innerWidth <= 768 && !toggle.contains(e.target) && !menu.contains(e.target)) {
    menu.style.display = 'none';

    // Also close dropdown if clicking outside
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  }
};

// Ensure menu is visible on desktop
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    menu.style.display = 'flex';
  } else {
    menu.style.display = 'none';
  }
});

// Initialize menu display based on screen size
if (window.innerWidth > 768) {
  menu.style.display = 'flex';
} else {
  menu.style.display = 'none';
}
