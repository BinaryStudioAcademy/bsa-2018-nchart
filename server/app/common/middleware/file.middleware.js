const fs = require('fs');
const uuidv4 = require('uuid/v4');
const download = require('download-file');

class FileMiddleware {
	save(file) {
		this.createStorageFolder();
		const storagePath = process.env.FILE_STORAGE_DIR;
		let path = `${storagePath}${uuidv4()}${file.name}`;
		return new Promise((resolve, reject) => {
			// rename file if exists, otherwise it will be overwritten
			while (fs.existsSync(path)) {
				path = `${storagePath}${uuidv4()}${file.name}`;
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
		this.createStorageFolder();
		const storagePath = process.env.FILE_STORAGE_DIR;
		return new Promise((resolve, reject) => {
			const options = {
				directory: `${storagePath}`,
				filename: `${uuidv4()}.file`
			};
			while (fs.existsSync(options.directory + options.filename)) {
				options.filename = `${uuidv4()}.file`;
			}
			download(url, options, err => {
				if (err) return reject(err);
				return resolve(options.directory + options.filename);
			});
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

	createStorageFolder() {
		this.path = process.env.FILE_STORAGE_DIR;
		if (!fs.existsSync(this.path)) {
			fs.mkdirSync(this.path);
		}
	}
}
module.exports = new FileMiddleware();
