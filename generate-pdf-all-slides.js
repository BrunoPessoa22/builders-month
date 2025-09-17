const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
    console.log('Generating top-notch Builders Month PDF with all slides...');
    
    // Read the HTML file
    const htmlPath = path.resolve(__dirname, 'builders-month-presentation.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Create a modified version that shows all slides for PDF
    // Add CSS to ensure all slides are visible and properly formatted
    const pdfStyles = `
        <style>
            @media print {
                body {
                    margin: 0;
                    padding: 0;
                }
                
                .slide {
                    width: 100vw !important;
                    height: 100vh !important;
                    page-break-after: always !important;
                    page-break-inside: avoid !important;
                    position: relative !important;
                    display: flex !important;
                    opacity: 1 !important;
                    transform: none !important;
                    margin: 0 !important;
                    padding: 80px !important;
                    box-sizing: border-box !important;
                    overflow: hidden !important;
                }
                
                .slide:last-child {
                    page-break-after: avoid !important;
                }
                
                /* Hide navigation elements */
                .navigation,
                .nav-arrows {
                    display: none !important;
                }
                
                /* Ensure backgrounds are printed */
                * {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                }
                
                /* Fix gradient text for PDF */
                .highlight,
                .main-title,
                .section-title,
                .cta-title,
                .prize-amount,
                .stat-number {
                    -webkit-print-color-adjust: exact !important;
                }
            }
            
            /* Override for PDF generation */
            .slide {
                width: 1920px !important;
                height: 1080px !important;
                position: relative !important;
                display: flex !important;
                opacity: 1 !important;
                page-break-after: always !important;
                margin: 0 !important;
            }
        </style>
    `;
    
    // Insert the PDF styles before </head>
    htmlContent = htmlContent.replace('</head>', pdfStyles + '</head>');
    
    // Write modified HTML to temp file
    const tempHtmlPath = path.resolve(__dirname, 'temp-pdf-builders.html');
    fs.writeFileSync(tempHtmlPath, htmlContent);
    
    const browser = await puppeteer.launch({
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--window-size=1920,1080'
        ]
    });
    
    try {
        const page = await browser.newPage();
        
        // Set viewport to HD resolution
        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 2 // Higher quality rendering
        });
        
        // Load the modified HTML file
        await page.goto(`file://${tempHtmlPath}`, {
            waitUntil: ['load', 'networkidle0'],
            timeout: 30000
        });
        
        // Wait for fonts and images to load
        await page.evaluateHandle('document.fonts.ready');
        
        // Make all slides visible and properly sized
        await page.evaluate(() => {
            // Remove any animations
            const style = document.createElement('style');
            style.innerHTML = `
                * {
                    animation: none !important;
                    transition: none !important;
                }
            `;
            document.head.appendChild(style);
            
            // Ensure all slides are properly sized and visible
            const slides = document.querySelectorAll('.slide');
            slides.forEach((slide, index) => {
                slide.style.display = 'flex';
                slide.style.opacity = '1';
                slide.style.position = 'relative';
                slide.style.width = '1920px';
                slide.style.height = '1080px';
                slide.style.pageBreakAfter = 'always';
                slide.style.pageBreakInside = 'avoid';
                slide.style.margin = '0';
                slide.style.transform = 'none';
                slide.style.overflow = 'visible';
                
                // Ensure last slide doesn't have page break
                if (index === slides.length - 1) {
                    slide.style.pageBreakAfter = 'auto';
                }
            });
            
            // Ensure gradient text is preserved for PDF
            const title = document.querySelector('.main-title');
            if (title) {
                // Force gradient to render properly in PDF
                title.style.opacity = '1';
                title.style.visibility = 'visible';
                title.style.display = 'inline-block';
                title.style.fontSize = '110px';
                title.style.WebkitPrintColorAdjust = 'exact';
                title.style.printColorAdjust = 'exact';
                title.style.colorAdjust = 'exact';
                
                // Create a fallback for better PDF rendering
                const titleText = title.textContent;
                if (titleText) {
                    // Add a subtle white shadow as fallback for PDF
                    title.style.filter = 'drop-shadow(0 0 1px rgba(255,255,255,0.8))';
                }
            }
            
            // Hide navigation elements
            const nav = document.querySelector('.navigation');
            if (nav) nav.style.display = 'none';
            const arrows = document.querySelector('.nav-arrows');
            if (arrows) arrows.style.display = 'none';
            
            // Force backgrounds to be visible
            document.body.style.background = '#000000';
            document.body.style.margin = '0';
            document.body.style.padding = '0';
        });
        
        // Wait a bit for all styles to apply
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate high-quality PDF
        await page.pdf({
            path: 'builders-month-presentation.pdf',
            width: '1920px',
            height: '1080px',
            printBackground: true,
            preferCSSPageSize: false,
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            displayHeaderFooter: false,
            scale: 1
        });
        
        console.log('✅ Top-notch PDF generated successfully: builders-month-presentation.pdf');
        console.log('📄 PDF contains all slides with proper formatting and high quality rendering');
        
        // Clean up temp file
        fs.unlinkSync(tempHtmlPath);
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        // Clean up temp file on error
        if (fs.existsSync(tempHtmlPath)) {
            fs.unlinkSync(tempHtmlPath);
        }
        process.exit(1);
    } finally {
        await browser.close();
    }
}

generatePDF();