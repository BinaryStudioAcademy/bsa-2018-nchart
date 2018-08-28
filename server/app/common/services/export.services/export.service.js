const PdfService = require('../export.services/pdf.service');
const HtmlToPdfService = require('../export.services/htmlToPdf.service');

class ExportService {
	constructor() {
		this.PdfService = PdfService;
		this.HtmlToPdfService = HtmlToPdfService;
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

	getPdfFromHtml(id, body) {
		return this.HtmlToPdfService.createPdf(id, body);
	}
}

module.exports = new ExportService();
