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

    // Auto-dismiss after ~5 seconds total duration
    const autoTimer = setTimeout(dismissBoot, 5000);

    // Dismiss with any keypress or click
    const onDismiss = () => {
        clearTimeout(autoTimer);
        dismissBoot();
    };

    document.addEventListener('keydown', onDismiss, { once: true });
    bootScreen.addEventListener('click', onDismiss, { once: true });
});

// Mobile Navigation Toggle with ARIA State Management
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const navToggle = document.getElementById('navToggle');
    if (!navLinks) return;

    const isActive = navLinks.classList.toggle('active');
    if (navToggle) {
        navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    }
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    const navToggle = document.getElementById('navToggle');
    if (!navLinks) return;

    navLinks.classList.remove('active');
    if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
    }
}

// Close mobile nav on escape or click outside
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});

document.addEventListener('click', (e) => {
    const navLinks = document.getElementById('navLinks');
    const navToggle = document.getElementById('navToggle');
    if (navLinks && navLinks.classList.contains('active')) {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            closeMenu();
        }
    }
});

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

