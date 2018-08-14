interface Column {
	title?: string;
	type?: string;
}

export interface FileData {
	columns?: Column[];
	data?: any;
}
