// course-details.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Course ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id'));

    if (!courseId) {
        window.location.href = 'index.html#courses';
        return;
    }

    // 2. Find Course in Data
    // Note: coursesData is available because courses.js is loaded before this script
    const course = coursesData.find(c => c.id === courseId);

    if (!course) {
        console.error('Course not found');
        // Optionally show "Course not found" message on page
        return;
    }

    // 3. Populate Page Content
    document.title = `${course.title} | CyberRakshak`;

    const titleEl = document.getElementById('course-title');
    const imageEl = document.getElementById('course-image');
    const descEl = document.getElementById('course-description');
    const categoryEl = document.getElementById('course-category');
    const levelEl = document.getElementById('course-level');
    const durationEl = document.getElementById('course-duration');
    const priceEl = document.getElementById('course-price');
    const oldPriceEl = document.getElementById('course-old-price');
    const enrollBtn = document.getElementById('enroll-button-link');

    if (titleEl) titleEl.innerText = course.title;
    if (imageEl) {
        imageEl.src = course.image;
        imageEl.alt = course.title;
    }
    if (descEl) {
        // Use course description if available, otherwise show a default or larger text
        descEl.innerHTML = course.description || "Take your cybersecurity skills to the next level with our comprehensive training program. This course is designed to provide you with deep technical knowledge and practical skills that are immediately applicable in the industry.";

        // If description is short, add some generic high-tech filler text to make it look premium
        if (!course.description || course.description.length < 50) {
            descEl.innerHTML += "<br><br>Our curriculum covers theoretical foundations as well as hands-on laboratory exercises. You'll work with the latest security tools and methodologies used by top-tier security analysts and ethical hackers around the globe.";
        }
    }

    if (categoryEl) categoryEl.innerText = formatCategory(course.category);
    if (levelEl) levelEl.innerText = course.level || 'Expert';
    if (durationEl) durationEl.innerText = course.duration || 'Flexible Duration';

    if (priceEl) priceEl.innerText = course.price;
    if (oldPriceEl) oldPriceEl.innerText = course.oldPrice || '';

    if (enrollBtn) {
        // The enroll link from coursesData (external link)
        enrollBtn.href = course.link || '#';
    }
});

function formatCategory(category) {
    if (!category) return 'General';
    return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
