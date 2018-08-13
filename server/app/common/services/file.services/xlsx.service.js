const XLSX = require('xlsx');
const async = require('async');
const fs = require('fs');
const FsService = require('./fs.service');

function parseHeaders(workbook) {
	const sheet = workbook.Sheets[workbook.SheetNames[0]];
	const range = XLSX.utils.decode_range(sheet['!ref']);
	const headers = [];
	let C;
	const R = range.s.r;
	/* start in the first row */
	/* walk every column in the range */
	for (C = range.s.c; C <= range.e.c; C += 1) {
		const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
		/* find the cell in the first row */
		let hdr = `UNKNOWN ${C}`; // <-- replace with your desired default
		if (cell && cell.t) {
			hdr = XLSX.utils.format_cell(cell);
			if (
				hdr === '' ||
				hdr === ' ' ||
				hdr === null ||
				hdr === undefined
			) {
				return headers;
			}
			headers.push(hdr);
		}
	}
	return headers;
}

function getHeaders(path, content) {
	if (path) {
		const workbook = XLSX.readFile(path);
		return parseHeaders(workbook);
	}
	const workbook = XLSX.read(content, { type: 'string' });
	return parseHeaders(workbook);
}

function parseLine(data, headers) {
	const payload = [];
	for (let i = 0; i < data.length; i += 1) {
		for (let c = 0; c < headers.length; c += 1) {
			if (
				data[i][headers[c]] === '' ||
				data[i][headers[c]] === ' ' ||
				data[i][headers[c]] === undefined
			) {
				Object.assign(data[i], { [headers[c]]: null });
			}
		}
		payload.push(data[i]);
	}
	return payload;
}

function readFile(path) {
	return new Promise((resolve, reject) => {
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
				{ header: headers, range: 1 }
			);
			const payload = parseLine(data, headers);
			if (payload.length === 0) {
				reject(new Error('Messed up file'));
			}
			resolve(payload);
		});
	});
}

function processFile(file) {
	return new Promise((resolve, reject) => {
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
}

function readString(content) {
	return new Promise((resolve, reject) => {
		const headers = getHeaders(null, content);
		const workbook = XLSX.read(content, { type: 'string' });
		const data = XLSX.utils.sheet_to_json(
			workbook.Sheets[workbook.SheetNames[0]],
			{ header: headers, range: 1 }
		);
		const payload = parseLine(data, headers);
		if (payload.length === 0) {
			reject(new Error('Messed up file'));
		}
		resolve(payload);
	});
}

module.exports = {
	processFile,
	readFile,
	readString
};
