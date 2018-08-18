function validateRequest(file, contents, link) {
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
		return true;
	}
	if (pattern.url.test(link)) {
		return true;
	}
	if (!file) {
		throw new Error('No file were uploaded');
	} else if (file) {
		for (let i = 0; i < pattern.supportedExt.length; i += 1) {
			if (pattern.supportedExt[i].test(file.fileKey.name)) {
				return true;
			}
		}
	}
	throw new Error('Incorrect file extension');
}

module.exports = validateRequest;
