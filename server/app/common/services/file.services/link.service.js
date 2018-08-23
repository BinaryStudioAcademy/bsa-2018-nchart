const remote = require('remote-file-size');
const async = require('async');
const FsService = require('../../middleware/file.middleware');

class LinkService {
	// https://stackoverflow.com/questions/16194017/stop-downloading-the-data-in-nodejs-request
	// todo: if file size undefined, crush app
	checkSize(url) {
		this.url = url;
		return new Promise((resolve, reject) => {
			remote(this.url, (err, sizeBytes) => {
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
								callback(null, path);
							})
							.catch(err => callback(err, null));
					}
				],
				(error, payload) => {
					if (error) {
						// todo: create some error, if file is messed up shit
						reject(error);
					}
					resolve(payload);
				}
			);
		});
	}
}

module.exports = new LinkService();
