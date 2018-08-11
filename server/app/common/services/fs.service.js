const fs = require('fs');

class FsService {
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
					this.deleteFile(path);
					reject(new Error('error write stream'));
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
