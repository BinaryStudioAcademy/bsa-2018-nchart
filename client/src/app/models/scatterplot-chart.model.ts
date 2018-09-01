export interface ScatterplotChartDataObj {
	xaxis: number[];
	yaxis: number[];
	size: number[];
	color: number[] | string[];
}

export class ScatterplotChartCustomize {
	constructor(
		public width: number = null,
		public height: number = null,
		public maxRadius: number = null,
		public setOrigin: number = null,
		public colourScale: number[] = null
	) {}
}
