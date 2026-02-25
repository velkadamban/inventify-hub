import './style.css';

document.addEventListener('DOMContentLoaded', () => {

    // 1. Dynamic copyright year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();


    // 2. Theme Toggle Logic
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');

    // Check local storage or system preference to set initial icon
    if (document.body.classList.contains('light-theme')) {
        themeIcon.textContent = '☀'; // Sun
    } else {
        themeIcon.textContent = '☾'; // Moon
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');

        if (isLight) {
            localStorage.setItem('inventify-theme', 'light');
            themeIcon.textContent = '☀';
            themeIcon.style.color = '#ff9900';
        } else {
            localStorage.setItem('inventify-theme', 'dark');
            themeIcon.textContent = '☾';
            themeIcon.style.color = '';
        }
    });


    // 3. Mobile Navigation Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mainNav.classList.contains('menu-open');
            if (isOpen) {
                mainNav.classList.remove('menu-open');
                mobileMenuBtn.innerHTML = '☰';
                document.body.style.overflow = ''; // Restore scrolling
            } else {
                mainNav.classList.add('menu-open');
                mobileMenuBtn.innerHTML = '✕';
                document.body.style.overflow = 'hidden'; // Stop scrolling behind menu
            }
        });

        // Close menu when a link is clicked
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('menu-open')) {
                    mainNav.classList.remove('menu-open');
                    mobileMenuBtn.innerHTML = '☰';
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // 4. Custom Elegant Cursor Logic
    const cursorRing = document.getElementById('cursor-ring');
    const cursorDot = document.getElementById('cursor-dot');

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        // For smooth lerp interpolation
        let ringX = mouseX;
        let ringY = mouseY;
        let dotX = mouseX;
        let dotY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Loop for cursor
        function renderCursor() {
            ringX += (mouseX - ringX) * 0.1;
            ringY += (mouseY - ringY) * 0.1;

            dotX += (mouseX - dotX) * 0.3; // Dot is faster and tighter
            dotY += (mouseY - dotY) * 0.3;

            if (cursorRing) {
                cursorRing.style.left = `${ringX}px`;
                cursorRing.style.top = `${ringY}px`;
            }
            if (cursorDot) {
                cursorDot.style.left = `${dotX}px`;
                cursorDot.style.top = `${dotY}px`;
            }
            requestAnimationFrame(renderCursor);
        }
        renderCursor();
    }

    // 5. Hover States
    const interactiveElements = document.querySelectorAll('a, button, .hover-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // 6. Scroll Reveal Animations (Fade Up)
    const options = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 7. Glass Navigation Shrink on Scroll
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 8. Fluid Blob Background Mesh Gradient (Unique Mouse Follower Design)
    const b1 = document.getElementById('blob1');
    const b2 = document.getElementById('blob2');
    const b3 = document.getElementById('blob3');

    // Abstract targets for the blobs
    let b1TargetX = window.innerWidth * 0.3;
    let b1TargetY = window.innerHeight * 0.3;

    let b2TargetX = window.innerWidth * 0.7;
    let b2TargetY = window.innerHeight * 0.6;

    let b3TargetX = window.innerWidth * 0.5;
    let b3TargetY = window.innerHeight * 0.8;

    // Actual DOM positions
    let b1x = b1TargetX, b1y = b1TargetY;
    let b2x = b2TargetX, b2y = b2TargetY;
    let b3x = b3TargetX, b3y = b3TargetY;

    // A counter to add natural sine-wave oscillation
    let time = 0;

    // Mouse coords for blob
    let blobMouseX = window.innerWidth / 2;
    let blobMouseY = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => {
        blobMouseX = e.clientX;
        blobMouseY = e.clientY;
    });

    function renderBlobs() {
        // --- Blob Math (The Unique Background Design) ---
        time += 0.005;

        // Blob 1: Lazily follows the mouse but drifts
        b1TargetX = blobMouseX + Math.sin(time * 2) * 150;
        b1TargetY = blobMouseY + Math.cos(time * 2) * 150;

        // Blob 2: Chases Blob 1 slowly, adds color mix
        b2TargetX += (b1x - b2TargetX) * 0.01;
        b2TargetY += (b1y - b2TargetY) * 0.01;
        b2TargetX += Math.cos(time * 1.5) * 2 - 1; // gentle random wander
        b2TargetY += Math.sin(time * 1.5) * 2 - 1;

        // Blob 3: Acts as an anchor moving in a wide Lissajous curve
        b3TargetX = (window.innerWidth / 2) + Math.sin(time) * 400;
        b3TargetY = (window.innerHeight / 2) + Math.cos(time * 0.8) * 300;

        // Lerp blobs to their targets (extremely slow, fluid friction)
        b1x += (b1TargetX - b1x) * 0.02;
        b1y += (b1TargetY - b1y) * 0.02;

        b2x += (b2TargetX - b2x) * 0.015;
        b2y += (b2TargetY - b2y) * 0.015;

        b3x += (b3TargetX - b3x) * 0.01;
        b3y += (b3TargetY - b3y) * 0.01;

        // Apply to CSS
        if (b1 && b2 && b3) {
            b1.style.left = `${b1x}px`;
            b1.style.top = `${b1y}px`;

            b2.style.left = `${b2x}px`;
            b2.style.top = `${b2y}px`;

            b3.style.left = `${b3x}px`;
            b3.style.top = `${b3y}px`;
        }

        requestAnimationFrame(renderBlobs);
    }
    renderBlobs();

});
