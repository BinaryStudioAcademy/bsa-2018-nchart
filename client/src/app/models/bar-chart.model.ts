export interface BarChartDataObj {
	xaxis: number[] | string[];
	group: number[] | string[];
	size: number[];
	color: number[] | string[];
}

export class BarChartCustomize {
	constructor(
		public width: number = null,
		public height: number = null,
		public leftMargin: number = null,
		public verticalPadding: number = null,
		public horizontalPadding: number = null,
		public useSameScale: boolean = null,
		public colourScale: number[] = null
	) {}
}
