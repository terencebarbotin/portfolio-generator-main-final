const puppeteer = require('puppeteer');
const path = require('path');
const axios = require('axios');
const fs = require('fs'); // file system
const handlebars = require('handlebars');

exports.getById = async (id) => {
    try {
        // TODO : change the URL to the correct one
        //const response = await axios.get(`http://localhost:3000/api/portfolios/${id}`);
        const response = await axios.get(`http://portfolio-backend-service/api/portfolios/${id}`);
        
        if (response.status !== 200 || !response.data.data) {
            console.log(`[ERROR] Portfolio ${id} not found in backend-portfolio`);
            throw new Error("Portfolio not found in backend-portfolio");
        }

        const portfolio = response.data.data;
        return portfolio;
    } catch (error) {
        console.error(`[ERROR] Failed to retrieve portfolio ${id}:`, error.message);
        throw new Error("Error retrieving portfolio from backend-portfolio");
    }
};

exports.generateResumePdf = async (portfolio) => {
    // html template
    const templatePath = path.join(__dirname, '../templates/default.html');
    const templateHtml = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateHtml); // compile the template

    // css template
    const cssPath = path.join(__dirname, '../templates/default.css');
    const styles = fs.readFileSync(cssPath, 'utf8');

    // compile the template with the data
    const html = template(portfolio).replace('<link rel="stylesheet" href="default.css"/>', `<style>${styles}</style>`);

    // browser instance
    // const browser = await puppeteer.launch({
    //     headless: "new"
    // }); // local launch
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium',
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }); // docker launch
    
    const page = await browser.newPage();

    // set the content
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    await page.emulateMediaType('screen');
    
    const options = {
        format: 'A4',
        margin: { top: '0px', right: '30px', bottom: '0', left: '30px' },
        printBackground: true,
    };
    const pdfBuffer = await page.pdf(options);

    await browser.close();

    return pdfBuffer;
};

exports.writePdfToFile = async (pdfBuffer, portfolio) => {
    const filename = `${portfolio.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "_")}_${portfolio.id}_resume.pdf`;
    const filePath = path.join(__dirname, `../../tmp/${filename}`);
    const tmpDir = path.join(__dirname, '../../tmp');

    if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
        console.log("[INFO] `tmp` folder created");
    }

    fs.writeFileSync(filePath, pdfBuffer);
    console.log(`[INFO] PDF resume saved to ${filePath}`);

    setTimeout(() => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`[ERROR] Error deleting file: ${err}`);
            } else {
                console.log(`[INFO] File ${filename} deleted successfully`);
            }
        });
    }, 120000);

    return filename;
};

exports.viewResumePdfByFilename = async (filename) => {
    const filePath = path.join(__dirname, `../../tmp/${filename}`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const pdfBuffer = fs.readFileSync(filePath);
    return pdfBuffer;
}; 
