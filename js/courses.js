// courses.js - Dynamic Course Management

// Course Data
const coursesData = [
    // Ethical Hacking Courses
    {
        id: 1,
        title: "Foundational Bug Hunting course",
        category: "ethical-hacking",
        image: "assets/images/courses/c-1.jpg",
        duration: "3 Months",
        level: "Beginner",
        link: "https://superprofile.bio/course/b033dc99-b91b-43b1-b143-ee30713a22bb",
        price: "₹8,000",
        oldPrice: "₹10,000",
        badge: "POPULAR",
        description: "Master the art of Bug Hunting from scratch"
    },
    {
        id: 2,
        title: "Advance Bug Hunting course",
        category: "ethical-hacking",
        image: "assets/images/courses/c-2.png",
        duration: "6 Months",
        level: "Expert",
        link: "https://superprofile.bio/vp/681e0015d28af900137d24ef",
        price: "₹15,000",
        oldPrice: "₹20,000",
        badge: "Trending",
        description: "Deep dive into advanced Bug Hunting techniques"
    },
    {
        id: 3,
        title: "Digital Forensics",
        category: "cyber-crime",
        image: "assets/images/courses/c-3.png",
        duration: "",
        level: "Intermediate",
        link: "https://superprofile.bio/vp/6734af001e544600136eed86",
        price: "₹22,000",
        oldPrice: "₹25,000",
        badge: "Popular",
        description: "Secure web applications against attacks"
    },
    {
        id: 4,
        title: "Cyber Crime Investigation",
        category: "cyber-crime",
        image: "assets/images/courses/c-4.png",
        duration: "",
        level: "Advanced",
        link: "https://superprofile.bio/vp/684d357205d9340013cc0d4a",
        price: "₹35,000",
        oldPrice: "₹40,000",
        badge: "Popular",
        description: ""
    },

    // Cyber Crime Courses
    {
        id: 5,
        title: "Ethical Hacking Penetration Testing",
        category: "ethical-hacking",
        image: "assets/images/courses/c-5.png",
        duration: "6 Months",
        level: "",
        link: "https://www.thecyberrakshak.com/courses/758019",
        price: "₹38,000",
        oldPrice: "₹40,000",
        badge: "Popular",
        description: ""
    },
    {
        id: 6,
        title: "Foundation SOC",
        category: "cyber-crime",
        image: "assets/images/courses/c-6.png",
        duration: "",
        level: "Expert",
        link: "",
        price: "₹8,000",
        oldPrice: "₹15,000",
        badge: "Popular",
        description: ""
    },
    {
        id: 7,
        title: "Advance SIEM COURSE",
        category: "ethical-hacking",
        image: "assets/images/courses/c-7.png",
        duration: "",
        level: "Advanced",
        link: "",
        price: "₹25,000",
        oldPrice: "₹30,000",
        badge: "Popular",
        description: "Handle security incidents effectively"
    },

    // Digital Marketing Courses
    {
        id: 8,
        title: "AI Powered Digital Marketing",
        category: "digital-marketing",
        image: "assets/images/courses/c-8.png",
        duration: "",
        level: "Beginner",
        link: "https://classplusapp.com/w/cyberrakshaktrainings/courses/791769?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
        price: "₹3,000",
        oldPrice: "₹5,000",
        badge: "Popular",
        description: "Complete AI Powered Digital Marketing bootcamp"
    }

];

// State Management
let currentFilter = 'all';
let currentLevelFilter = 'all';
let displayedCourses = 4; // Initially show 4 courses
const coursesPerPage = 4;

// DOM Elements
const showMoreBtn = document.getElementById('showMoreBtn');
const filterButtons = document.querySelectorAll('.filter-btn');
const levelFilterButtons = document.querySelectorAll('.level-btn');

