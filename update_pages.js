const fs = require('fs');
const path = require('path');

const indexContent = fs.readFileSync('index.html', 'utf-8');

// Extract Navbar Object
const navStart = '<!-- Navigation -->';
const navEnd = '</nav>';
const navSection = indexContent.substring(
    indexContent.indexOf(navStart),
    indexContent.indexOf(navEnd) + navEnd.length
);

// Extract Footer Object
const footerStart = '<!-- Footer -->';
const footerEnd = '</footer>';
const footerSection = indexContent.substring(
    indexContent.indexOf(footerStart),
    indexContent.indexOf(footerEnd) + footerEnd.length
);

// Extract WhatsApp Module
const waStart = '<!-- ===== WhatsApp Float Button ===== -->';
const waEnd = '<!-- WhatsApp Script -->';
const waSection = indexContent.substring(
    indexContent.indexOf(waStart),
    indexContent.lastIndexOf('</body>')
).trim();

const targetPages = ['contact.html', 'gallery.html', 'course-details.html'];

for (const page of targetPages) {
    if (!fs.existsSync(page)) continue;

    let pageContent = fs.readFileSync(page, 'utf-8');

    // 1. Replace Navigation
    const pageNavStart = pageContent.indexOf(navStart);
    const pageNavEnd = pageContent.indexOf(navEnd, pageNavStart) + navEnd.length;
    if (pageNavStart !== -1 && pageNavEnd !== -1) {
        pageContent = pageContent.substring(0, pageNavStart) + navSection + pageContent.substring(pageNavEnd);
    }

    // 2. Replace Footer
    const pageFooterStart = pageContent.indexOf(footerStart);
    const pageFooterEnd = pageContent.indexOf(footerEnd, pageFooterStart) + footerEnd.length;
    if (pageFooterStart !== -1 && pageFooterEnd !== -1) {
        pageContent = pageContent.substring(0, pageFooterStart) + footerSection + pageContent.substring(pageFooterEnd);
    }

    // 3. Inject WhatsApp Float (if not exists)
    if (!pageContent.includes(waStart)) {
        pageContent = pageContent.replace('</body>', '\n    ' + waSection + '\n</body>');
    } else {
        const pageWaStart = pageContent.indexOf(waStart);
        const pageWaEnd = pageContent.lastIndexOf('</body>');
        if (pageWaStart !== -1 && pageWaEnd !== -1) {
            pageContent = pageContent.substring(0, pageWaStart) + '\n    ' + waSection + '\n' + pageContent.substring(pageWaEnd);
        }
    }

    fs.writeFileSync(page, pageContent);
    console.log(`Successfully updated layout modules for ${page}`);
}
