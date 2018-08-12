const CsvService = require('./csv.service');
const XlsxService = require('./xlsx.service');
const LinkService = require('./link.service');

module.exports = {
	fileService: (file, contents, link) => {
		const pattern = {
			csv: /.+(\.csv)$/,
			xlsx: /.+(\.xlsx)$/,
			xls: /.+(\.xls)$/,
			url: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w-]+)+[\w\-_~:/?#[\]@!&',;=.]+$/
		};
		if (contents !== '' && typeof contents === 'string') {
			return CsvService.processString(contents);
		}
		if (pattern.url.test(link)) {
			return LinkService.processLink(link);
		}
		if (!file) {
			throw new Error('No file were uploaded');
		} else if (pattern.csv.test(file.fileKey.name)) {
			return CsvService.processFile(file.fileKey);
		} else if (
			pattern.xlsx.test(file.fileKey.name) ||
			pattern.xls.test(file.fileKey.name)
		) {
			return XlsxService.processFile(file.fileKey);
		} else {
			throw new Error('Incorrect file extension');
		}
	}
};
