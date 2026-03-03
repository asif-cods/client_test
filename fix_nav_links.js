const fs = require('fs');

const targetPages = ['contact.html', 'gallery.html', 'course-details.html'];

for (const page of targetPages) {
    if (!fs.existsSync(page)) continue;

    let content = fs.readFileSync(page, 'utf-8');

    // Update navigation links to point back to index.html
    content = content.replace(/href="#hero"/g, 'href="index.html#hero"');
    content = content.replace(/href="#about"/g, 'href="index.html#about"');
    content = content.replace(/href="#courses"/g, 'href="index.html#courses"');
    content = content.replace(/href="#testimonials"/g, 'href="index.html#testimonials"');

    // Also fix the footer Quick Links that point to #hero/#about/#courses
    // My previous script might have already done some of this (I see index.html#about in the user diff for gallery footer), but let's be sure.

    fs.writeFileSync(page, content);
    console.log(`Updated navbar anchor paths for ${page}`);
}
