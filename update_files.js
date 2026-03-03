const fs = require('fs');
const path = require('path');

function replaceBlock(content, startLabel, endLabel, newBlock) {
    const startIndex = content.indexOf(startLabel);
    if (startIndex !== -1) {
        const endIndex = content.indexOf(endLabel, startIndex);
        if (endIndex !== -1) {
            return content.substring(0, startIndex) + newBlock + content.substring(endIndex + endLabel.length);
        }
    }
    return content;
}

try {
    const indexSrc = fs.readFileSync('index.html', 'utf-8');

    const navStart = '<!-- Navigation -->';
    const navEnd = '</nav>';
    const navHtml = navStart + indexSrc.substring(indexSrc.indexOf(navStart) + navStart.length, indexSrc.indexOf(navEnd) + navEnd.length);

    const footStart = '<!-- Footer -->';
    const footEnd = '</footer>';
    const footerHtml = footStart + indexSrc.substring(indexSrc.indexOf(footStart) + footStart.length, indexSrc.indexOf(footEnd) + footEnd.length);

    const waStart = '<!-- ===== WhatsApp Float Button ===== -->';
    const waEnd = '<!-- WhatsApp Script -->';
    let waHtml = waStart + indexSrc.substring(indexSrc.indexOf(waStart) + waStart.length, indexSrc.lastIndexOf('</script>') + 9);
    // actually, let's grab from waStart to </body>
    waHtml = indexSrc.substring(indexSrc.indexOf(waStart), indexSrc.lastIndexOf('</body>'));

    const fileList = ['contact.html', 'gallery.html', 'course-details.html'];

    fileList.forEach(file => {
        let content = fs.readFileSync(file, 'utf-8');

        // Replace Navigation
        content = replaceBlock(content, '<!-- Navigation -->', '</nav>', navHtml);

        // Replace Footer
        content = replaceBlock(content, '<!-- Footer -->', '</footer>', footerHtml);

        // Inject WhatsApp
        if (!content.includes('wa-float-btn')) {
            content = content.replace('</body>', waHtml + '\n</body>');
        } else {
            content = replaceBlock(content, '<!-- ===== WhatsApp Float Button ===== -->', '</script>\n\n</body>', waHtml + '\n</body>');
            // some might have \r\n, simpler:
            const bStart = content.indexOf('<!-- ===== WhatsApp Float Button ===== -->');
            if (bStart !== -1) {
                const bEnd = content.lastIndexOf('</body>');
                content = content.substring(0, bStart) + waHtml + content.substring(bEnd);
            }
        }

        // Remove padding issues using style updates (instead of JS appending, doing string replace on css file was done earlier)

        fs.writeFileSync(file, content);
        console.log('Successfully updated ' + file);
    });
} catch (e) {
    console.log("Error: " + e.message);
}
