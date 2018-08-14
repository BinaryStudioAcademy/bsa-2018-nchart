type column = {
	title?: string,
	type?: string
};

export interface FileData {
	columns?: column[],
	data?: any,
}
