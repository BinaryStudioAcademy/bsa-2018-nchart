const async = require('async');
const http = require('http');
const https = require('https');
const FsService = require('../../middleware/file.middleware');

class LinkService {
	// https://stackoverflow.com/questions/16194017/stop-downloading-the-data-in-nodejs-request
	// todo: if file size undefined, crush app
	checkSize(url) {
		this.url = url;
		return new Promise((resolve, reject) => {
			let fileLength;
			const protocol = this.typeOfProtocol(this.url);
			const request = protocol.request(this.url, response => {
				const patt = [/text/, /application/];
				if (
					(protocol === https
						&& patt[0].test(response.headers['content-type']))
					|| patt[1].test(response.headers['content-type'])
				) {
					return resolve(true);
				}
				fileLength = response.headers['content-length'];
				if (!fileLength) {
					reject(new Error('File size is undefined'));
				} else if (fileLength / 1000000 > 5) {
					reject(new Error('File is too big'));
				}
				return resolve(true);
			});
			request.on('error', err => {
				reject(err);
			});
			request.end();
		});
	}

	typeOfProtocol(url) {
		this.url = url;
		const httpPatt = /^(?:http?:\/\/)/;
		if (httpPatt.test(this.url)) {
			return http;
		}
		return https;
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
