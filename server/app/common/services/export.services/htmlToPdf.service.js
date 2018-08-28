const puppeteer = require('puppeteer');

exports.createPdf = async (id, body) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const options = {
		format: 'A4'
	};
	let buffer;
	await page.setContent(body);
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
