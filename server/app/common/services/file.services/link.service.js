const remote = require('remote-file-size');
const async = require('async');
const FsService = require('./fs.service');
const XlsxService = require('./xlsx.service');

class LinkService {
	checkSize(url) {
		this.url = url;
		return new Promise((resolve, reject) => {
			remote(url, (err, sizeBytes) => {
				if (err) {
					reject(err);
				}
				if (sizeBytes / 1000000 > 5) {
					reject(new Error('File is too big'));
				}
				resolve(true);
			});
		});
	}

	processLink(url) {
		return new Promise((resolve, reject) => {
			let globalPath = null;
			async.waterfall(
				[
					callback => {
						this.checkSize(url)
							.then(() => {
								callback(null, true);
							})
							.catch(err => callback(err, null));
					},
					(data, callback) => {
						FsService.saveFromLink(url)
							.then(path => {
								globalPath = path;
								callback(null, path);
							})
							.catch(err => callback(err, null));
					},
					(path, callback) => {
						XlsxService.read(path)
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
}

module.exports = new LinkService();
