const puppeteer = require('puppeteer');

exports.createPng = async id => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`http://localhost:4200/#/app/project/${id}/pdf_preview`, {
		waitUntil: 'load'
	});

	const buffer = await page.screenshot({
		fullPage: true
	});
	await browser.close();

	return buffer;
};
