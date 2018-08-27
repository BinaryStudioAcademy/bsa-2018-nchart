const PdfService = require('../export.services/pdf.service');
const PngService = require('../export.services/png.service');

class ExportService {
	constructor() {
		this.PdfService = PdfService;
		this.PngService = PngService;
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
