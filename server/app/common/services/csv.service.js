const fs = require('fs');
const Papa = require('papaparse');
const async = require('async');

class CsvService {
	constructor() {
		this.path = null;
	}

	save(file) {
		return new Promise((resolve, reject) => {
			// todo: rename file if exists otherwise it will be overwritten
			if (fs.existsSync(`../server/app/fileStorage/${file.name}`)) {
				return null;
			}
			const path = `../server/app/fileStorage/${file.name}`;
			const stream = fs.createWriteStream(path);
			return stream.once('open', () => {
				stream.write(file.data);
				stream.end(() => {
					resolve(`../server/app/fileStorage/${file.name}`);
				});
				stream.on('error', () => {
					this.delete(path);
					reject(new Error('error write stream'));
				});
			});
		});
	}

	delete(path) {
		this.path = path;
		return new Promise((resolve, reject) => {
			fs.unlink(this.path, err => {
				if (err) reject(err);
				resolve('done');
			});
		});
	}

	processFile(file) {
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.save(file)
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
						this.delete(path)
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
					skipEmptyLines: 'greedy',
					// make it see the numbers and boolean
					dynamicTyping: true,
					// header - makes keys from the first row
					header: true,
					// used for a very large files
					worker: true,
					step(row) {
						for (let i = 0; i < headers.length; i += 1) {
							if (!(headers[i] in row.data[0])) {
								return;
							}
						}
						jsonData.push(row.data[0]);
						// console.log(row.data[0]);
					},
					complete() {
						// console.log(jsonData, results);
						resolve(jsonData);
					}
				});
			});
		});
	}
}

module.exports = new CsvService();
