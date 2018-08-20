const puppeteer = require('puppeteer');

exports.createPdf = async id => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const options = {
		format: 'A4'
	};
	await page.goto(`http://localhost:4200/#/app/project/${id}/pdf_preview`, {
		waitUntil: 'load'
	});
	const buffer = await page.pdf(options);
	await browser.close();
	return buffer;
};
