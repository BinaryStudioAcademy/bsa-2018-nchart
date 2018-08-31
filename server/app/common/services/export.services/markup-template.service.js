const puppeteer = require('puppeteer');
const pug = require('pug');
const path = require('path');
const DocumentGeneratingService = require('../export.services/document-generating.service');

class MarkupTemplateService {
	constructor() {
		this.DocumentGeneratingService = DocumentGeneratingService;
		this.Puppeteer = puppeteer;
		this.Pug = pug;
		this.Path = path;
	}

	async getDocument(content, type) {
		const templateName = 'template';
		const template = this.compileHtml(templateName, { content });

		if (type === 'svg') {
			const buffer = Buffer.from(template, 'utf-8');
			return buffer;
		}

		const browser = await this.Puppeteer.launch({
			headless: false,
			args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-setuid-sandbox']
		});
		const page = await browser.newPage();

		await page.setContent(template);
		const buffer = await this.DocumentGeneratingService.returnBuffer(
			type,
			page
		);
		await browser.close();
		return buffer;
	}

	compileHtml(templateName, content) {
		const filePath = this.Path.join(
			__dirname,
			'templates',
			`${templateName}.pug`
		);
		return pug.compileFile(filePath)(content);
	}
}

module.exports = new MarkupTemplateService();