// Render Courses
function renderCourses(categoryFilter = currentFilter, levelFilter = currentLevelFilter, limit = displayedCourses) {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;

    let filteredCourses = coursesData;

    if (categoryFilter !== 'all') {
        filteredCourses = filteredCourses.filter(course => course.category === categoryFilter);
    }

    if (levelFilter !== 'all') {
        filteredCourses = filteredCourses.filter(course =>
            course.level && course.level.toLowerCase() === levelFilter.toLowerCase()
        );
    }

    const coursesToShow = filteredCourses.slice(0, limit);

    // Use a document fragment or build a string once for performance
    let gridHTML = '';
    coursesToShow.forEach((course, index) => {
        gridHTML += createCourseCard(course, index);
    });

    coursesGrid.innerHTML = gridHTML;

    // Handle empty state
    if (gridHTML === '') {
        coursesGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="no-results-icon mb-3">
                    <i class="fas fa-search fa-3x text-secondary opacity-50"></i>
                </div>
                <h4 class="text-secondary">No courses found matching your criteria.</h4>
            </div>
        `;
    }

    // Update show more button
    updateShowMoreButton(filteredCourses.length, limit);

    // Re-init animations and effects for new cards
    setTimeout(() => {
        // Vanilla Tilt
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.3,
            });
        }

        // Refresh AOS to detect new elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        // Refresh GSAP ScrollTrigger to recalculate offsets
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 100);
}

// Create Course Card HTML
function createCourseCard(course, index) {
    // Handle link - use # if link is empty or undefined
    const enrollLink = course.link && course.link.trim() !== '' ? course.link : '#';
    const linkTarget = enrollLink !== '#' ? ' target="_blank"' : '';

    return `
        <div class="col-md-6 col-lg-3 course-item" data-category="${course.category}" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="course-card glass-card" data-tilt>
                ${course.badge ? `<div class="card-badge">${course.badge}</div>` : ''}
                <div class="card-img-top position-relative">
                    <img src="${course.image}" alt="${course.title}" class="img-fluid" loading="lazy">
                    <div class="overlay"></div>
                </div>
                <div class="card-body p-4">
                    <h4>${course.title}</h4>
                    <div class="course-meta d-flex justify-content-between mb-3 small">
                        ${course.duration ? `<span><i class="far fa-clock"></i> ${course.duration}</span>` : ''}
                        ${course.level ? `<span><i class="fas fa-signal"></i> ${course.level}</span>` : ''}
                    </div>
                    <div class="price mb-3 text-white fw-bold">
                        <span class="fs-5">${course.price}</span>
                        ${course.oldPrice ? `<small class=" text-decoration-line-through ms-2">${course.oldPrice}</small>` : ''}
                    </div>
                    <a href="course-details.html?id=${course.id}" class="btn btn-sm btn-cyber w-100">Enroll Now</a>
                </div>
            </div>
        </div>
    `;
}

// Update Show More Button
function updateShowMoreButton(totalCourses, currentLimit) {
    const showMoreContainer = document.getElementById('showMoreContainer');

    // Always show the button if there are more than 4 courses
    if (totalCourses <= 4) {
        // Only hide if 4 or fewer courses total
        showMoreContainer.style.display = 'none';
    } else {
        showMoreContainer.style.display = 'block';
        const remainingCourses = totalCourses - currentLimit;

        if (currentLimit >= totalCourses) {
            // All courses are showing, enable "Show Less"
            showMoreBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less';
            showMoreBtn.classList.add('show-less');
        } else {
            // More courses to show
            showMoreBtn.innerHTML = `<i class="fas fa-chevron-down"></i> Show More (${remainingCourses} more)`;
            showMoreBtn.classList.remove('show-less');
        }
    }
}

// Filter Functionality
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        // Get filter value
        currentFilter = btn.dataset.filter;
        displayedCourses = coursesPerPage; // Reset to initial count

        // Render filtered courses
        renderCourses(currentFilter, currentLevelFilter, displayedCourses);
    });
});

// Level Filter Functionality
levelFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        levelFilterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentLevelFilter = btn.dataset.level;
        displayedCourses = coursesPerPage;

        renderCourses(currentFilter, currentLevelFilter, displayedCourses);
    });
});

// Show More/Less Functionality
if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        let filteredCourses = coursesData;
        if (currentFilter !== 'all') {
            filteredCourses = filteredCourses.filter(course => course.category === currentFilter);
        }
        if (currentLevelFilter !== 'all') {
            filteredCourses = filteredCourses.filter(course => course.level.toLowerCase() === currentLevelFilter.toLowerCase());
        }

        if (showMoreBtn.classList.contains('show-less')) {
            // Show less
            displayedCourses = coursesPerPage;
            document.getElementById('courses').scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Show ALL remaining courses
            displayedCourses = filteredCourses.length;
        }

        renderCourses(currentFilter, currentLevelFilter, displayedCourses);
    });
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderCourses();
    });
} else {
    // Already loaded
    renderCourses();
}
