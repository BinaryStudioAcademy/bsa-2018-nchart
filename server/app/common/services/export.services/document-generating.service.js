// todo: Puppeteer with init, screenshot
const puppeteer = require('puppeteer');
const potrace = require('potrace');

class DocumentGeneratingService {
	constructor() {
		this.Puppeteer = puppeteer;
		this.Potrace = potrace;
	}

	async getDocument(id, type, selector) {
		const browser = await this.Puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(`http://localhost:4200/#/app/project/${id}/pdf_preview`, {
			waitUntil: 'load'
		});
		let buffer;
		if (!selector) {
			buffer = await this.returnBuffer(type, page);
		} else {
			buffer = await this.returnBufferFromSelector(type, page, selector);
		}
		await browser.close();
		return buffer;
	}

	returnBuffer(type, page) {
		switch (type) {
		case 'pdf':
			return page.pdf({ format: 'A4', printBackground: true });
		case 'png':
			return page.screenshot({ fullPage: true });
		case 'svg':
			return new Promise(async resolve => {
				const imagePng = await page.screenshot({ fullPage: true	});
				const trace = new this.Potrace.Potrace();
				trace.loadImage(imagePng, err => {
					if (err) throw err;
					resolve(trace.getSVG());
				});
			}).then(svg => svg);
		default:
			return '';
		}
	}

	returnBufferFromSelector(type, page, selector) {
		switch (type) {
		case 'pdf':
			return this.selectElementToPdf(page, selector).then((res) => res.pdf({ format: 'A4', printBackground: true }));
		case 'png':
			return new Promise(async resolve => {
				const options = await this.selectElement(page, selector);
				const imagePng = await page.screenshot(options);
				resolve(imagePng);
			}).then(png => png);
		case 'svg':
			return new Promise(async resolve => {
				const options = await this.selectElement(page, selector);
				const imagePng = await page.screenshot(options);
				const trace = new this.Potrace.Potrace();
				trace.loadImage(imagePng, err => {
					if (err) throw err;
					resolve(trace.getSVG());
				});
			}).then(svg => svg);
		default:
			return '';
		}
	}

	async selectElementToPdf(page, selector) {
		const selectedEl = await page.evaluate((sel) => {
			const element = document.querySelector(sel);
			return element.innerHTML;
		}, selector);
		await page.setContent(selectedEl);
		return page;
	}

	async selectElement(page, selector) {
		const rect = await page.evaluate((select) => {
			const element = this.document.querySelector(select);
			if (!element) {
				return null;
			}
			const {
				x, y, width, height
			} = element.getBoundingClientRect();
			console.log(width);
			return {
				left: x, top: y, width, height, id: element.id
			};
		}, selector);
		return {
			clip: {
				x: rect.left,
				y: rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	}
}

module.exports = new DocumentGeneratingService();
