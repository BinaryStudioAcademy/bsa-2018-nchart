const LinkService = require('./link.service');
const { readString, processFile } = require('./xlsx.service');

/*
    todo: a lot of formats need to be added and tested
 */
function fileService(file, contents, link) {
	const pattern = {
		// todo: test all formats
		supportedExt: [
			// excel formats
			/.+(\.xlsx)$/,
			/.+(\.xls)$/,
			/.+(\.xlsm)$/,
			/.+(\.xlsb)$/,
			// additional formats
			/.+(\.csv)$/,
			/.+(\.ods)$/,
			/.+(\.fods)$/,
			/.+(\.txt)$/,
			/.+(\.dbf)$/,
			/.+(\.dif)$/,
			/.+(\.sylk)$/,
			/.+(\.prn)$/,
			/.+(\.rtf)$/,
			/.+(\.eth)$/,
			/.+(\.uos)$/,
			/.+(\.qpw)$/
		],
		url: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w-]+)+[\w\-_~:/?#[\]@!&',;=.]+$/
	};
	if (contents !== '' && typeof contents === 'string') {
		// return CsvService.processString(contents);
		return readString(contents);
	}
	if (pattern.url.test(link)) {
		return LinkService.processLink(link);
	}
	if (!file) {
		throw new Error('No file were uploaded');
	} else if (file) {
		for (let i = 0; i < pattern.supportedExt.length; i += 1) {
			if (pattern.supportedExt[i].test(file.fileKey.name)) {
				return processFile(file.fileKey);
			}
		}
	}
	throw new Error('Incorrect file extension');
}

module.exports = fileService;
