const puppeteer = require('puppeteer');
const pug = require('pug');
const path = require('path');

const compile = (templateName, data) => {
	const filePath = path.join(__dirname, 'templates', `${templateName}.pug`);
	return pug.compileFile(filePath)(data);
};

exports.createPdf = async svg => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const options = {
		format: 'A4'
	};
	const content = compile('template', { svg });
	await page.setContent(content);
	const buffer = await page.pdf(options);
	await browser.close();
	return buffer;
};
