const XLSX = require('xlsx');
const async = require('async');
const fs = require('fs');
const FsService = require('./fs.service');

class ExcelService {
	getHeaders(path, content) {
		const headers = [];
		if (path) {
			this.path = null;
			const workbook = XLSX.readFile(path);
			const sheet = workbook.Sheets[workbook.SheetNames[0]];
			const range = XLSX.utils.decode_range(sheet['!ref']);
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
		} else {
			const workbook = XLSX.read(content, { type: 'string' });
			const sheet = workbook.Sheets[workbook.SheetNames[0]];
			const range = XLSX.utils.decode_range(sheet['!ref']);
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
		}
		return headers;
	}

	readFile(path) {
		return new Promise(resolve => {
			const headers = this.getHeaders(path);
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
				const payload = [];
				for (let i = 0; i < data.length; i += 1) {
					for (let c = 0; c < headers.length; c += 1) {
						if (
							data[i][headers[c]] === null ||
							data[i][headers[c]] === ' ' ||
							data[i][headers[c]] === undefined
						) {
							data[i][headers[c]] = '';
						}
					}
					payload.push(data[i]);
				}
				if (payload.length === 0) {
					resolve(new Error('Messed up file'));
				}
				resolve(payload);
			});
		});
	}

	processFile(file) {
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
						this.readFile(path)
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

	readString(content) {
		return new Promise(resolve => {
			const headers = this.getHeaders(null, content);
			const workbook = XLSX.read(content, { type: 'string' });
			const data = XLSX.utils.sheet_to_json(
				workbook.Sheets[workbook.SheetNames[0]],
				{ header: headers, range: 1 }
			);
			const payload = [];
			for (let i = 0; i < data.length; i += 1) {
				for (let c = 0; c < headers.length; c += 1) {
					if (
						data[i][headers[c]] === null ||
						data[i][headers[c]] === ' ' ||
						data[i][headers[c]] === undefined
					) {
						data[i][headers[c]] = '';
					}
				}
				payload.push(data[i]);
			}
			resolve(payload);
		});
	}
}

module.exports = new ExcelService();
