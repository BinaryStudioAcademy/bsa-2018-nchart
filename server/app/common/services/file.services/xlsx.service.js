const XLSX = require('xlsx');
const async = require('async');
const fs = require('fs');
const FsService = require('../../middleware/file.middleware');

const parseHeaders = workbook => {
	const sheet = workbook.Sheets[workbook.SheetNames[0]];
	const range = XLSX.utils.decode_range(sheet['!ref']);
	let headers = [];
	let C;
	const R = range.s.r;
	/* start in the first row */
	/* walk every column in the range */
	let countBreak = 0;
	let buffer = [];
	for (C = range.s.c; C <= range.e.c; C += 1) {
		const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
		let hdr = `UNKNOWN_${C}`; // <-- replace with your desired default
		if (!cell) {
			countBreak += 1;
			/* if 3 cell in a row undefined - break */
			if (countBreak === 3) {
				return headers;
			}
			buffer.push(hdr);
		}
		/* find the cell in the first row */
		if (cell && cell.t && cell.v !== '' && cell.v !== ' ') {
			countBreak = 0;
			hdr = XLSX.utils.format_cell(cell);
			if (buffer.length >= 1) {
				headers = headers.concat(buffer);
			}
			buffer = [];
			headers.push(hdr);
		}
	}
	return headers;
};

const getHeaders = (path, content) => {
	if (path) {
		const workbook = XLSX.readFile(path);
		return parseHeaders(workbook);
	}
	const workbook = XLSX.read(content, { type: 'string' });
	return parseHeaders(workbook);
};

const parseData = (data, headers) => {
	function isNumber(str) {
		const a = `${Number(str)}`;
		if (a === 'NaN') {
			return false;
		}
		return true;
	}
	const countNull = {};
	const countNumber = {};
	// todo: rename
	const payload = {};
	for (let i = 0; i < headers.length; i += 1) {
		Object.assign(payload, { [headers[i]]: { data: [], type: '' } });
		Object.assign(countNull, { [headers[i]]: 0 });
		Object.assign(countNumber, { [headers[i]]: 0 });
	}
	let item;
	// todo: rename
	const testArr = [];
	for (let i = 0; i < data.length; i += 1) {
		// todo: rename
		const arr = [];
		for (let c = 0; c < headers.length; c += 1) {
			item = data[i][headers[c]];
			if (item === undefined || item === '' || item === ' ') {
				item = null;
			}
			if (item === null) {
				countNull[headers[c]] += 1;
			}
			if (isNumber(item)) {
				if (item !== null) {
					item = Number(item);
				}
				countNumber[headers[c]] += 1;
			}
			arr.push(item);
			payload[headers[c]].data.push(item);
		}
		testArr.push(arr);
	}
	for (let c = 0; c < headers.length; c += 1) {
		if (countNull[headers[c]] === payload[headers[c]].data.length) {
			payload[headers[c]].type = 'null';
		} else if (
			countNumber[headers[c]] === payload[headers[c]].data.length &&
			countNumber[headers[c]] !== countNull[headers[c]]
		) {
			payload[headers[c]].type = 'number';
		} else {
			payload[headers[c]].type = 'string';
		}
	}
	// todo: rename
	const realPayload = {
		columns: [],
		data: testArr
	};
	for (let c = 0; c < headers.length; c += 1) {
		realPayload.columns.push({
			title: headers[c],
			type: payload[headers[c]].type
		});
	}
	return realPayload;
};

// format column array:
/*
{
    "payload": {
        "test1": {
            "data": [
                1,
                1,
                1,
                null,
                null,
                null
            ],
            "type": "number"
        },{}
    },
    "isSuccess": true,
    "errors": []
}
 */

//
// const parseData = (data, headers) => {
// 	function isNumber(str) {
// 		const a = `${Number(str)}`;
// 		if (a === 'NaN') {
// 			return false;
// 		}
// 		return true;
// 	}
// 	const countNull = {};
// 	const countNumber = {};
// 	const payload = {};
// 	for (let i = 0; i < headers.length; i += 1) {
// 		Object.assign(payload, { [headers[i]]: { data: [], type: '' } });
// 		Object.assign(countNull, { [headers[i]]: 0 });
// 		Object.assign(countNumber, { [headers[i]]: 0 });
// 	}
// 	let item;
// 	for (let i = 0; i < data.length; i += 1) {
// 		for (let c = 0; c < headers.length; c += 1) {
// 			item = data[i][headers[c]];
// 			if (item === undefined || item === '' || item === ' ') {
// 				item = null;
// 			}
// 			if (item === null) {
// 				countNull[headers[c]] += 1;
// 			}
// 			if (isNumber(item)) {
// 				if (item !== null) {
// 					item = Number(item);
// 				}
// 				countNumber[headers[c]] += 1;
// 			}
// 			payload[headers[c]].data.push(item);
// 		}
// 	}
// 	for (let c = 0; c < headers.length; c += 1) {
// 		// delete empty columns
// 		if (countNull[headers[c]] === payload[headers[c]].data.length) {
// 			delete payload[headers[c]];
// 		} else if (
// 			countNumber[headers[c]] === payload[headers[c]].data.length
// 			&& countNumber[headers[c]] !== countNull[headers[c]]
// 		) {
// 			payload[headers[c]].type = 'number';
// 		} else {
// 			payload[headers[c]].type = 'string';
// 		}
// 	}
// 	return payload;
// };

const readFile = path =>
	new Promise((resolve, reject) => {
		const headers = getHeaders(path);
		const file = fs.createReadStream(path);
		const buffers = [];
		file.on('data', data => {
			buffers.push(data);
		});
		file.on('end', () => {
			const buffer = Buffer.concat(buffers);
			const workbook = XLSX.read(buffer); // works
			const data = XLSX.utils.sheet_to_json(
				workbook.Sheets[workbook.SheetNames[0]],
				{ header: headers, range: 1, defval: null }
			);
			const payload = parseData(data, headers);
			if (payload.length === 0) {
				reject(new Error('Messed up file'));
			}
			resolve(payload);
		});
	});

const processFile = file =>
	new Promise((resolve, reject) => {
		let globalPath = null;
		async.waterfall(
			[
				callback => {
					FsService.save(file)
						.then(path => {
							globalPath = path;
							callback(null, path);
						})
						.catch(err => {
							callback(err, null);
						});
				},
				(path, callback) => {
					readFile(path)
						.then(data => {
							callback(null, data);
						})
						.catch(err => {
							callback(err, null);
						});
				}
			],
			(error, payload) => {
				FsService.deleteFile(globalPath).catch(err => reject(err));
				if (error) {
					reject(error);
				}
				resolve(payload);
			}
		);
	});

const readString = content =>
	new Promise((resolve, reject) => {
		const headers = getHeaders(null, content);
		const workbook = XLSX.read(content, { type: 'string' });
		const data = XLSX.utils.sheet_to_json(
			workbook.Sheets[workbook.SheetNames[0]],
			{ header: headers, range: 1 }
		);
		const payload = parseData(data, headers);
		if (payload.length === 0) {
			reject(new Error('Messed up file'));
		}
		resolve(payload);
	});

module.exports = {
	processFile,
	readFile,
	readString
};
