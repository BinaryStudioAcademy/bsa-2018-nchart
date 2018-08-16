const fs = require('fs');
const uuidv4 = require('uuid/v4');
const download = require('download-file');

class FileMiddleware {
	save(file) {
		let path = `../server/app/fileStorage/${uuidv4()}${file.name}`;
		return new Promise((resolve, reject) => {
			// rename file if exists, otherwise it will be overwritten
			while (fs.existsSync(path)) {
				path = `../server/app/fileStorage/${uuidv4()}${file.name}`;
			}
			const stream = fs.createWriteStream(path);
			return stream.once('open', () => {
				stream.write(file.data);
				stream.end(() => {
					resolve(path);
				});
				stream.on('error', () => {
					this.deleteFile(path).then(() => {
						reject(new Error("File wasn't processed"));
					});
					reject(new Error('Error write stream'));
				});
			});
		});
	}

	saveFromLink(url) {
		this.url = url;
		return new Promise(resolve => {
			const options = {
				directory: '../server/app/fileStorage/',
				filename: `${uuidv4()}.file`
			};
			while (fs.existsSync(options.directory + options.filename)) {
				options.filename = `${uuidv4()}.file`;
			}
			download(this.url, options, err => {
				if (err) throw err;
				return resolve(options.directory + options.filename);
			});
			// todo: fix error handling if its possible
			// return reject(new Error('Something went wrong'));
		});
	}

	deleteFile(path) {
		return new Promise((resolve, reject) => {
			if (path && fs.existsSync(path)) {
				this.path = path;
				fs.unlink(this.path, err => {
					if (err) reject(err);
					resolve('done');
				});
			} else {
				resolve("File already doesn't exist");
			}
		});
	}
}
module.exports = new FileMiddleware();
