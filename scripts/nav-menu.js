const toggle = document.getElementById('menu-toggle');
const navContent = document.querySelector('.nav-content');

// Toggle main menu - only on mobile
if (toggle) {
  console.log('Hamburger button found, adding click listener');
  toggle.onclick = () => {
    if (window.innerWidth <= 768) {
      navContent.classList.toggle('show');
      console.log('Menu toggled on mobile');
    }
  };
} else {
  console.log('Hamburger button not found');
}

// Close menu when clicking outside - only on mobile
window.onclick = (e) => {
  if (window.innerWidth <= 768 && toggle && navContent && !toggle.contains(e.target) && !navContent.contains(e.target)) {
    navContent.classList.remove('show');
  }
};

// Ensure menu is hidden on mobile initially
if (window.innerWidth <= 768 && navContent) {
  navContent.classList.remove('show');
}

// Close menu button
const closeMenu = document.getElementById('close-menu');
if (closeMenu) {
  closeMenu.onclick = () => {
    if (navContent) {
      navContent.classList.remove('show');
    }
  };
}

// Handle dropdown toggle on mobile (click to show/hide)
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
  const btn = dropdown.querySelector('.dropbtn');
  if (btn) {
    btn.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        // Close other dropdowns first
        dropdowns.forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('open');
          }
        });
        // Toggle this dropdown
        dropdown.classList.toggle('open');
      }
    });
  }
});

// Prevent dropdown links from triggering dropdown toggle
const dropdownLinks = document.querySelectorAll('.dropdown-content a');
dropdownLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // Allow the link to work normally
    e.stopPropagation();
  });
});

// Close dropdowns when clicking outside on mobile
window.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }
});

