/* eslint-disable import/no-unresolved */
const {
	Worker,
	isMainThread,
	parentPort,
	workerData
} = require('worker_threads');
/* eslint-enable */
const FsService = require('../../common/middleware/file.middleware');
const LinkService = require('../../common/services/file.services/link.service');
const validateRequest = require('./file.services/request.service');
const {
	processFile,
	readString
} = require('../../common/services/file.services/xlsx.service');

// todo: expand error handling, tests need to be done
if (isMainThread) {
	module.exports = async function parseJSAsync(file, contents, link) {
		return new Promise((resolve, reject) => {
			// todo: doesn't look good function validateRequest here
			// verify if request is valid, if it's not throws an error
			validateRequest(file, contents, link);
			// todo: workers creating need optimisation
			if (file) {
				// saves file and returns path to it
				FsService.save(file.fileKey).then(path => {
					const worker = new Worker(__filename, {
						workerData: { path, contents, link }
					});
					worker.on('message', resolve);
					worker.on('error', reject);
					worker.on('exit', code => {
						if (code !== 0) {
							reject(
								new Error(
									`Worker stopped with exit code ${code}`
								)
							);
						}
					});
				});
			} else if (link) {
				// checks if file is not too big and return path to created file
				LinkService.processLink(link)
					.then(path => {
						const worker = new Worker(__filename, {
							workerData: { path, contents, link }
						});
						worker.on('message', resolve);
						worker.on('error', reject);
						worker.on('exit', code => {
							if (code !== 0) {
								reject(
									new Error(
										`Worker stopped with exit code ${code}`
									)
								);
							}
						});
					})
					.catch(err => reject(err));
			} else if (contents) {
				const worker = new Worker(__filename, {
					workerData: { file, contents, link }
				});
				worker.on('message', resolve);
				worker.on('error', reject);
				worker.on('exit', code => {
					if (code !== 0) {
						reject(
							new Error(`Worker stopped with exit code ${code}`)
						);
					}
				});
			}
		});
	};
} else {
	const data = workerData;
	if (data.path) {
		processFile(data.path)
			.then(payload => {
				parentPort.postMessage(payload);
			})
			.catch(err => {
				throw err;
			});
	}
	if (data.contents) {
		readString(data.contents)
			.then(payload => {
				parentPort.postMessage(payload);
			})
			.catch(err => {
				throw err;
			});
	}
}
