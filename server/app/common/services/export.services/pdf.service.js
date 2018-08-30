const puppeteer = require('puppeteer');

exports.createPdf = async id => {
	const browser = await puppeteer.launch({
		headless: true,
		args: [`--no-sandbox`, `--disable-setuid-sandbox`],
	});
	const page = await browser.newPage();
	const options = {
		format: 'A4'
	};
	let buffer;
	await page.goto(`http://localhost:4200/#/app/project/${id}/pdf_preview`, {
		waitUntil: 'load'
	});
	await page
		.waitForSelector('div', { timeout: 0 })
		.then(async () => {
			buffer = await page.pdf(options);
			await browser.close();
		})
		.catch(async () => {
			await browser.close();
			buffer = '';
		});
	return buffer;
};
