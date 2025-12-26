// courses.js - Dynamic Course Management

// Course Data
const coursesData = [
    // Ethical Hacking Courses
    {
        id: 1,
        title: "Ethical Hacking Fundamentals",
        category: "ethical-hacking",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
        duration: "12 Weeks",
        level: "Beginner",
        link: "https://superprofile.bio/course/b033dc99-b91b-43b1-b143-ee30713a22bb",
        price: "$499",
        badge: "POPULAR",
        description: "Master the art of ethical hacking from scratch"
    },
    {
        id: 2,
        title: "Bug Bounty Hunting",
        category: "ethical-hacking",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop",
        duration: "14 Weeks",
        level: "Advanced",
        link: "https://superprofile.bio/vp/681e0015d28af900137d24ef",
        price: "$799",
        badge: "",
        description: "Deep dive into advanced pentesting techniques"
    },
    {
        id: 3,
        title: "Web Application Security",
        category: "ethical-hacking",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
        duration: "10 Weeks",
        level: "Intermediate",
        link: "https://superprofile.bio/vp/6734af001e544600136eed86",
        price: "$599",
        badge: "",
        description: "Secure web applications against attacks"
    },
    {
        id: 4,
        title: "Cyber Security Professional",
        category: "ethical-hacking",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
        duration: "12 Weeks",
        level: "Intermediate",
        link: "https://superprofile.bio/vp/684d357205d9340013cc0d4a",
        price: "$649",
        badge: "",
        description: "Master network penetration testing"
    },

    // Cyber Crime Courses
    {
        id: 5,
        title: "Cyber Shakti Program",
        category: "cyber-crime",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop",
        duration: "10 Weeks",
        level: "Intermediate",
        link: "https://www.thecyberrakshak.com/courses/758019",
        price: "$699",
        badge: "",
        description: "Learn to investigate digital crimes"
    },
    {
        id: 6,
        title: "Digital Forensics Expert",
        category: "cyber-crime",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=250&fit=crop",
        duration: "16 Weeks",
        level: "Expert",
        link: "",
        price: "$899",
        badge: "NEW",
        description: "Advanced digital forensics techniques"
    },
    {
        id: 7,
        title: "Incident Response & Recovery",
        category: "cyber-crime",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
        duration: "8 Weeks",
        level: "Advanced",
        link: "",
        price: "$749",
        badge: "",
        description: "Handle security incidents effectively"
    },
    {
        id: 8,
        title: "Malware Analysis",
        category: "cyber-crime",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
        duration: "12 Weeks",
        level: "Advanced",
        link: "",
        price: "$799",
        badge: "",
        description: "Analyze and reverse engineer malware"
    },

    // Digital Marketing Courses
    {
        id: 9,
        title: "Digital Marketing Mastery",
        category: "digital-marketing",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
        duration: "10 Weeks",
        level: "Beginner",
        link: "https://www.thecyberrakshak.com/courses/762667?mainCategory=144",
        price: "$399",
        badge: "TRENDING",
        description: "Complete digital marketing bootcamp"
    },
    {
        id: 10,
        title: "Social Media Marketing",
        category: "digital-marketing",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop",
        duration: "8 Weeks",
        level: "Beginner",
        link: "",
        price: "$349",
        badge: "",
        description: "Master social media platforms"
    },
    {
        id: 11,
        title: "SEO & Content Strategy",
        category: "digital-marketing",
        image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400&h=250&fit=crop",
        duration: "6 Weeks",
        level: "Intermediate",
        link: "",
        price: "$449",
        badge: "",
        description: "Optimize content for search engines"
    },
    {
        id: 12,
        title: "Email Marketing Automation",
        category: "digital-marketing",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop",
        duration: "4 Weeks",
        level: "Intermediate",
        link: "",
        price: "$299",
        badge: "",
        description: "Automate email campaigns effectively"
    }
];

// State Management
let currentFilter = 'all';
let displayedCourses = 4; // Initially show 4 courses
const coursesPerPage = 4;

// DOM Elements
const coursesGrid = document.getElementById('coursesGrid');
const showMoreBtn = document.getElementById('showMoreBtn');
const filterButtons = document.querySelectorAll('.filter-btn');

// Render Courses
function renderCourses(filter = 'all', limit = displayedCourses) {
    const filteredCourses = filter === 'all'
        ? coursesData
        : coursesData.filter(course => course.category === filter);

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
                    <div class="price mb-3 text-white fw-bold">${course.price}</div>
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
        renderCourses(currentFilter, displayedCourses);
    });
});

// Show More/Less Functionality
showMoreBtn.addEventListener('click', () => {
    const filteredCourses = currentFilter === 'all'
        ? coursesData
        : coursesData.filter(course => course.category === currentFilter);

    if (showMoreBtn.classList.contains('show-less')) {
        // Show less
        displayedCourses = coursesPerPage;
    } else {
        // Show more
        displayedCourses += coursesPerPage;
    }

    renderCourses(currentFilter, displayedCourses);

    // Scroll to courses section
    document.getElementById('courses').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
});
