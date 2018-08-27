const puppeteer = require('puppeteer');

exports.createScreenshot = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto('http://localhost:4200/#/app/project/draft', {
		waitUntil: 'load'
	});

	const rect = await page.evaluate((selector = '#chart') => {
		const element = this.document.querySelector(selector);
		if (!element) {
			return null;
		}
		const { x, y, width, height } = element.getBoundingClientRect();
		return { left: x, top: y, width, height, id: element.id };
	}, '#chart');

	const buffer = await page.screenshot(
		{
			clip: {
				x: rect.left,
				y: rect.top,
				width: rect.width,
				height: rect.height
			}
		}
	);
	await browser.close();

	return buffer;
};
