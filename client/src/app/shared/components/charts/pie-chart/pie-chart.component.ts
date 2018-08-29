import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
	selector: 'app-pie-chart',
	templateUrl: './pie-chart.component.html',
	styleUrls: ['./pie-chart.component.sass']
})
export class PieChartComponent implements OnInit {
	@Input()
	width = 500;
	@Input()
	data: any[];

	svg: any;
	x: any;
	y: any;
	margin = { top: 20, right: 20, bottom: 20, left: 40 };
	m = 10;
	radius = 150;
	color = d3.scaleOrdinal(d3.schemeCategory10);
	g: any;

	ngOnInit() {
		this.data = [
			{ label: 'Africa', values: [100, 200, 300, 400] },
			{ label: 'Europe', values: [100, 200, 300, 400] },
			{ label: 'Asia', values: [100, 200, 300, 400] },
			{ label: 'America', values: [400, 300, 200, 100] }
		];

		this.svg = d3
			.select('.pie-chart')
			.selectAll('svg')
			.data(this.data)
			.enter()
			.append('svg')
			.attr('width', (this.radius + this.m) * 2)
			.attr('height', (this.radius + this.m) * 2)
			.append('g')
			.attr('class', 'pie')
			.attr(
				'transform',
				`translate(${this.radius + this.m}, ${this.radius + this.m})`
			);

		const arc = d3
			.arc()
			.innerRadius(this.radius / 2)
			.outerRadius(this.radius);
		const labelArc = d3
			.arc()
			.outerRadius(this.radius - this.radius / 5)
			.innerRadius(this.radius - this.radius / 5);

		this.svg
			.selectAll('path')
			.data(d3.pie())
			.enter()
			.append('g')
			.attr('class', 'arc')
			.append('path')
			.attr('d', arc)
			.style('fill', (d, i) => {
				return this.color(i);
			});

		this.svg
			.selectAll('.arc')
			.data(
				this.data.map(t => {
					return t.values;
				})
			)
			.append('text')
			.attr('transform', d => {
				return 'translate(' + labelArc.centroid(d) + ')';
			})
			.attr('dy', '.35em')
			.text(function(d) {
				return d.value;
			});
	}
}
