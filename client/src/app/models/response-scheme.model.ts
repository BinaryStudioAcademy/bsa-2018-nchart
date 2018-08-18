export interface ResponseScheme<T> {
	readonly isSuccess: boolean;
	readonly payload: T;
	readonly errors: {
		message: string;
		errorCode: string;
	}[];
}
