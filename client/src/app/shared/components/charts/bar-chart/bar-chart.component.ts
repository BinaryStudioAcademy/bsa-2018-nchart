import { Component, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';
export interface Datum {
	name: string;
	value: number;
	color: string;
}

@Component({
	selector: 'app-bar-chart',
	templateUrl: './bar-chart.component.html',
	styleUrls: ['./bar-chart.component.sass']
})
export class BarChartComponent implements OnChanges {
	@Input()
	height = 500;
	@Input()
	width = 500;
	@Input()
	data: Datum[] = [];
	@Input()
	range = 200;
	@Input()
	leftMargin = 20;
	@Input()
	verticalPadding = 30;
	@Input()
	innerPadding = 0.1;
	@Input()
	outerPadding = 0.1;

	outerWidth = this.width + 10;

	xScale: d3.ScaleBand<string> = null;
	yScale: d3.ScaleLinear<number, number> = null;

	transform = '';
	axisBottomTransform = '';
	axisLeftTransform = '';

	chartWidth = this.width - this.leftMargin;
	chartHeight = this.height - this.verticalPadding;
	barHeights: number[] = [];
	barWidth = 0;
	xCoordinates: number[] = [];

	ngOnChanges() {
		if (this.data !== undefined) {
			this.outerWidth = this.width + 10;
			this.chartWidth = this.width - this.leftMargin;
			this.chartHeight = this.height - this.verticalPadding;
			this.xScale = d3
				.scaleBand()
				.domain(this.data.map((item: Datum) => item.name))
				.range([0, this.chartWidth])
				.paddingInner(this.innerPadding);
			// .paddingOuter(this.outerPadding);

			this.yScale = d3
				.scaleLinear()
				.domain([0, this.range])
				.range([this.chartHeight, 0]);
			this.barWidth = this.xScale.bandwidth();
			this.barHeights = this.data.map((item: Datum) =>
				this.barHeight(item.value)
			);
			this.xCoordinates = this.data.map((item: Datum) =>
				this.xScale(item.name)
			);

			this.transform = `scale(1, -1) translate(${this.leftMargin}, ${-this
				.chartHeight - 5})`;
			this.axisBottomTransform = `translate(${this.leftMargin}, ${this
				.chartHeight + 5})`;
			this.axisLeftTransform = `translate(${this.leftMargin}, 5)`;
		}
	}

	clampHeight(value: number) {
		if (value < 0) {
			return 0;
		}
		if (this.chartHeight <= 0) {
			return 0;
		}
		if (value > this.chartHeight) {
			return this.chartHeight;
		}
		return value;
	}

	barHeight(value) {
		return this.clampHeight(this.chartHeight - this.yScale(value));
	}
}
