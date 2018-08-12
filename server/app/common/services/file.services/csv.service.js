const fs = require('fs');
const Papa = require('papaparse');
const async = require('async');
const FsService = require('./fs.service');

// todo: function is not visible inside class
function parseLine(row, headers, jsonData) {
	const payload = {};
	for (let i = 0; i < headers.length; i += 1) {
		if (
			row.data[0][headers[i]] === null ||
			row.data[0][headers[i]] === '' ||
			row.data[0][headers[i]] === ' ' ||
			row.data[0][headers[i]] === undefined
		) {
			payload[headers[i]] = '';
		} else {
			payload[headers[i]] = row.data[0][headers[i]];
		}
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
						fs.readFile(path, 'utf8', (error, contents) => {
							if (error) {
								callback(error, null);
							}
							this.getHeaders(contents)
								.then(data => callback(null, path, data))
								.catch(err => callback(err, null));
						});
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
							.catch(err => callback(err, path));
					}
				],
				(error, payload) => {
					if (error) {
						// todo: not sure if this will work
						FsService.deleteFile(payload)
							.then(() => {
								reject(error);
							})
							.catch(err => reject(err));
					}
					resolve(payload);
				}
			);
		});
	}

	processString(contents) {
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.getHeaders(contents)
							.then(data => callback(null, data, contents))
							.catch(err => callback(err, null));
					},
					(headers, content, callback) => {
						this.generateJSON(null, headers, content)
							.then(data => {
								callback(null, data);
							})
							.catch(err => {
								callback(err, null);
							});
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

	getHeaders(contents) {
		this.contents = contents;
		return new Promise(resolve => {
			Papa.parse(this.contents, {
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
	}

	generateJSON(path, headers, contents) {
		return new Promise((resolve, reject) => {
			const jsonData = [];
			// if it's file, path should be provided
			if (path) {
				this.path = path;
				fs.readFile(this.path, 'utf8', (err, content) => {
					Papa.parse(content, {
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
					reject(err);
				});
			} else {
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
			}
		});
	}
}

module.exports = new CsvService();
