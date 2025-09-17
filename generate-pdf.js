const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
    console.log('Generating PDF presentation for Builders Month...');
    
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        
        // Load the HTML file
        const htmlPath = `file://${path.resolve(__dirname, 'builders-month-presentation.html')}`;
        await page.goto(htmlPath, {
            waitUntil: 'networkidle2'
        });
        
        // Set viewport to match slide dimensions
        await page.setViewport({
            width: 1920,
            height: 1080
        });
        
        // Generate PDF with specific settings for presentation
        await page.pdf({
            path: 'builders-month-presentation.pdf',
            format: 'A4',
            landscape: true,
            printBackground: true,
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            scale: 0.5 // Scale to fit A4 landscape
        });
        
        console.log('✅ PDF generated successfully: builders-month-presentation.pdf');
    } catch (error) {
        console.error('Error generating PDF:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

generatePDF();