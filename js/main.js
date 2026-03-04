// main.js

document.addEventListener("DOMContentLoaded", () => {

    // 1. Loading Screen
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            // Give it a tiny bit of time after the load event
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    // The user wants 1 second delay before the hero text starts animating
                    setTimeout(() => {
                        initAnimations();
                    }, 1000);

                    // Initialize AOS separately so it can start early for other sections
                    AOS.init({
                        duration: 800,
                        easing: 'ease-in-out',
                        once: true,
                        offset: 100
                    });
                }, 500);
            }, 500);
        });
    } else {
        initAnimations();
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // 2. Register GSAP
    gsap.registerPlugin(ScrollTrigger);

    function initAnimations() {

        // Hero Text Animation
        gsap.fromTo(".hero-content h1",
            { y: 50, opacity: 0 },
            {
                duration: 1,
                y: 0,
                opacity: 1,
                ease: "power3.out",
                delay: 0.2
            }
        );

        gsap.fromTo(".hero-content p",
            { y: 30, opacity: 0 },
            {
                duration: 1,
                y: 0,
                opacity: 1,
                ease: "power3.out",
                delay: 0.4
            }
        );

        gsap.fromTo(".hero-content .btn",
            { y: 20, opacity: 0 },
            {
                duration: 0.8,
                y: 0,
                opacity: 1,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.6
            }
        );

        // Right side image entrance
        gsap.fromTo(".hacker-slider",
            { x: 100, opacity: 0 },
            {
                duration: 1.5,
                x: 0,
                opacity: 1,
                ease: "power4.out",
                delay: 0.4
            }
        );

        // About Grid Animation
        gsap.from(".about-item", {
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%",
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.1,
            ease: "back.out(1.7)"
        });

        // Section Titles
        gsap.utils.toArray(".section-title").forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                },
                duration: 0.8,
                x: -50,
                opacity: 0,
                ease: "power2.out"
            });
        });

        // Course cards are handled by AOS in courses.js to avoid registration conflicts

        // Timeline Items
        gsap.utils.toArray(".timeline-item").forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                },
                duration: 0.8,
                x: i % 2 === 0 ? -50 : 50,
                opacity: 0,
                ease: "power3.out"
            });
        });

        // Why Us - Stats Counter
        ScrollTrigger.create({
            trigger: "#why-us",
            start: "top 70%",
            onEnter: () => startCounters()
        });

        // Pricing Cards
        gsap.from(".pricing-card", {
            scrollTrigger: {
                trigger: "#pricing",
                start: "top 75%",
            },
            duration: 0.8,
            scale: 0.8,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.7)"
        });
    }

    // 3. Stats Counter Logic
    function startCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps

            let current = 0;
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target + (target > 100 ? '+' : '');
                }
            };
            updateCount();
        });
    }

    // 4. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple visual feedback
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            btn.innerText = "TRANSMITTING...";
            btn.classList.add('disabled');

            setTimeout(() => {
                btn.innerText = "TRANSMISSION SUCCESSFUL";
                btn.classList.remove('btn-cyber');
                btn.classList.add('btn-success');

                setTimeout(() => {
                    contactForm.reset();
                    btn.innerText = originalText;
                    btn.classList.remove('btn-success', 'disabled');
                    btn.classList.add('btn-cyber');
                }, 3000);
            }, 1500);
        });
    }

    // Hacker Slider Animation
    function initHackerSlider() {
        const images = document.querySelectorAll('.hacker-img');
        if (images.length === 0) return;

        let currentIndex = 0;

        setInterval(() => {
            // Remove active class from current
            images[currentIndex].classList.remove('active');

            // Calculate next index
            currentIndex = (currentIndex + 1) % images.length;

            // Add active class to next
            images[currentIndex].classList.add('active');
        }, 5000); // 5 seconds
    }

    // About Section Image Slider
    function initAboutSlider() {
        const images = document.querySelectorAll('.cyber-hero-img');
        if (images.length === 0) return;

        let currentIndex = 0;

        setInterval(() => {
            // Remove active class from current
            images[currentIndex].classList.remove('active');

            // Calculate next index
            currentIndex = (currentIndex + 1) % images.length;

            // Add active class to next
            images[currentIndex].classList.add('active');
        }, 4000); // 4 seconds
    }

    // Initialize sliders
    initHackerSlider();
    initAboutSlider();

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // ── Scroll-Spy: highlight active nav section ──────────────────────────
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    const spySections = [];

    navLinks.forEach(link => {
        const id = link.getAttribute('href').replace('#', '');
        const section = document.getElementById(id);
        if (section) spySections.push({ link, section });
    });

    // Mark active for non-anchor page links (gallery.html, contact.html)
    document.querySelectorAll('.navbar-nav .nav-link:not([href^="#"])').forEach(link => {
        const href = link.getAttribute('href');
        if (href && window.location.pathname.endsWith(href)) {
            link.classList.add('active');
        }
    });

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const matched = spySections.find(s => s.section === entry.target);
            if (!matched) return;
            if (entry.isIntersecting) {
                spySections.forEach(s => s.link.classList.remove('active'));
                matched.link.classList.add('active');
            }
        });
    }, {
        root: null,
        rootMargin: '-15% 0px -75% 0px',   // trigger when section is near top 15% of viewport
        threshold: 0
    });

    spySections.forEach(({ section }) => spyObserver.observe(section));

    // Close mobile menu on nav link click
    const navLinksAll = document.querySelectorAll('.navbar-nav .nav-link');
    const menuToggle = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');

    navLinksAll.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle && menuToggle.classList.contains('show')) {
                if (navbarToggler) {
                    navbarToggler.click(); // Trigger the click to handle both the toggle state and the collapse
                } else {
                    menuToggle.classList.remove('show');
                }
            }
        });
    });

});
