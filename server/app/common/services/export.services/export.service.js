const PdfService = require('../export.services/pdf.service');

class ExportService {
	constructor() {
		this.PdfService = PdfService;
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
}

module.exports = new ExportService();
