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

    // 1. Get references to the main modal and the close button
    const offerModal = document.getElementById('offerModal');
    const closeModalBtn = document.getElementById('closeModal');

    // --- Configuration ---
    const displayDelay = 3000; // Time in milliseconds (e.g., 3000ms = 3 seconds)
    const cookieName = 'offerPopUpSeen';
    const cookieExpiryDays = 1; // Show it again after 1 day

    // Helper functions for cookies (to prevent showing the popup on every single page load)

    // Function to set a cookie
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Function to check if a cookie exists
    function getCookie(name) {
        const cname = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cname) === 0) {
                return c.substring(cname.length, c.length);
            }
        }
        return "";
    }

    // 2. Logic to Show the Pop-up
    function showPopUp() {
        if (!offerModal) return; // Exit if the modal element isn't found

        // Check if the user has seen the pop-up recently (based on cookie)
        if (getCookie(cookieName) === 'true') {
            return; // Pop-up has been seen recently, so don't show it
        }

        // Show the modal after the defined delay
        setTimeout(() => {
            offerModal.style.display = 'block';

            // Set the cookie so it doesn't show up again immediately
            setCookie(cookieName, 'true', cookieExpiryDays);
        }, displayDelay);
    }

    // 3. Logic to Hide/Close the Pop-up
    function hidePopUp() {
        if (offerModal) {
            offerModal.style.display = 'none';
        }
    }

    // 4. Attach Event Listeners

    // Close when the dedicated close button is clicked
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hidePopUp);
    }

    // Close when the user clicks anywhere on the dark backdrop
    if (offerModal) {
        offerModal.addEventListener('click', (event) => {
            // Check if the click occurred exactly on the overlay (not on the content box inside it)
            if (event.target === offerModal) {
                hidePopUp();
            }
        });
    }

    // Close when the ESC key is pressed
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' || event.key === 'Esc') {
            hidePopUp();
        }
    });

    // 5. Run the main function
    showPopUp();





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
            category: "Professional",
            title: "DFIR Course",
            tag: "Master digital forensics and incident response to protect, investigate, and remediate cyber threats effectively.",
            duration: "75 hours",
            offer: "50% off",
            description: "Advance your cybersecurity career with our DFIR course. Acquire hands-on skills in digital forensics, memory and mobile device analysis, malware investigation, and incident response to protect critical data.",
            price: 599,
            originalPrice: 1200,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            // formLink: "https://forms.google.com/example-dfir",
            badge: "Bestseller",
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
            category: "Red Team",
            title: "Information Security (Beginner)",
            tag: "Build a strong foundation in information security and core cyber defense concepts.",
            duration: "30 hours",
            offer: "",
            description: "Start your cybersecurity journey by learning essential information security concepts, policies, human security, secure development basics, and data protection fundamentals",
            price: 299,
            originalPrice: 600,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            // formLink: "https://forms.google.com/example-infosec-beginner",
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
            category: "Red Team",
            title: "Information Security (Advanced)",
            tag: "Move to the next level with advanced security technologies and risk management.",
            duration: "45 hours",
            offer: "",
            description: "Advance your cybersecurity career by mastering cryptography, risk management, system and cloud security, audits, IAM, compliance, and real-world security practices.",
            price: 449,
            originalPrice: 900,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            // formLink: "https://forms.google.com/example-infosec-advanced",
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
            category: "Blue Team",
            title: "SIEM Engineer (Beginner)",
            tag: "Build your foundation in SIEM and SOC monitoring.",
            duration: "30 hours",
            offer: "",
            description: "This course covers SIEM fundamentals, network security, log collection, parsing, and alert generation.",
            price: 299,
            originalPrice: 600,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            // formLink: "https://forms.google.com/example-siem-beginner",
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
            category: "Blue Team",
            title: "SIEM Engineer (Advanced)",
            tag: "Master enterprise SIEM tools and advanced threat detection.",
            duration: "45 hours",
            offer: "",
            description: "This course cover Splunk, wazuh, alert tuning, SOAR tools and advanced analysis",
            price: 449,
            originalPrice: 900,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            // formLink: "https://forms.google.com/example-siem-advanced",
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
            category: "Blue Team",
            title: "Incident Response (Beginner)",
            tag: "Learn how to detect, respond, and contain security incidents.",
            duration: "30 hours",
            offer: "",
            description: "This course cover foundational IR skills, OS-specific incident response , basic log and malware analysis.",
            price: 299,
            originalPrice: 600,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            // formLink: "https://forms.google.com/example-ir-beginner",
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
            category: "Blue Team",
            title: "Incident Response (Advanced)",
            tag: "Handle complex attacks with advanced forensics and response skills.",
            duration: "45 hours",
            offer: "",
            description: "This course cover deeper forensics, memory/registry analysis, AD attacks, reporting and crisis management.",
            price: 449,
            originalPrice: 900,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            // formLink: "https://forms.google.com/example-ir-advanced",
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
            category: "Blue Team",
            title: "SOC Analyst (Beginner)",
            tag: "Start your SOC career with essential monitoring and analysis skills.",
            duration: "30 hours",
            offer: "",
            description: "This course cover foundational knowledge, core SOC operations, and basic analysis skills. Suitable for beginners with little to no prior experience in SOC.",
            price: 299,
            originalPrice: 600,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            // formLink: "https://forms.google.com/example-soc-beginner",
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
            category: "Blue Team",
            title: "SOC Analyst (Advanced)",
            tag: "Operate like a real SOC analyst with hands-on incident response.",
            duration: "45 hours",
            offer: "",
            description: "These are more technical, specialized, and hands-on. Suitable for learners who already have the basics and want to handle real SOC incidents, malware analysis, and lab simulations.",
            price: 449,
            originalPrice: 900,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            // formLink: "https://forms.google.com/example-soc-advanced",
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
            category: "Programming",
            title: "C, C++",
            tag: "Master fundamental and advanced C/C++ programming for efficient, structured code.",
            duration: "60 hours",
            offer: "",
            description: "Learn the fundamental and advanced concepts of both C and C++ programming. Build a strong understanding of syntax, data structures, memory handling, and object-oriented concepts essential for efficient and structured programming.",
            price: 499,
            originalPrice: 1000,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            // formLink: "https://forms.google.com/example-c-cpp",
            badge: "Bestseller",
            syllabus: [
                { week: "Week 1", topic: "C Programming", content: "C Programming Concepts and more." },
                { week: "Week 2", topic: "C Intermediate", content: "C intermediate and more." },
                { week: "Week 3", topic: "C++ Fundamentals", content: "C++ Fundamentals and more." },
                { week: "Week 4", topic: "C++ Advanced", content: "C++ Advanced and more." }
            ]
        },
        {
            id: 11,
            category: "Programming",
            title: "Bash",
            tag: "Automate and streamline system tasks using powerful Bash scripting skills.",
            duration: "30 - 40 hours",
            offer: "",
            description: "Learn how to automate tasks and manage system operations efficiently using BASH scripting. Understand the essentials of scripting in Unix/Linux environments to streamline processes and work with system commands.",
            price: 349,
            originalPrice: 700,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            // formLink: "https://forms.google.com/example-bash",
            badge: "Bestseller",
            syllabus: [
                { week: "Week 1", topic: "Foundations", content: "Foundations and more." },
                { week: "Week 2", topic: "Scripting Basics", content: "Scripting Basics and more." },
                { week: "Week 3", topic: "Loops & Functions", content: "Loops & Functions and more." },
                { week: "Week 4", topic: "Advanced & Projects", content: "Advanced Bash + Projects and more." }
            ]
        },
        {
            id: 12,
            category: "Programming",
            title: "Rust",
            tag: "Master Rust programming to build blazing-fast, memory-safe, and future-ready applications.",
            duration: "35 - 40 hours",
            offer: "",
            description: "Learn the core concepts of the Rust programming language, including memory management, ownership, and concurrency. This course builds a strong foundation for writing safe and high-performance code.",
            price: 399,
            originalPrice: 800,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            // formLink: "https://forms.google.com/example-rust",
            badge: "Bestseller",
            syllabus: [
                { week: "Week 1", topic: "Rust Basics", content: "Rust Basics and more." },
                { week: "Week 2", topic: "Working with Data", content: "Working with Data and more." },
                { week: "Week 3", topic: "Intermediate", content: "Intermediate and more." },
                { week: "Week 4", topic: "Advanced Concepts", content: "Advanced Concepts and more." },
                { week: "Week 5", topic: "Projects", content: "Projects and more." }
            ]
        },
        {
            id: 13,
            category: "Blue Team",
            title: "Cyber Security for Students",
            tag: "Master your advanced fundamentals in Blue team",
            duration: "30 hours",
            offer: "",
            description: "This course equips stuents with essential cybersecurity knowledge and helps beuild their careers in Blue Team",
            price: 399,
            originalPrice: 800,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            // formLink: "https://forms.google.com/example-rust",
            badge: "Comming Soon",
            syllabus: [
                { week: "Week 1", topic: "Comming Soon", content: "Syllabus will be updated soon" },

            ]
        },
        {
            id: 14,
            category: "Red Team",
            title: "Cyber Security for Students",
            tag: "Master your advanced fundamentals in Red team",
            duration: "30 hours",
            offer: "",
            description: "This course equips stuents with essential cybersecurity knowledge and helps beuild their careers in Red Team",
            price: 399,
            originalPrice: 800,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            // formLink: "https://forms.google.com/example-rust",
            badge: "Comming Soon",
            syllabus: [
                { week: "Week 1", topic: "Comming Soon", content: "Syllabus will be updated soon" },

            ]
        },
        {
            id: 15,
            category: "Purple Team",
            title: "Cyber Security for Students",
            tag: "Master your advanced fundamentals in Purple team",
            duration: "60 hours",
            offer: "",
            description: "This course equips stuents with essential cybersecurity knowledge and helps beuild their careers in Purple Team",
            price: 399,
            originalPrice: 800,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            // formLink: "https://forms.google.com/example-rust",
            badge: "Comming Soon",
            syllabus: [
                { week: "Week 1", topic: "Comming Soon", content: "Syllabus will be updated soon" },

            ]
        },
        {
            id: 16,
            category: "Professional",
            title: "Cyber Security for Students",
            tag: "Get entry level job through your skills",
            duration: "30 hours",
            offer: "",
            description: "This gain essential skills for a smooth transition into the cybersecurity industry",
            price: 399,
            originalPrice: 800,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            // formLink: "https://forms.google.com/example-rust",
            badge: "Comming Soon",
            syllabus: [
                { week: "Week 1", topic: "Comming Soon", content: "Syllabus will be updated soon" },

            ]
        },

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
        const filterSelect = document.getElementById('course-filter');

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
                        <div class="mb-2">
                             <span class="badge bg-secondary text-white rounded-pill mb-2 small">${course.category || 'Course'}</span>
                        </div>
                        <h3 class="h5 fw-bold mb-2">${course.title}</h3>
                        <p class="small mb-3 flex-grow-1" style="color: #b0b0b0;">${course.tag.substring(0, 800)}</p>
                        <div class=" justify-content-between d-flex text-center align-items-center mt-auto">
                        <div>
                           ${course.offer ? `<span  class="text-info fw-bold" >${course.offer}</span>` : ''} 
                        </div>
                            <a href="course.html?id=${course.id}" class="btn btn-blue btn-sm rounded-pill px-3">Enquiry</a>
                        </div>
                    </div>
                </div>
            `;
            return col;
        }

        function renderCourses(courseData, limit = null) {
            courseGrid.innerHTML = '';
            const dataToRender = limit ? courseData.slice(0, limit) : courseData;

            if (dataToRender.length === 0) {
                courseGrid.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No courses found for this category.</p></div>';
            }

            dataToRender.forEach((course, index) => {
                const card = createCourseCard(course, index);
                courseGrid.appendChild(card);
                observer.observe(card.querySelector('.course-card'));
            });
        }

        // Initial Render with Default "All" Behavior
        renderCourses(courses, initialCount);

        const badgeFilterSelect = document.getElementById('badge-filter');

        // Combined Filter Function
        function applyFilters() {
            const category = filterSelect ? filterSelect.value : 'all';
            const badge = badgeFilterSelect ? badgeFilterSelect.value : 'all';

            // Filter logic
            let filtered = courses;

            if (category !== 'all') {
                filtered = filtered.filter(c => c.category === category);
            }

            if (badge !== 'all') {
                filtered = filtered.filter(c => c.badge === badge);
            }

            // Determine if we are keeping the "View More" functionality active
            // We only keep standard pagination if NO filters are active
            const isFiltering = category !== 'all' || badge !== 'all';

            if (isFiltering) {
                renderCourses(filtered); // Show all results for the filter combination
                if (toggleCoursesBtn) toggleCoursesBtn.style.display = 'none';
                isExpanded = false; // Reset expansion logic implicitly
            } else {
                // No filters active: show initial count or all based on isExpanded
                if (isExpanded) {
                    renderCourses(courses);
                    if (toggleCoursesBtn) {
                        toggleCoursesBtn.style.display = 'inline-block';
                        toggleCoursesBtn.innerText = 'Show Less';
                    }
                } else {
                    renderCourses(courses, initialCount);
                    if (toggleCoursesBtn) {
                        toggleCoursesBtn.style.display = 'inline-block';
                        toggleCoursesBtn.innerText = 'View All Courses';
                    }
                }
            }
        }

        // Attach listeners
        if (filterSelect) {
            filterSelect.addEventListener('change', () => {
                isExpanded = false; // Reset pagination when filter changes
                applyFilters();
            });
        }
        if (badgeFilterSelect) {
            badgeFilterSelect.addEventListener('change', () => {
                isExpanded = false; // Reset pagination when filter changes
                applyFilters();
            });
        }

        // Clear Filters Button Logic
        const clearFiltersBtn = document.getElementById('clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                // Reset select values
                if (filterSelect) filterSelect.value = 'all';
                if (badgeFilterSelect) badgeFilterSelect.value = 'all';

                // Reset state
                isExpanded = false;

                // Re-apply (will trigger default 'all' view)
                applyFilters();
            });
        }

        // View All / Show Less Toggle Logic
        if (toggleCoursesBtn) {
            toggleCoursesBtn.addEventListener('click', () => {
                isExpanded = !isExpanded;
                applyFilters(); // Re-run render with new isExpanded state (only matters if no filters)

                // Scroll back logic
                if (!isExpanded) {
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


    // ==========================
    // Course Details Rendering (Course Page)
    // ==========================
    const detailsContainer = document.getElementById('course-details-container');

    if (detailsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = parseInt(urlParams.get('id'));
        const course = courses.find(c => c.id === courseId);

        if (course) {
            // Generate Syllabus Table HTML if syllabus exists
            let syllabusHtml = '';
            if (course.syllabus && course.syllabus.length > 0) {
                // Extract Duration from tag (e.g. "75 hours: ...")
                // const duration = course.tag ? course.tag.split(':')[0] : ''; ---------------------------------------------
                const durations = course.duration;

                syllabusHtml = `
                    <div class="mt-5">
                         <h2 class="section-title text-center mb-5 display-5">Course Syllabus</h2>
                         ${durations ? `<h4 class="text-center text-primary mb-4"><i class="fas fa-clock me-2"></i>Duration: ${durations}</h4>` : ''}
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
                            <a href="https://forms.gle/wE1T8SWjzhLvM1H66" target="_blank" class="btn btn-primary d-block">Fill Admission Form</a>
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

