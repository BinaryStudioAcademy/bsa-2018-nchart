export interface BarChartCustomize {
	width: number;
	height: number;
	leftMargin: number;
	verticalPadding: number;
	horizontalPadding: number;
	useSameScale: boolean;
	colourScale: number[];
}

export interface BarChartDataObj {
	xaxis: number[] | string[];
	group: number[] | string[];
	size: number[];
	color: number[] | string[];
}
