// main.js

document.addEventListener("DOMContentLoaded", () => {

    // 1. Loading Screen
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                initAnimations();
                // Initialize AOS
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out',
                    once: true,
                    offset: 100
                });
            }, 500);
        }, 1500); // Fake load time
    } else {
        initAnimations();
        // Initialize AOS
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
        gsap.from(".hero-content h1", {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power3.out",
            delay: 0.2
        });

        gsap.from(".hero-content p", {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: "power3.out",
            delay: 0.4
        });

        gsap.from(".hero-content .btn", {
            duration: 0.8,
            y: 20,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.6
        });

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

        // Course Cards
        gsap.from(".course-card", {
            scrollTrigger: {
                trigger: "#courses",
                start: "top 75%",
            },
            duration: 0.8,
            y: 100,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.out"
        });

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

    // Initialize slider
    initHackerSlider();

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled'); // Add darker bg if needed
        } else {
            nav.classList.remove('scrolled');
        }
    });

});
