/*
    File: main.js
    Purpose: handles boot screen dismissal, accessible navigation, and smooth interactions
*/

// Boot Screen Logic
document.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.getElementById('bootScreen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!bootScreen) return;

    const dismissBoot = () => {
        if (bootScreen.dataset.dismissed) return;
        bootScreen.dataset.dismissed = 'true';
        bootScreen.classList.add('fade-out');
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 500);
    };

    if (prefersReducedMotion) {
        bootScreen.style.display = 'none';
        return;
    }

    // Auto-dismiss: ~3.5s on mobile screens up to 767px, ~5s on desktop/tablet
    const isMobile = window.innerWidth <= 767;
    const autoTimer = setTimeout(dismissBoot, isMobile ? 3500 : 5000);

    // Dismiss with any keypress or click
    const onDismiss = () => {
        clearTimeout(autoTimer);
        dismissBoot();
    };

    document.addEventListener('keydown', onDismiss, { once: true });
    bootScreen.addEventListener('click', onDismiss, { once: true });
});

// Mobile Navigation Toggle with ARIA State Management and Background Scroll Lock
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const navToggle = document.getElementById('navToggle');
    if (!navLinks) return;

    const isActive = navLinks.classList.toggle('active');
    if (navToggle) {
        navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    }
    if (isActive) {
        document.body.classList.add('menu-open');
    } else {
        document.body.classList.remove('menu-open');
    }
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    const navToggle = document.getElementById('navToggle');
    if (!navLinks) return;

    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
    if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
    }
}

// Connect mobile navigation toggle button
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');

    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }
});

// Close mobile nav on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});

// Close mobile nav on click outside
document.addEventListener('click', (e) => {
    const navLinks = document.getElementById('navLinks');
    const navToggle = document.getElementById('navToggle');
    if (navLinks && navLinks.classList.contains('active')) {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            closeMenu();
        }
    }
});

// Reset menu state on viewport resize above mobile breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
}, { passive: true });

// Smooth Scrolling with Reduced-Motion Awareness
document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    closeMenu();
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: prefersReducedMotion ? 'auto' : 'smooth'
                    });
                }
            }
        });
    });
});


