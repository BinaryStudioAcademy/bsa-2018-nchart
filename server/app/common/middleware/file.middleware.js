const fs = require('fs');
const uuidv4 = require('uuid/v4');
const download = require('download-file');
const path = require('path');

class FileMiddleware {
	save(file) {
		const storagePath = process.env.FILE_STORAGE_DIR;
		let pathToFile = path.resolve(`${storagePath}${uuidv4()}${file.name}`);
		return new Promise((resolve, reject) => {
			// rename file if exists, otherwise it will be overwritten
			while (fs.existsSync(pathToFile)) {
				pathToFile = `${storagePath}${uuidv4()}${file.name}`;
			}
			const stream = fs.createWriteStream(pathToFile);
			return stream.once('open', () => {
				stream.write(file.data);
				stream.end(() => {
					resolve(pathToFile);
				});
				stream.on('error', () => {
					this.deleteFile(pathToFile).then(() => {
						reject(new Error("File wasn't processed"));
					});
					reject(new Error('Error write stream'));
				});
			});
		});
	}

	saveFromLink(url) {
		this.path = process.env.FILE_STORAGE_DIR;
		return new Promise((resolve, reject) => {
			const options = {
				directory: `${this.path}`,
				filename: `${uuidv4()}.file`
			};
			while (
				fs.existsSync(
					path.resolve(options.directory + options.filename)
				)
			) {
				options.filename = `${uuidv4()}.file`;
			}
			download(url, options, err => {
				if (err) return reject(err);
				return resolve(
					path.resolve(options.directory + options.filename)
				);
			});
		});
	}

	deleteFile(pathToFile) {
		this.path = path.resolve(pathToFile);
		return new Promise((resolve, reject) => {
			if (this.path && fs.existsSync(this.path)) {
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
