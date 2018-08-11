const fs = require('fs');
const Papa = require('papaparse');
const async = require('async');
const FsService = require('./fs.service');

function parseLine(row, headers, jsonData) {
	const payload = {};
	for (let i = 0; i < headers.length; i += 1) {
		if (
			row.data[0][headers[i]] === null ||
			row.data[0][headers[i]] === ''
		) {
			return;
		}
		payload[headers[i]] = row.data[0][headers[i]];
	}
	jsonData.push(payload);
}

class CsvService {
	constructor() {
		this.path = null;
	}

	processFile(file) {
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						FsService.save(file)
							.then(data => callback(null, data))
							.catch(err => callback(err, null));
					},
					(path, callback) => {
						this.getHeaders(path)
							.then(data => callback(null, path, data))
							.catch(err => callback(err, null));
					},
					(path, headers, callback) => {
						this.generateJSON(path, headers)
							.then(data => callback(null, path, data))
							.catch(err => callback(err, null));
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

	getHeaders(path) {
		this.path = path;
		return new Promise(resolve => {
			fs.readFile(this.path, 'utf8', (err, contents) => {
				Papa.parse(contents, {
					preview: 1,
					// returns headers
					complete(results) {
						for (let i = 0; i < results.data[0].length; i += 1) {
							if (
								results.data[0][i] === '' ||
								results.data[0][i] === ' ' ||
								results.data[0][i] === undefined ||
								results.data[0][i] === null
							) {
								results.data[0].splice(i);
							}
						}
						resolve(results.data[0]);
					}
				});
			});
		});
	}

	generateJSON(path, headers) {
		this.path = path;
		const jsonData = [];
		return new Promise(resolve => {
			fs.readFile(this.path, 'utf8', (err, contents) => {
				Papa.parse(contents, {
					trimHeaders: true,
					skipEmptyLines: 'greedy',
					// make it see the numbers and boolean
					dynamicTyping: true,
					// header - makes keys from the first row
					header: headers,
					// used for a very large files
					worker: true,
					step(row) {
						parseLine(row, headers, jsonData);
					},
					complete() {
						resolve(jsonData);
					}
				});
			});
		});
	}
}

module.exports = new CsvService();
