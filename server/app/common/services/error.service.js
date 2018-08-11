class DBError extends Error {
	constructor() {
		super();
		this.customErrors = [
			{ message: 'Not valid name', code: 1 },
			{ message: 'Not valid surname', code: 2 },
			{ message: 'Not valid email', code: 3 },
			{ message: 'email must be unique', code: 4 },
			{ message: 'Object did not exist', code: 5 },
			{ message: 'Wrong password', code: 6 },
			{ message: 'jwt expired', code: 7 },
			{ message: 'Incorrect file extension', code: 8 },
			{ message: 'No file were uploaded', code: 9 }
		];
	}

	createCustomDBError(err) {
		if (err.errors) {
			const errorPayload = [];
			for (let i = 0; i < err.errors.length; i += 1) {
				for (let c = 0; c < this.customErrors.length; c += 1) {
					if (
						err.errors[i].message === this.customErrors[c].message
					) {
						errorPayload.push(this.customErrors[c]);
					}
				}
			}
			return errorPayload;
		}
		if (err.message) {
			for (let i = 0; i < this.customErrors.length; i += 1) {
				if (err.message === this.customErrors[i].message) {
					return this.customErrors[i];
				}
			}
			return {
				message: err.message,
				stack: err.stack
			};
		}
		if (typeof err === 'string') {
			for (let i = 0; i < this.customErrors.length; i += 1) {
				if (err === this.customErrors[i].message) {
					return {
						errors: this.customErrors[i]
					};
				}
			}
		}
		return err;
	}
}

module.exports = new DBError();
