class GeneratePayload {
	constructor() {
		this.payload = null;
		this.failure = null;
	}

	generateSuccess(payload) {
		this.payload = payload;
		return {
			payload: this.payload,
			isSuccess: true,
			errors: []
		};
	}

	generateFailure(err) {
		this.failure = err;
		return {
			payload: null,
			isSuccess: false,
			errors: this.failure.errors
		};
	}
}

module.exports = new GeneratePayload();
