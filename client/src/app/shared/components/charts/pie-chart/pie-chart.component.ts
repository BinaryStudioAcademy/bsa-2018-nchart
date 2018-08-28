import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as d3 from 'd3';
@Component({
	selector: 'app-pie-chart',
	templateUrl: './pie-chart.component.html',
	styleUrls: ['./pie-chart.component.sass']
})
export class PieChartComponent implements OnInit, OnChanges {
	@Input()
	width = 500;
	@Input()
	data: any[];

	svg: any;
	x: any;
	y: any;
	margin = { top: 20, right: 20, bottom: 20, left: 40 };
	m = 10;
	radius = 100;
	color = d3.scale.category20c();
	g: any;

	ngOnInit() {
		this.data = [
			[11975, 5871, 8916, 2868],
			[1951, 10048, 2060, 6171],
			[8010, 16145, 8090, 8045],
			[1013, 990, 940, 6907]
		];
	}

	ngOnChanges() {
		if (this.data !== undefined) {
			this.svg = d3
				.select('.pie-chart')
				.selectAll('svg')
				.data(this.data)
				.enter()
				.append('svg')
				.attr('width', (this.radius + this.m) * 2)
				.attr('height', (this.radius + this.m) * 2)
				.append('g')
				.attr(
					'transform',
					`translate(${this.radius + this.m}, ${this.radius +
						this.m})`
				);

			this.svg
				.selectAll('path')
				.data(d3.layout.pie())
				.enter()
				.append('path')
				.attr(
					'd',
					d3.svg
						.arc()
						.innerRadius(this.radius / 2)
						.outerRadius(this.radius)
				)
				.style('fill', function(d, i) {
					return this.color(i);
				});
		}
	}
}
