const puppeteer = require('puppeteer');
const pug = require('pug');
const path = require('path');
const svgStr = require('./templates/svgStr');

const compile = (templateName, data) => {
	const filePath = path.join(__dirname, 'templates', `${templateName}.pug`);
	return pug.compileFile(filePath)(data);
};

exports.createPdf = async (id, body) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const options = {
		format: 'A4'
	};
	const content = compile('template', { svg: svgStr.svgStr });
	await page.setContent(content);
	const buffer = await page.pdf(options);
	await browser.close();
	return buffer;
};
