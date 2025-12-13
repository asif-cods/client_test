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

    // Bestseller, New, Free, Beginner, Popular

    // --- Data ---
    const courses = [
        {
            id: 1,
            title: "DFIR Course",
            tag: "75 hours: Master digital forensics and incident response to protect, investigate, and remediate cyber threats effectively.",
            description: "Advance your cybersecurity career with our DFIR course. Acquire hands-on skills in digital forensics, memory and mobile device analysis, malware investigation, and incident response to protect critical data.",
            price: 599,
            originalPrice: 1200,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-dfir",
            badge: "",
            syllabus: [
                { week: "Week 1", topic: "Storage & File Systems", content: "Storage & File systems fundamentals and more." },
                { week: "Week 2", topic: "Windows Acquisition", content: "Windows Data Acquisition and more." },
                { week: "Week 3", topic: "Anti Forensics", content: "Anti forensic techniques and more." },
                { week: "Week 4", topic: "Linux & Memory", content: "Linux forensics & Memory analysis and more." },
                { week: "Week 5", topic: "Windows Memory", content: "Windows memory forensics and more." },
                { week: "Week 6", topic: "Network & Email", content: "Network & email forensics and more." },
                { week: "Week 7", topic: "Android Forensics", content: "Mobile Device Forensics (Android) and more." },
                { week: "Week 8", topic: "iOS Forensics", content: "Mobile Device Forensics (iOS) and more." },
                { week: "Week 9", topic: "Malware & EDR", content: "Malware & DFIR with EDR and more." },
                { week: "Week 10", topic: "Final Assessment", content: "Final Integration & Assessment and more." }
            ]
        },
        {
            id: 2,
            title: "Information Security (Beginner)",
            tag: "30 hours: Build a strong foundation in information security and core cyber defense concepts.",
            description: "Start your cybersecurity journey by learning essential information security concepts, policies, human security, secure development basics, and data protection fundamentals",
            price: 299,
            originalPrice: 600,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-infosec-beginner",
            badge: "Beginner",
            syllabus: [
                { week: "Week 1", topic: "InfoSec Foundations", content: "Information Security Foundations and more." },
                { week: "Week 2", topic: "Organization & Policies", content: "Organization, people & policies and more." },
                { week: "Week 3", topic: "Development & Physical", content: "Secure development & Physical Security and more." },
                { week: "Week 4", topic: "Asset & Data", content: "Asset & Data Protection and more." }
            ]
        },
        {
            id: 3,
            title: "Information Security (Advanced)",
            tag: "45 hours: Move to the next level with advanced security technologies and risk management.",
            description: "Advance your cybersecurity career by mastering cryptography, risk management, system and cloud security, audits, IAM, compliance, and real-world security practices.",
            price: 449,
            originalPrice: 900,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-infosec-advanced",
            badge: "Advanced",
            syllabus: [
                { week: "Week 1", topic: "Cryptography", content: "Cryptography fundamentals and more." },
                { week: "Week 2", topic: "Risk Management", content: "Risk Management practices and more." },
                { week: "Week 3", topic: "System Architecture", content: "System Architecture & Hardware Security and more." },
                { week: "Week 4", topic: "Audit & Testing", content: "Security Audit & Testing and more." },
                { week: "Week 5", topic: "Continuity & Cloud", content: "Continuity & Modern Architecture and more." },
                { week: "Week 6", topic: "Legal & IAM", content: "Legal, IAM & Consolidation and more." }
            ]
        },
        {
            id: 4,
            title: "SIEM Engineer (Beginner)",
            tag: "30 hours: Build your foundation in SIEM and SOC monitoring.",
            description: "This course covers SIEM fundamentals, network security, log collection, parsing, and alert generation.",
            price: 299,
            originalPrice: 600,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-siem-beginner",
            badge: "Beginner",
            syllabus: [
                { week: "Week 1", topic: "SIEM Fundamentals", content: "SIEM fundamentals and more." },
                { week: "Week 2", topic: "Log Collection", content: "Log collection & parsing and more." },
                { week: "Week 3", topic: "Search & Reporting", content: "Log search & reporting and more." },
                { week: "Week 4", topic: "Consolidation", content: "Consolidation and more." }
            ]
        },
        {
            id: 5,
            title: "SIEM Engineer (Advanced)",
            tag: "45 hours: Master enterprise SIEM tools and advanced threat detection.",
            description: "This course cover Splunk, wazuh, alert tuning, SOAR tools and advanced analysis",
            price: 449,
            originalPrice: 900,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-siem-advanced",
            badge: "Advanced",
            syllabus: [
                { week: "Week 1", topic: "Splunk", content: "Splunk fundamentals and more." },
                { week: "Week 2", topic: "Wazuh", content: "Wazuh fundamentals and more." },
                { week: "Week 3", topic: "Alert Tuning & SOAR", content: "Alert tuning & SOAR fundamentals and more." },
                { week: "Week 4", topic: "Advanced SOAR", content: "Advanced SOAR and more." },
                { week: "Week 5", topic: "Consolidation", content: "Consolidation and more." }
            ]
        },
        {
            id: 6,
            title: "Incident Response (Beginner)",
            tag: "30 hours: Learn how to detect, respond, and contain security incidents.",
            description: "This course cover foundational IR skills, OS-specific incident response , basic log and malware analysis.",
            price: 299,
            originalPrice: 600,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-ir-beginner",
            badge: "Beginner",
            syllabus: [
                { week: "Week 1", topic: "Incident Handling", content: "Incident Handling Basics and more." },
                { week: "Week 2", topic: "Malware & Web", content: "Malware & Web Attacks and more." },
                { week: "Week 3", topic: "Log & Forensics", content: "Log analysis & Forensics and more." },
                { week: "Week 4", topic: "Consolidation", content: "Consolidation & Quiz and more." }
            ]
        },
        {
            id: 7,
            title: "Incident Response (Advanced)",
            tag: "45 hours: Handle complex attacks with advanced forensics and response skills.",
            description: "This course cover deeper forensics, memory/registry analysis, AD attacks, reporting and crisis management.",
            price: 449,
            originalPrice: 900,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-ir-advanced",
            badge: "Advanced",
            syllabus: [
                { week: "Week 1", topic: "Memory & Registry", content: "Memory & Registry Forensics and more." },
                { week: "Week 2", topic: "Event Logs", content: "Event Logs & Browser Forensics and more." },
                { week: "Week 3", topic: "Browser & GTFOBins", content: "Browser & GTFOBins and more." },
                { week: "Week 4", topic: "Reporting & Crisis", content: "Reporting & Crisis Management and more." },
                { week: "Week 5", topic: "Advanced Logs", content: "Advanced Event Logs & USB Forensics and more." },
                { week: "Week 6", topic: "Disk Forensics", content: "Windows Disk Forensics and more." }
            ]
        },
        {
            id: 8,
            title: "SOC Analyst (Beginner)",
            tag: "30 hours: Start your SOC career with essential monitoring and analysis skills.",
            description: "This course cover foundational knowledge, core SOC operations, and basic analysis skills. Suitable for beginners with little to no prior experience in SOC.",
            price: 299,
            originalPrice: 600,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-soc-beginner",
            badge: "Beginner",
            syllabus: [
                { week: "Week 1", topic: "SOC Fundamentals", content: "SOC fundamentals & Security frameworks and more." },
                { week: "Week 2", topic: "Attack Detection", content: "Email & Web attack detection and more." },
                { week: "Week 3", topic: "SIEM & Investigation", content: "SIEM & Incident Investigation and more." },
                { week: "Week 4", topic: "Corporate Security", content: "Corporate Security & Overview and more." }
            ]
        },
        {
            id: 9,
            title: "SOC Analyst (Advanced)",
            tag: "45 hours: Operate like a real SOC analyst with hands-on incident response.",
            description: "These are more technical, specialized, and hands-on. Suitable for learners who already have the basics and want to handle real SOC incidents, malware analysis, and lab simulations.",
            price: 449,
            originalPrice: 900,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-soc-advanced",
            badge: "Advanced",
            syllabus: [
                { week: "Week 1", topic: "Malware Analysis", content: "Malware Analysis Fundamentals and more." },
                { week: "Week 2", topic: "Malicious Docs", content: "Malicious Docs & MSHTML and more." },
                { week: "Week 3", topic: "Network Logs", content: "Network Log Analysis and more." },
                { week: "Week 4", topic: "Threat Intelligence", content: "Threat Intelligence and more." },
                { week: "Week 5", topic: "Advanced Detection", content: "Advanced Attack Detection and more." },
                { week: "Week 6", topic: "Consolidation", content: "Consolidation & Advanced practices and more." }
            ]
        },
        {
            id: 10,
            title: "C, C++",
            tag: "60 hours: Master fundamental and advanced C/C++ programming for efficient, structured code.",
            description: "Learn the fundamental and advanced concepts of both C and C++ programming. Build a strong understanding of syntax, data structures, memory handling, and object-oriented concepts essential for efficient and structured programming.",
            price: 499,
            originalPrice: 1000,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-c-cpp",
            badge: "",
            syllabus: [
                { week: "Week 1", topic: "C Programming", content: "C Programming Concepts and more." },
                { week: "Week 2", topic: "C Intermediate", content: "C intermediate and more." },
                { week: "Week 3", topic: "C++ Fundamentals", content: "C++ Fundamentals and more." },
                { week: "Week 4", topic: "C++ Advanced", content: "C++ Advanced and more." }
            ]
        },
        {
            id: 11,
            title: "Bash",
            tag: "30 - 45 hours: Automate and streamline system tasks using powerful Bash scripting skills.",
            description: "Learn how to automate tasks and manage system operations efficiently using BASH scripting. Understand the essentials of scripting in Unix/Linux environments to streamline processes and work with system commands.",
            price: 349,
            originalPrice: 700,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-bash",
            badge: "",
            syllabus: [
                { week: "Week 1", topic: "Foundations", content: "Foundations and more." },
                { week: "Week 2", topic: "Scripting Basics", content: "Scripting Basics and more." },
                { week: "Week 3", topic: "Loops & Functions", content: "Loops & Functions and more." },
                { week: "Week 4", topic: "Advanced & Projects", content: "Advanced Bash + Projects and more." }
            ]
        },
        {
            id: 12,
            title: "Rust",
            tag: "30 - 45 hours: Master Rust programming to build blazing-fast, memory-safe, and future-ready applications.",
            description: "Learn the core concepts of the Rust programming language, including memory management, ownership, and concurrency. This course builds a strong foundation for writing safe and high-performance code.",
            price: 399,
            originalPrice: 800,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            formLink: "https://forms.google.com/example-rust",
            badge: "",
            syllabus: [
                { week: "Week 1", topic: "Rust Basics", content: "Rust Basics and more." },
                { week: "Week 2", topic: "Working with Data", content: "Working with Data and more." },
                { week: "Week 3", topic: "Intermediate", content: "Intermediate and more." },
                { week: "Week 4", topic: "Advanced Concepts", content: "Advanced Concepts and more." },
                { week: "Week 5", topic: "Projects", content: "Projects and more." }
            ]
        }

    ];

    const reviews = [
        {
            type: 'screenshot',
            image: './image/review1.png', // The uploaded WhatsApp screenshot
            name: "Student Feedback"
        },
        {
            type: 'screenshot',
            // text: "Shadow School completely changed my career path. The mentors are top-notch and the curriculum is up-to-date.",
            name: "Sarah Jenkins",
            image: './image/review1.png',
        },
        {
            type: 'screenshot',
            // text: "I loved the flexible schedule and the hands-on projects. I built a portfolio that got me hired in 3 months!",
            name: "Michael Chen",
            image: './image/review1.png',
        },
        {
            type: 'text',
            text: "The best investment I've made in myself. The community is supportive and the content is gold.",
            name: "Priya Patel",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        }
    ];

    // // --- Currency Logic ---
    // const currencyConfig = {
    //     USD: { rate: 1, symbol: '$' },
    //     INR: { rate: 84, symbol: '₹' },
    //     EUR: { rate: 0.92, symbol: '€' }
    // };
    // let currentCurrency = localStorage.getItem('shadow_currency') || 'USD';
    // const currencySelect = document.getElementById('currencySelect');

    // function formatPrice(price) {
    //     if (!price) return '';
    //     const { rate, symbol } = currencyConfig[currentCurrency];
    //     const converted = Math.round(price * rate);
    //     return `${symbol}${converted}`;
    // }

    // // Handle Dropdown Change
    // if (currencySelect) {
    //     currencySelect.value = currentCurrency;
    //     currencySelect.addEventListener('change', (e) => {
    //         currentCurrency = e.target.value;
    //         localStorage.setItem('shadow_currency', currentCurrency);
    //         // Reload page to re-render or re-trigger renders
    //         // For smoother UX, we can just re-render:
    //         location.reload();
    //     });
    // }

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
                        <p class="small mb-3 flex-grow-1" style="color: #b0b0b0;">${course.tag.substring(0, 100)}...</p>
                        <div class=" justify-content-between text-center align-items-center mt-auto">



                            <a href="course.html?id=${course.id}" class="btn btn-blue btn-sm rounded-pill px-3">Enquiry</a>
                        </div>
                    </div>
                </div>
            `;
            return col;
        }
        // d-flex
        // <div>
        //     ${course.originalPrice ? `<span class="original-price">${formatPrice(course.originalPrice)}</span>` : ''}
        //     <span class="text-info fw-bold">${formatPrice(course.price)}</span>
        // </div>


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

            let content = '';
            if (review.type === 'screenshot') {
                // Render Image-Only Review (Screenshot)
                content = `
                    <div class="review-card mx-auto text-center p-0 overflow-hidden border-0" style="max-width: 500px; background: transparent; box-shadow: none;">
                        <img src="${review.image}" alt="${review.name}" class="img-fluid rounded-4 shadow-lg hover-scale">
                    </div>
                `;
            } else {
                // Render Standard Text Review
                content = `
                    <div class="review-card mx-auto text-center" style="max-width: 700px;">
                        <img src="${review.image}" alt="${review.name}" class="rounded-circle mb-3" width="80" height="80" style="object-fit:cover; border: 3px solid var(--primary);">
                        <p class="review-text lead mb-3">"${review.text}"</p>
                        <p class="student-name text-primary fw-bold mb-0">- ${review.name}</p>
                    </div>
                `;
            }

            item.innerHTML = content;
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
            // Generate Syllabus Table HTML if syllabus exists
            let syllabusHtml = '';
            if (course.syllabus && course.syllabus.length > 0) {
                syllabusHtml = `
                    <div class="mt-5">
                         <h2 class="section-title text-center mb-5 display-5">Course Syllabus</h2>
                        <div class="table-responsive rounded-4 shadow-lg overflow-hidden">
                            <table class="table table-dark table-striped table-hover mb-0 align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col" class="py-3 ps-4 bg-primary border-0 text-white" style="width: 20%;">Week</th>
                                        <th scope="col" class="py-3 bg-primary border-0 text-white" style="width: 30%;">Topic</th>
                                        <th scope="col" class="py-3 bg-primary border-0 text-white">Content</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${course.syllabus.map(item => `
                                        <tr>
                                            <td class="ps-4 py-3 fw-bold text-primary">${item.week}</td>
                                            <td class="py-3 fw-bold">${item.topic}</td>
                                            <td class="py-3 text-light opacity-75">${item.content}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            } else {
                syllabusHtml = `
                    <div class="mt-5">
                        <h3 class="mb-3">Course Syllabus</h3>
                        <p class="text-muted">Syllabus details coming soon...</p>
                    </div>
                 `;
            }

            detailsContainer.innerHTML = `
                <div class="row align-items-center g-5 mb-5">
                    <div class="col-lg-6">
                        <div class="img-wrapper course-detail-wrapper rounded-4 shadow-lg">
                            <img src="${course.image}" alt="${course.title}" class="img-fluid w-100 h-100 object-fit-cover">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <h1 class="display-4 fw-bold mb-3">${course.title}</h1>
                        <p class="lead mb-4">${course.description}</p>
                        
                        <div class="d-grid gap-3 col-lg-8">
                            <a href="https://tinyurl.com/shadow-school" target="_blank" class="btn btn-primary d-block">Fill Admission Form</a>
                            <a href="https://wa.me/9150582673?text=I'm interested in ${encodeURIComponent(course.title)} Course. Please guide me." target="_blank" class="btn btn-outline-success d-block">
                                <i class="fab fa-whatsapp"></i> Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
                <!-- Syllabus Section -->
                ${syllabusHtml}
            `;
        } else {
            detailsContainer.innerHTML = `<h2 class="text-center">Course not found. <a href="index.html" class="text-primary">Go Back</a></h2>`;
        }
    }

    //     <p class="display-6 text-primary mb-4">
    //     ${course.originalPrice ? `<span class="original-price fs-4 align-middle">${formatPrice(course.originalPrice)}</span>` : ''}

    //          ${formatPrice(course.price)}   
    // </p>

    //  ${course.formLink}

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

