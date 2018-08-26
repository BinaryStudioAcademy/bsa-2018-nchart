const PdfService = require('../export.services/pdf.service');
const ScreenshotService = require('../export.services/screenshot.service');

class ExportService {
	constructor() {
		this.PdfService = PdfService;
		this.ScreenshotService = ScreenshotService;
	}

	getFile(id, type) {
		switch (type) {
		case 'pdf':
			return this.PdfService.createPdf(id);
		case 'png':
			return this.PngService.createPng(id);
		case 'svg':
			return this.SvgService.createSvg(id);
		default:
			return '';
		}
	}

	getScreenshot(id) {
		return this.ScreenshotService.createScreenshot(id);
	}
}

module.exports = new ExportService();
