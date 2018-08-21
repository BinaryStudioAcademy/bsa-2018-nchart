const puppeteer = require('puppeteer');

exports.createPdf = async id => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const options = {
		format: 'A4'
	};
	let buffer;
	await page.goto(`http://localhost:4200/#/app/project/${id}/pdf_preview`, { waitUntil: 'networkidle2' });
	await page.waitForSelector('section', { visible: true }).then(async () => {
		console.log('Selector loaded');
		buffer = await page.pdf(options);
		await browser.close();
	}).catch(async () => {
		console.log('Waited 30sec for selector - absent');
		await browser.close();
		buffer = '';
	});
	return buffer;
};
