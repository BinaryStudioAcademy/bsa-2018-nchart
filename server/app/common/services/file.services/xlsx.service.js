const XLSX = require('xlsx');
const async = require('async');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const FsService = require('../../middleware/file.middleware');
const transliterate = require('../../services/file.services/transliterate.service');

function renameFiles(arr) {
	const count = {};
	arr.forEach((x, i) => {
		if (arr.indexOf(x) !== i) {
			let c;
			if (x in count) {
				count[x] += 1;
				c = count[x];
			} else {
				count[x] = 1;
				c = count[x];
			}
			let j = c + 1;
			let k = `${x}(${j})`;

			while (arr.indexOf(k) !== -1) k = `${x}(${(j += 1)})`;
			Object.assign(arr, { [i]: k });
		}
	});
	return arr;
}

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
		let hdr = 'UNKNOWN'; // <-- replace with your desired default
		if (!cell || cell.v === '' || cell.v === ' ') {
			countBreak += 1;
			/* if 3 cell in a row undefined - break */
			if (countBreak === 3) {
				return renameFiles(headers);
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
	return renameFiles(headers);
};

const getHeaders = (path, content) => {
	// if user sent file
	if (path) {
		const workbook = XLSX.readFile(path);
		return parseHeaders(workbook);
	}
	// if user sent string
	const workbook = XLSX.read(transliterate(content), { type: 'string' });
	return parseHeaders(workbook);
};

const parseData = (data, headers) => {
	// check if string if a valid number
	function isNumber(str) {
		const number = `${Number(str)}`;
		if (number === 'NaN') {
			return false;
		}
		return true;
	}
	// items needed for data parsing
	const countNull = {};
	const countNumber = {};
	const dataInColumns = {};
	for (let i = 0; i < headers.length; i += 1) {
		Object.assign(dataInColumns, { [headers[i]]: { data: [], type: '' } });
		Object.assign(countNull, { [headers[i]]: 0 });
		Object.assign(countNumber, { [headers[i]]: 0 });
	}
	let item;
	const temporaryRowPayload = [];
	for (let i = 0; i < data.length; i += 1) {
		const temporaryArr = [];
		for (let c = 0; c < headers.length; c += 1) {
			item = data[i][headers[c]];
			if (item === undefined || item === '' || item === ' ') {
				item = null;
			}
			if (item === null) {
				countNull[headers[c]] += 1;
			}
			// check if cell is number
			if (isNumber(item)) {
				// if not null, convert into number
				if (item !== null) {
					item = Number(item);
				}
				countNumber[headers[c]] += 1;
			}
			temporaryArr.push(item);
			dataInColumns[headers[c]].data.push(item);
		}
		temporaryRowPayload.push(temporaryArr);
	}
	let IDs = [];
	// set data types for each column
	for (let c = 0; c < headers.length; c += 1) {
		// create IDs array
		IDs.push(uuidv4());
		// todo: if front want, its possible to return index of empty column
		if (countNull[headers[c]] === dataInColumns[headers[c]].data.length) {
			dataInColumns[headers[c]].type = 'null';
		} else if (
			countNumber[headers[c]] === dataInColumns[headers[c]].data.length
			&& countNumber[headers[c]] !== countNull[headers[c]]
		) {
			dataInColumns[headers[c]].type = 'number';
		} else {
			dataInColumns[headers[c]].type = 'string';
		}
	}
	const payload = {
		columns: [],
		data: temporaryRowPayload
	};
	// check if there any duplicates
	IDs = renameFiles(IDs);
	// set IDs and column types
	for (let c = 0; c < headers.length; c += 1) {
		payload.columns.push({
			title: headers[c],
			type: dataInColumns[headers[c]].type,
			id: IDs[c]
		});
	}
	return payload;
};

const readFile = path => new Promise((resolve) => {
	const headers = getHeaders(path);
	const file = fs.createReadStream(path);
	const buffers = [];
	file.on('data', data => {
		buffers.push(data);
	});
	file.on('end', () => {
		const buffer = Buffer.concat(buffers);
		const workbook = XLSX.read(buffer); // works
		const sheet = workbook.Sheets[workbook.SheetNames[0]];
		const range = XLSX.utils.decode_range(sheet['!ref']);
		const data = XLSX.utils.sheet_to_json(
			workbook.Sheets[workbook.SheetNames[0]],
			{ header: headers, range: range.s.r + 1, defval: null }
		);
		const payload = parseData(data, headers);
		resolve(payload);
	});
});

const readString = content => new Promise((resolve) => {
	const headers = getHeaders(null, content);
	const workbook = XLSX.read(content, { type: 'string' });
	const data = XLSX.utils.sheet_to_json(
		workbook.Sheets[workbook.SheetNames[0]],
		{ header: headers, range: 1 }
	);
	const payload = parseData(data, headers);
	resolve(payload);
});

const processFile = path => new Promise((resolve, reject) => {
	async.waterfall(
		[
			callback => {
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
			FsService.deleteFile(path).catch(err => reject(err));
			if (error) {
				reject(error);
			}
			resolve(payload);
		}
	);
});

module.exports = {
	processFile,
	readFile,
	readString
};
