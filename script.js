document.addEventListener('DOMContentLoaded', function () {

    // ==========================
    // PRELOADER WITH PROGRESS
    // ==========================
    const loader = document.getElementById('loader');
    let progress = 0;

    // Simulate loading progress
    const progressInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
    }, 200);

    window.addEventListener('load', function () {
        if (loader) {
            // Ensure minimum display time for preloader
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 600);
            }, 1500); // Show preloader for at least 1.5 seconds
        }
    });

    // ==========================
    // NAVBAR SCROLL EFFECT
    // ==========================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================
    // HERO CAROUSEL
    // ==========================
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        new bootstrap.Carousel(heroCarousel, {
            interval: 5000,
            ride: 'carousel',
            pause: false
        });
    }

    // ==========================
    // APPEAR ANIMATION (Hero)
    // ==========================
    const appearElements = document.querySelectorAll("[data-bs-toggle='appear']");

    const appearObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("appear");
            }
        });
    }, { threshold: 0.2 });

    appearElements.forEach(el => appearObserver.observe(el));

    // ==========================
    // ACTIVE NAV ON SCROLL
    // ==========================
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar a");

    function activateNavOnScroll() {
        let scrollY = window.pageYOffset;

        sections.forEach((section) => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");

                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", activateNavOnScroll);
    window.addEventListener("load", activateNavOnScroll);

    // ==========================
    // SMOOTH SCROLL
    // ==========================
    document.querySelectorAll('.navbar a[href^="#"]').forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Close mobile menu after click
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });

    // ==========================
    // COUNTER ANIMATION (Stats)
    // ==========================
    const counters = document.querySelectorAll('[data-count]');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current) + '+';
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + '+';
                        }
                    };

                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ==========================
    // IMAGE PRELOAD
    // ==========================
    const preloadImages = [
        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&h=1080&fit=crop',
        'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&h=1080&fit=crop',
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop'
    ];
    preloadImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // ==========================
    // SLIDE ANIMATION
    // ==========================
    const slideCards = document.querySelectorAll('.slide-left, .slide-right');

    const slideObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-visible');
            }
        });
    }, { threshold: 0.2 });

    slideCards.forEach(card => slideObserver.observe(card));

    // ==========================
    // FADE-IN-UP ANIMATION
    // ==========================
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    // ==========================
    // DYNAMIC PRODUCTS LOAD
    // ==========================
    const products = [
        {
            title: "F-Jyoti Chilli",
            desc: `<strong>Product Highlights</strong><br>
                    <strong>Vigor & Yield:</strong> Resistant to virus diseases; offers frequent, high-volume blooming and fruiting.<br><br>
                    <strong>Harvest Timeline:</strong><br>
                    Green Stage: 60–65 days<br>
                    Red/Mature Stage: 100–105 days<br><br>
                    <strong>Commercial Appeal:</strong> Ideal for long-distance shipping and delivers high-quality fruit that earns a premium market price.`,
            // price: "$4.99",
            // unit: "/kg",
            badge: "Fresh",
            // img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop" 
            img: "./images/prod-1.jpeg"
        },
        {
            title: "Okra Vimukta",
            desc: `
            <strong>Product Highlights</strong><br>
            Okra seeds “Vimukta” from Sai Seeds bring prosperity and abundance.<br>
	•	First harvesting starts between 45 to 50 days.<br>
	•	Fruit color is dark green.<br>
	•	Attractive, tender, and soft pods.<br>
	•	Excellent fruit setting from bottom to top, with very little gap between nodes.<br>
	•	A variety with plenty of fruit-bearing branches.<br>
	•	Suitable for cultivation throughout the year.<br>
	•	Export-quality variety.<br>
	•	Highly tolerant to Yellow Vein Mosaic Virus and ELCV disease.<br>
	•	Excellent quality and good market price.`,
            // price: "$3.49",
            // unit: "/kg",
            badge: "Organic",
            // img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop" 
            img: "./images/prod-2.jpeg"
        },
        {
            title: "Lalaji",
            desc: `<strong>Product Highlights</strong><br>
                    <strong>Fruit:</strong> The onion is round in shape and bright red in color and delicious to eat.<br><br>
                    <strong>Production capacity:</strong> 100 to 150 quintals per acre.<br><br>
                    <strong>Seed rate:</strong> 3 kg per acre<br><br>
                    <strong>Sowing:</strong> Kharif<br><br>
                    <strong>Market price:</strong> High quality`,
            // price: "$6.99",
            // unit: "/kg",
            badge: "Organic",
            // img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&h=600&fit=crop" 
            img: "./images/prod-3.jpeg"
        },
        {
            title: "Shankra Gulabi",
            desc: `<strong>Product Highlights</strong><br>
            Shankara Pink is a modified variety of Kasai Seeds.<br><br>
            Attractive bright color and three-leafed onion<br><br>
            The color of the onion is bright pink red.<br><br>
            A variety that gives high yield in the Rabi season and has storage capacity for nine to ten months.<br><br>
            Ready to harvest in 100 to 120 days.<br><br>
            Average yield per acre is 20 to 22 tons if the weather is right and proper care is taken.<br><br>
            High quality market price`,
            // price: "$2.99",
            // unit: "/bunch",
            badge: "Organic",
            img: "./images/prod-4.jpeg"
        },
        {
            title: "Samarth Garva",
            desc: `<strong>Product Highlights</strong><br>
            <strong>Fruit:</strong> The onion is round in shape and is bright light red in color and delicious to eat.<br><br>

            <strong>Production capacity:</strong> One hundred to one and a half hundred quintals per acre<br><br>

            <strong>Seed rate:</strong> Three kg per acre<br><br>

            <strong>Sowing:</strong> Kharif Late Kharif<br><br>

            <strong>Market price:</strong> High quality`,
            // price: "$3.99",
            // unit: "/kg",
            badge: "Organic",
            img: "./images/prod-5.jpeg"
        },
        {
            title: "Soyabeans MACS-1188",
            desc: `<strong>Product Highlights</strong><br>
            Pure organic Soyabeans, protein-rich and naturally grown.<br>`,
            // price: "$5.49",
            // unit: "/kg",
            badge: "Protein",
            img: "./images/prod-6.jpeg"
        },
        {
            title: "Tur BDN-716",
            desc: `<strong>Product Highlights</strong><br>
            Premium, protein-rich and naturally grown.<br>`,
            // price: "$4.49",
            // unit: "/liter",
            badge: "Fresh",
            img: "./images/prod-7.jpeg"
        },
        {
            title: "Bollgard PKV-081 BT II",
            desc: `<strong>Product Highlights</strong><br>
            Premium, protein-rich and naturally grown.<br>`,
            // price: "$8.99",
            // unit: "/jar",
            badge: "Organic",
            img: "./images/prod-8.jpeg"
        },
        // {
        //     title: "Organic Eggs",
        //     desc: "Free-range organic eggs from happy, healthy hens.",
        //     price: "$5.99",
        //     unit: "/dozen",
        //     badge: "Free-Range",
        //     img: "./images/prod-9.jpeg"
        // }
    ];

    const productRow = document.getElementById('product-row');
    const loadMoreBtn = document.getElementById('loadMore');
    const showLessBtn = document.getElementById('showLess');
    const initialCount = 3;

    products.forEach((p, i) => {
        const hiddenClass = i >= initialCount ? 'd-none' : '';
        productRow.insertAdjacentHTML('beforeend', `
            <div class="col-md-6 col-lg-4 product-item ${hiddenClass} fade-in-up">
                <div class="card product-card shadow-sm h-100">
                    <div class="product-img-wrapper">
                        <img src="${p.img}" alt="${p.title}" loading="lazy">
                        <span class="product-badge">${p.badge}</span>
                    </div>
                    <div class="card-body p-4 d-flex flex-column">
                        <h3 class="card-title fs-4 fw-bold mb-3">${p.title}</h3>
                        <div class="card-text text-muted mb-4 flex-grow-1">${p.desc}</div>
                        <div class="d-flex justify-content-between align-items-center mt-auto">

                            <button onclick="redirectToWhatsApp('${p.title}')" class="btn btn-sm btn-success rounded-pill px-3">
                                <i class="bi bi-cart-plus me-1"></i>Buy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });

    // <div>
    //     <span class="product-price">${p.price}</span>
    //     <span class="product-price-unit">${p.unit}</span>
    // </div>

    document.querySelectorAll('.fade-in-up').forEach(el => fadeObserver.observe(el));

    loadMoreBtn.addEventListener('click', () => {
        document.querySelectorAll('.product-item.d-none').forEach(item => {
            item.classList.remove('d-none');
        });
        loadMoreBtn.classList.add('d-none');
        showLessBtn.classList.remove('d-none');
    });

    showLessBtn.addEventListener('click', () => {
        document.querySelectorAll('.product-item').forEach((item, index) => {
            if (index >= initialCount) item.classList.add('d-none');
        });
        showLessBtn.classList.add('d-none');
        loadMoreBtn.classList.remove('d-none');
        window.scrollTo({
            top: productRow.offsetTop - 100,
            behavior: 'smooth'
        });
    });

    // ==========================
    // TESTIMONIALS
    // ==========================
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Home Chef",
            img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
            feedback: "The quality of vegetables from Fresh Leaf is outstanding! Everything is so fresh and flavorful. I've never tasted produce this good from any other source.",
            stars: 5
        },
        {
            name: "Michael Chen",
            role: "Restaurant Owner",
            img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
            feedback: "Fast delivery and excellent service! The fresh fruits and grains are of top quality. My customers always compliment the freshness of our ingredients.",
            stars: 5
        },
        {
            name: "Emily Rodriguez",
            role: "Nutritionist",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
            feedback: "Fresh Leaf's commitment to organic purity and freshness is unmatched. I recommend them to all my clients who want the best quality produce for their health.",
            stars: 5
        }
    ];

    const container = document.getElementById("testimonial-container");

    testimonials.forEach(t => {
        const starsHTML = '<i class="bi bi-star-fill"></i>'.repeat(t.stars);
        const card = document.createElement("div");
        card.className = "col-md-6 col-lg-4";

        card.innerHTML = `
            <div class="testimonial-card">
                <div class="testimonial-inner">
                    <div class="testimonial-front">
                        <div class="text-center mb-3">
                            <img src="${t.img}" class="testimonial-avatar mb-3" alt="${t.name}">
                            <div class="testimonial-stars mb-3">${starsHTML}</div>
                        </div>
                        <p class="text-muted mb-4">
                            "${t.feedback.substring(0, 100)}..."
                        </p>
                        <div class="text-center mt-auto">
                            <p class="testimonial-author mb-1">${t.name}</p>
                            <p class="testimonial-role mb-0">${t.role}</p>
                        </div>
                    </div>

                    <div class="testimonial-back">
                        <i class="bi bi-quote fs-1 mb-3 opacity-50"></i>
                        <p class="px-3 mb-3">${t.feedback}</p>
                        <h5 class="fw-bold mb-1">${t.name}</h5>
                        <p class="mb-0 opacity-90">${t.role}</p>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    // Toggle flip on click for mobile
    document.querySelectorAll(".testimonial-card").forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("flip");
        });
    });

    // ==========================
    // SCROLL TO TOP BUTTON
    // ==========================
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================
    // WHATSAPP BUTTON ANIMATION
    // ==========================
    const whatsappButton = document.querySelector('.whatsapp-float');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (whatsappButton) {
            whatsappButton.style.transform = scrollTop > lastScrollTop ? 'scale(0.85)' : 'scale(1)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // ==========================
    // PARALLAX EFFECT ON SCROLL
    // ==========================
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content');

        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ==========================
    // ADD TO CART FUNCTIONALITY
    // ==========================
    // document.addEventListener('click', function(e) {
    //     if (e.target.closest('.btn-success:has(.bi-cart-plus)')) {
    //         const button = e.target.closest('.btn-success');
    //         const originalText = button.innerHTML;

    //         button.innerHTML = '<i class="bi bi-check2 me-1"></i>Added!';
    //         button.classList.add('disabled');

    //         setTimeout(() => {
    //             button.innerHTML = originalText;
    //             button.classList.remove('disabled');
    //         }, 2000);
    //     }
    // });

    // ==========================
    // LAZY LOADING FOR IMAGES
    // ==========================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    console.log('Fresh Leaf website loaded successfully! 🌿');
});