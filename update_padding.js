const fs = require('fs');
const files = ['contact.html', 'gallery.html', 'course-details.html'];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');

    // Quick regex to inject media query for mobile top padding right before closing style tag
    const mediaQueryInjection = `
        /* Mobile spacing adjustments */
        @media (max-width: 768px) {
            .contact-page-section,
            .gallery-page-header,
            .course-details-section {
                padding-top: 100px !important;
                padding-bottom: 40px !important;
            }
        }
    </style>`;

    if (!content.includes('Mobile spacing adjustments')) {
        content = content.replace('</style>', mediaQueryInjection);
        fs.writeFileSync(file, content);
        console.log(`Updated mobile padding in ${file}`);
    }
}
