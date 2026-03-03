const studentsPlaced = [
    {
        name: "MARK CLIFARD",
        role: "CYBER SECURITY ANALYST",
        ctc: "",
        image: "assets/images/Students-placed/st-1.png",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/23/Zoho_Corporation_logo.svg",
        companyName: "Zoho"
    },
    {
        name: "MAGESH RAO",
        role: "ETHICAL HACKER",
        ctc: "",
        image: "assets/images/Students-placed/st-2.png",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        companyName: "Google"
    },
    {
        name: "PREM KUMAR",
        role: "VAPT SPECIALIST",
        ctc: "",
        image: "assets/images/Students-placed/st-3.png",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/d/de/HCL_Technologies_logo.svg",
        companyName: "HCL"
    },
    {
        name: "VISHAL",
        role: "DIGITAL FORENSIC EXPERT",
        ctc: "",
        image: "assets/images/Students-placed/st-1.png",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
        companyName: "Infosys"
    }
];

const studentStories = [
    {
        name: "Rahul Sharma",
        role: "",
        feedback: "CyberRakshak transformed my career! From zero knowledge to landing a SOC Analyst position at a Fortune 500 company in 6 months.",
        initial: "R"
    },
    {
        name: "Priya Patel",
        role: "",
        feedback: "The mentors here are phenomenal! They're always available to help and guide you through complex topics. I cleared my CEH on first attempt.",
        initial: "P"
    },
    {
        name: "Arjun Kumar",
        role: "",
        feedback: "Best decision of my life! The course structure is perfect for beginners. I'm successfully hunting bugs and earning through bug bounty.",
        initial: "A"
    },
    {
        name: "Sneha Reddy",
        role: "",
        feedback: "The placement support is incredible. Got interviewed by 5 top companies and received 3 offers. loving Every moment!",
        initial: "S"
    },
    {
        name: "Yunit Kumar",
        role: "",
        feedback: "The practical case studies helped me understand real-world investigations. Highly recommended for forensic enthusiasts.",
        initial: "Y"
    }
];

const galleryData = {
    workshop: [
        { url: "assets/images/gallaery/WhatsAppImage20250619at3_1750328518670.webp", desc: "Interactive Cyber Awareness Drive at College Campus" },
        { url: "assets/images/gallaery/WhatsAppImage20250619at3_1750327442370.webp", desc: "Expert Hands-on Ethical Hacking Workshop" },
        { url: "assets/images/gallaery/9D3A3868_1750327592170.webp", desc: "Public Seminar on Digital Security and Privacy" },
        { url: "assets/images/gallaery/WhatsAppImage20250619at3_1750327745381.webp", desc: "Corporate Security Training & Awareness" }
    ],
    achievement: [
        { url: "assets/images/achivement-img/16_20260213_134735_0015.png", desc: "Elite Cybersecurity Excellence Certificate" },
        { url: "assets/images/achivement-img/18_20260213_134735_0017.png", desc: "National Cyber Security Recognition Award" },
        { url: "assets/images/achivement-img/21_20260213_134735_0020.png", desc: "100+ Successful Placements in Top MNCs" },
        { url: "assets/images/achivement-img/22_20260213_134735_0021.png", desc: "Award for Best Training Institute in Rajasthan" }
    ],
    training: [
        { url: "assets/images/gallaery/ter1_1750327151978.webp", desc: "Advanced Forensic Lab Setup & Training" },
        { url: "assets/images/gallaery/1J5A2305_1750327247377.webp", desc: "Industrial Grade SOC Operations Training" },
        { url: "assets/images/gallaery/9D3A3873_1750327622177.webp", desc: "Live Bug Hunting and VAPT Session" },
        { url: "assets/images/gallaery/9D3A4001_1750327603420.webp", desc: "Real-world Network Infiltration Simulations" }
    ]
};

function renderGalleryMarrquee(category = 'all') {
    const galleryTrack = document.querySelector('.gallery-track');
    if (!galleryTrack) return;

    let items = [];
    if (category === 'all') {
        items = [...galleryData.workshop, ...galleryData.achievement, ...galleryData.training];
    } else {
        items = galleryData[category] || [];
    }

    const createGalleryItem = (item) => `
        <div class="gallery-marquee-item">
            <img src="${item.url}" alt="Success Milestone">
            <div class="gallery-marquee-desc">
                <p class="mb-0 text-white small">${item.desc}</p>
            </div>
        </div>
    `;

    // Render twice for infinite loop
    const galleryHTML = items.map(createGalleryItem).join('');
    galleryTrack.innerHTML = galleryHTML + galleryHTML;

    // Reset animation
    galleryTrack.style.animation = 'none';
    galleryTrack.offsetHeight; // Trigger reflow
    galleryTrack.style.animation = null;
}

function initDynamicContent() {
    // 1. Render Students Placed Marquee
    const placedTrack = document.querySelector('#students-placed .placed-track');
    if (placedTrack) {
        const createPlacedCard = (student) => `
            <div class="placed-card">
                <div class="placed-photo-wrapper">
                    <div class="photo-bg-circle"></div>
                    <img src="${student.image}" class="student-photo" alt="${student.name}">
                    <div class="company-logo-badge">
                        <img src="${student.companyLogo}" alt="${student.companyName}">
                    </div>
                </div>
                <div class="placed-info">
                    <h5>${student.name}</h5>
                    <p class="role">${student.role}</p>
                    <p class="ctc">${student.ctc}</p>
                </div>
            </div>
        `;

        // Render twice for infinite loop
        const placedHTML = studentsPlaced.map(createPlacedCard).join('');
        placedTrack.innerHTML = placedHTML + placedHTML;
    }

    // 2. Render Student Stories Marquee
    const storiesTrack = document.querySelector('#testimonials .marquee-track');
    if (storiesTrack) {
        const createStoryCard = (story) => `
            <div class="student-card">
                <div class="student-info">
                    <div class="student-avatar">${story.initial}</div>
                    <div class="student-details">
                        <h5>${story.name}</h5>
                        <div class="working-as">${story.role}</div>
                    </div>
                </div>
                <p class="student-feedback">"${story.feedback}"</p>
            </div>
        `;

        // Render twice for infinite loop
        const storiesHTML = studentStories.map(createStoryCard).join('');
        storiesTrack.innerHTML = storiesHTML + storiesHTML;
    }

    // 3. Render Gallery Marquee
    const galleryTrack = document.querySelector('.gallery-track');
    if (galleryTrack) {
        renderGalleryMarrquee('all');
    }
}

// Global initialization
document.addEventListener('DOMContentLoaded', initDynamicContent);
