document.addEventListener('DOMContentLoaded', () => {

    // ==========================
    // PRELOADER
    // ==========================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        });
        // Fallback in case load event already fired or takes too long
        setTimeout(() => {
            if (document.body.contains(preloader)) {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.remove(), 500);
            }
        }, 3000);
    }

    // ==========================
    // ACTIVE NAV ON SCROLL
    // ==========================
    const sections = document.querySelectorAll("section[id], header[id]");
    const navLinks = document.querySelectorAll(".nav-link");

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
    // MOBILE NAV CLOSE ON CLICK
    // ==========================
    const navCollapse = document.getElementById('navbarNav');
    if (navCollapse) {
        const bsCollapse = new bootstrap.Collapse(navCollapse, { toggle: false });
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (navCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
    }



    // --- Data ---
    const courses = [
        {
            id: 1,
            title: "Web Development Mastery",
            description: "Become a full-stack developer with our comprehensive bootcamp. Learn HTML, CSS, JS, Node.js, and React.",
            price: "$499",
            originalPrice: "$999",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-web-dev",
            badge: "Bestseller"
        },
        {
            id: 2,
            title: "Data Science Fundamentals",
            description: "Master the art of data analysis, visualization, and machine learning using Python and SQL.",
            price: "$599",
            originalPrice: "$1200",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-data-science",
            badge: "New"
        },
        {
            id: 3,
            title: "Digital Marketing Pro",
            description: "Learn SEO, SEM, social media marketing, and content strategy to grow any business online.",
            price: "$399",
            originalPrice: "$799",
            image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-marketing",
            badge: "Free"
        },
        {
            id: 4,
            title: "UI/UX Design Essentials",
            description: "Design beautiful and functional user interfaces. Learn Figma, prototyping, and design theory.",
            price: "$449",
            originalPrice: "$899",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-design",
            badge: "Beginner"
        },
        {
            id: 5,
            title: "Web Development Mastery",
            description: "Become a full-stack developer with our comprehensive bootcamp. Learn HTML, CSS, JS, Node.js, and React.",
            price: "$499",
            originalPrice: "$999",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-web-dev",
            badge: "Beginner"
        },
        {
            id: 6,
            title: "UI/UX Design Essentials",
            description: "Design beautiful and functional user interfaces. Learn Figma, prototyping, and design theory.",
            price: "$449",
            originalPrice: "$899",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-design",
            badge: "Beginner"
        },
        {
            id: 7,
            title: "UI/UX Design Essentials",
            description: "Design beautiful and functional user interfaces. Learn Figma, prototyping, and design theory.",
            price: "$449",
            originalPrice: "$899",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-design",
            badge: "Beginner"
        },
        {
            id: 8,
            title: "UI/UX Design Essentials",
            description: "Design beautiful and functional user interfaces. Learn Figma, prototyping, and design theory.",
            price: "$449",
            originalPrice: "$899",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-design",
            badge: "Beginner"
        },
        {
            id: 9,
            title: "UI/UX Design Essentials",
            description: "Design beautiful and functional user interfaces. Learn Figma, prototyping, and design theory.",
            price: "$449",
            originalPrice: "$899",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-design",
            badge: "Beginner"
        },
    ];

    const reviews = [
        {
            text: "Shadow School completely changed my career path. The mentors are top-notch and the curriculum is up-to-date.",
            name: "Sarah Jenkins"
        },
        {
            text: "I loved the flexible schedule and the hands-on projects. I built a portfolio that got me hired in 3 months!",
            name: "Michael Chen"
        },
        {
            text: "The best investment I've made in myself. The community is supportive and the content is gold.",
            name: "Priya Patel"
        }
    ];

    // --- Global Scroll Animation Observer ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const target = entry.target;
            if (entry.isIntersecting) {
                // Handle specific animations
                if (target.classList.contains('animate-up')) {
                    target.classList.add('active-up');
                } else if (target.classList.contains('animate-down')) {
                    target.classList.add('active-down');
                } else {
                    target.classList.add('active'); // Default reveal
                }
                observer.unobserve(target); // Animation runs only once
            }
        });
    }, { threshold: 0.1 }); // Trigger early

    // Observe static elements with animation classes
    document.querySelectorAll('.reveal, .animate-up, .animate-down').forEach(el => observer.observe(el));

    // --- Course Rendering (Home Page using Bootstrap Grid) ---
    const courseGrid = document.getElementById('course-grid');
    const toggleCoursesBtn = document.getElementById('toggle-courses-btn');

    if (courseGrid) {
        let isExpanded = false;
        const initialCount = 3;

        function createCourseCard(course, index) {
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6 course-item';
            col.dataset.index = index;

            // Animation Logic: Alternating Up/Down
            let animClass = (index % 2 === 0) ? 'animate-up' : 'animate-down';

            col.innerHTML = `
                <div class="course-card h-100 ${animClass}">
                    <div class="course-img-wrapper">
                        ${course.badge ? `<span class="badge-custom badge-${course.badge.toLowerCase().replace(/\s+/g, '-')}">${course.badge}</span>` : ''}
                        <img src="${course.image}" alt="${course.title}" class="course-img">
                    </div>
                    <div class="course-content p-4 d-flex flex-column flex-grow-1">
                        <h3 class="h5 fw-bold mb-2">${course.title}</h3>
                        <p class="small mb-3 flex-grow-1" style="color: #b0b0b0;">${course.description.substring(0, 100)}...</p>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <div>
                                ${course.originalPrice ? `<span class="original-price">${course.originalPrice}</span>` : ''}
                                <span class="text-info fw-bold">${course.price}</span>
                            </div>
                            <a href="course.html?id=${course.id}" class="btn btn-blue btn-sm rounded-pill px-3">Enquiry</a>
                        </div>
                    </div>
                </div>
            `;
            return col;
        }

        // Initial Render
        courses.slice(0, initialCount).forEach((course, index) => {
            const card = createCourseCard(course, index);
            courseGrid.innerHTML = ''; // Ensure clean slate initially (though appendChild usually fine if empty)
            courseGrid.appendChild(card); // Wait, clearing inside loop? NO.
            // Fixed loop below
        });

        // Correcting the initial render loop logic to not clear every time
        courseGrid.innerHTML = '';
        courses.slice(0, initialCount).forEach((course, index) => {
            const card = createCourseCard(course, index);
            courseGrid.appendChild(card);
            observer.observe(card.querySelector('.course-card'));
        });


        if (toggleCoursesBtn) {
            toggleCoursesBtn.addEventListener('click', () => {
                isExpanded = !isExpanded;

                if (isExpanded) {
                    // Show More: Append remaning
                    courses.slice(initialCount).forEach((course, index) => {
                        const card = createCourseCard(course, index + initialCount);
                        courseGrid.appendChild(card);
                        observer.observe(card.querySelector('.course-card'));
                    });
                    toggleCoursesBtn.innerText = 'Show Less';
                } else {
                    // Show Less: Remove extra
                    const allItems = courseGrid.querySelectorAll('.course-item');
                    allItems.forEach((item, i) => {
                        if (i >= initialCount) {
                            const cardEffect = item.querySelector('.course-card');
                            if (cardEffect) observer.unobserve(cardEffect);
                            item.remove();
                        }
                    });

                    toggleCoursesBtn.innerText = 'View All Courses';

                    // Scroll back
                    const coursesSection = document.getElementById('courses');
                    if (coursesSection) {
                        coursesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        }
    }

    // --- Reviews Rendering (Bootstrap Carousel) ---
    const sliderContainer = document.getElementById('slider-container');

    if (sliderContainer) {
        reviews.forEach((review, index) => {
            const item = document.createElement('div');
            item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            item.innerHTML = `
                <div class="review-card mx-auto" style="max-width: 700px;">
                    <p class="review-text lead mb-3">"${review.text}"</p>
                    <p class="student-name text-primary fw-bold mb-0">- ${review.name}</p>
                </div>
            `;
            sliderContainer.appendChild(item);
        });
    }

    // --- Consultant Toggle ---
    // const consultantBtn = document.getElementById('consultant-btn');
    // const consultantDetails = document.getElementById('consultant-details');

    // if (consultantBtn && consultantDetails) {
    //     consultantBtn.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         consultantDetails.classList.toggle('d-none'); // Bootstrap utility for hidden
    //         consultantDetails.classList.add('d-flex', 'showC');
    //     });
    // }

    // --- Course Details Rendering (Course Page) ---
    const detailsContainer = document.getElementById('course-details-container');

    if (detailsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = parseInt(urlParams.get('id'));
        const course = courses.find(c => c.id === courseId);

        if (course) {
            // text-muted 
            detailsContainer.innerHTML = `
                <div class="row align-items-center g-5">
                    <div class="col-lg-6">
                        <div class="img-wrapper course-detail-wrapper rounded-4 shadow-lg">
                            <img src="${course.image}" alt="${course.title}" class="img-fluid w-100">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <h1 class="display-4 fw-bold mb-3">${course.title}</h1>
                        <p class="display-6 text-primary mb-4">
                            ${course.originalPrice ? `<span class="original-price fs-4 align-middle">${course.originalPrice}</span>` : ''}
                            ${course.price}
                        </p>
                        <p class="lead  mb-4">${course.description}</p>
                        
                        <div class="d-grid gap-3 col-lg-8">
                            <a href="https://tinyurl.com/shadow-school" target="_blank" class="btn btn-primary d-block">Fill Admission Form</a>
                            <a href="https://wa.me/9150582673?text=I'm interested in ${encodeURIComponent(course.title)} Course. Please guide me." target="_blank" class="btn btn-outline-success d-block">
                                <i class="fab fa-whatsapp"></i> Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            detailsContainer.innerHTML = `<h2 class="text-center">Course not found. <a href="index.html" class="text-primary">Go Back</a></h2>`;
        }
    }
    // ${course.formLink}

    // right  and left animation 
    window.addEventListener("scroll", function () {
        const sections = document.querySelectorAll(".scroll-animate");
        const screenHeight = window.innerHeight;

        sections.forEach(section => {
            const position = section.getBoundingClientRect().top;

            if (position < screenHeight - 150) {
                section.classList.add("show");
            }
        });
    });

    const consultantBtn = document.getElementById('consultant-btn');
    const consultantDetails = document.getElementById('consultant-details');

    consultantBtn.addEventListener('click', function (e) {
        e.preventDefault();
        consultantDetails.classList.toggle('showC');
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
            whatsappButton.style.transform = scrollTop > lastScrollTop ? 'scale(0.85)' : 'scale(3)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });


});

