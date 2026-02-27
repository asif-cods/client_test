// courses.js - Dynamic Course Management

// Course Data
const coursesData = [
    // Ethical Hacking Courses
    {
        id: 1,
        title: "Foundational Bug Hunting course",
        category: "ethical-hacking",
        image: "assets/images/courses/c1.jpeg",
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
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop",
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
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
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
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
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
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop",
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
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=250&fit=crop",
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
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
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
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
        duration: "",
        level: "Beginner",
        link: "https://www.thecyberrakshak.com/courses/762667?mainCategory=144",
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
const coursesGrid = document.getElementById('coursesGrid');
const showMoreBtn = document.getElementById('showMoreBtn');
const filterButtons = document.querySelectorAll('.filter-btn');
const levelFilterButtons = document.querySelectorAll('.level-btn');

// Render Courses
function renderCourses(categoryFilter = currentFilter, levelFilter = currentLevelFilter, limit = displayedCourses) {
    let filteredCourses = coursesData;

    if (categoryFilter !== 'all') {
        filteredCourses = filteredCourses.filter(course => course.category === categoryFilter);
    }

    if (levelFilter !== 'all') {
        filteredCourses = filteredCourses.filter(course => course.level.toLowerCase() === levelFilter.toLowerCase());
    }

    const coursesToShow = filteredCourses.slice(0, limit);

    coursesGrid.innerHTML = '';

    coursesToShow.forEach((course, index) => {
        const courseCard = createCourseCard(course, index);
        coursesGrid.innerHTML += courseCard;
    });

    // Update show more button
    updateShowMoreButton(filteredCourses.length, limit);

    // Re-init Vanilla Tilt for new cards
    if (typeof VanillaTilt !== 'undefined') {
        setTimeout(() => {
            VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.3,
            });
        }, 100);
    }
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
                    <img src="${course.image}" alt="${course.title}" class="img-fluid">
                    <div class="overlay"></div>
                </div>
                <div class="card-body p-4">
                    <h4>${course.title}</h4>
                    <div class="course-meta d-flex justify-content-between mb-3 small">
                        <span><i class="far fa-clock"></i> ${course.duration}</span>
                        <span><i class="fas fa-signal"></i> ${course.level}</span>
                    </div>
                    <div class="price mb-3 text-white fw-bold">
                        <span class="fs-5">${course.price}</span>
                        ${course.oldPrice ? `<small class=" text-decoration-line-through ms-2">${course.oldPrice}</small>` : ''}
                    </div>
                    <a href="${enrollLink}"${linkTarget} class="btn btn-sm btn-cyber w-100">Enroll Now</a>
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
});
