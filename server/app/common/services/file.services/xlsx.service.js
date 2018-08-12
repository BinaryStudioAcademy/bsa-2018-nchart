const XLSX = require('xlsx');
const async = require('async');
const fs = require('fs');
const FsService = require('./fs.service');

class ExcelService {
	getHeaders(path) {
		this.path = null;
		const workbook = XLSX.readFile(path);
		const sheet = workbook.Sheets[workbook.SheetNames[0]];
		const headers = [];
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
				headers.push(hdr);
			}
		}
		return headers;
	}

	read(path) {
		return new Promise(resolve => {
			const head = this.getHeaders(path);
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
					{ header: head, range: 1 }
				);
				const payload = [];
				let valid = true;
				for (let i = 0; i < data.length; i += 1) {
					valid = true;
					for (let c = 0; c < head.length; c += 1) {
						if (
							(data[i][head[c]] === null ||
								data[i][head[c]] === '' ||
								data[i][head[c]] === undefined) &&
							valid
						) {
							valid = false;
						}
					}
					if (valid) {
						payload.push(data[i]);
					}
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
			async.waterfall(
				[
					callback => {
						FsService.save(file)
							.then(data => {
								callback(null, data);
							})
							.catch(err => {
								callback(err, null);
							});
					},
					(path, callback) => {
						this.read(path)
							.then(data => {
								callback(null, path, data);
							})
							.catch(err => {
								callback(err, null);
							});
					},
					(path, payload, callback) => {
						FsService.deleteFile(path)
							.then(data => {
								if (data === 'done') {
									callback(null, payload);
								}
							})
							.catch(err => callback(err, null));
					}
				],
				(err, payload) => {
					if (err) {
						reject(err);
					}
					resolve(payload);
				}
			);
		});
	}
}

module.exports = new ExcelService();
