const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
    console.log('Generating English version PDF...');
    
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport to match slide dimensions
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 2
    });
    
    // Load the HTML file
    const htmlPath = `file://${path.resolve(__dirname, 'builders-month-presentation-en.html')}`;
    await page.goto(htmlPath, {
        waitUntil: 'networkidle0'
    });
    
    // Generate PDF
    await page.pdf({
        path: 'builders-month-presentation-en.pdf',
        format: 'A4',
        landscape: true,
        printBackground: true,
        preferCSSPageSize: true,
        margin: {
            top: '0',
            right: '0',
            bottom: '0',
            left: '0'
        }
    });
    
    await browser.close();
    console.log('✅ English PDF generated successfully: builders-month-presentation-en.pdf');
}

generatePDF().catch(console.error);