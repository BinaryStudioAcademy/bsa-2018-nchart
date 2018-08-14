const puppeteer = require('puppeteer');

const createPdf = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const options = {
		path: '../../../../server/app/fileStorage/web.pdf',
		format: 'A4'
	};
	await page.goto('https://www.google.com/', { waitUntil: 'networkidle2' });
	await page.pdf(options);

	await browser.close();
};

createPdf();
