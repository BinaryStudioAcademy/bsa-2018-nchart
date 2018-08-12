const fs = require('fs');
const uuidv4 = require('uuid/v4');

class FsService {
	save(file) {
		let path = `../server/app/fileStorage/${uuidv4()}${file.name}`;
		return new Promise((resolve, reject) => {
			// todo: rename file if exists otherwise it will be overwritten
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

	deleteFile(path) {
		this.path = path;
		return new Promise((resolve, reject) => {
			fs.unlink(this.path, err => {
				if (err) reject(err);
				resolve('done');
			});
		});
	}
}

module.exports = new FsService();
