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

	async getDocument(id, content, type) {
		const browser = await this.Puppeteer.launch();
		const page = await browser.newPage();
		const templateName = 'template';
		await page.setContent(this.compileHtml(templateName, { content }));
		const buffer = await this.DocumentGeneratingService.returnBuffer(
			type,
			page
		);
		await browser.close();
		return buffer;
	}

	compileHtml(templateName, content) {
		const templateN = 'template';
		const filePath = this.Path.join(
			__dirname,
			'templates',
			`${templateN}.pug`
		);
		return pug.compileFile(filePath)(content);
	}
}

module.exports = new MarkupTemplateService();
