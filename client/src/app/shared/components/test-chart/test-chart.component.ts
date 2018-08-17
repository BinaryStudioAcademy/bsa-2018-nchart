import * as d3 from 'd3';
import { Component, OnInit } from '@angular/core';
import { data } from './test-data';

@Component({
	selector: 'app-test-chart',
	templateUrl: './test-chart.component.html',
	styleUrls: ['./test-chart.component.css']
})
export class TestChartComponent implements OnInit {
	title = 'Test Chart';
	barColor = 'steelblue';
	svgSize = {
		width: 700,
		height: 500
	};

	margin = {
		top: 20,
		right: 20,
		bottom: 30,
		left: 50
	};

	width: number;
	height: number;
	x: any;
	y: any;
	svg: any;
	g: any;

	constructor() {
		this.width = 900 - this.margin.left - this.margin.right;
		this.height = 500 - this.margin.top - this.margin.bottom;
	}

	ngOnInit() {
		this.initSvg();
		this.initAxis();
		this.drawAxis();
		this.drawChart();
	}

	initSvg() {
		this.svg = d3
			.select('app-test-chart')
			.append('svg')
			.attr('width', this.svgSize.width)
			.attr('height', this.svgSize.height);
		this.width =
			+this.svg.attr('width') - this.margin.left - this.margin.right;
		this.height =
			+this.svg.attr('height') - this.margin.top - this.margin.bottom;
		this.g = this.svg
			.append('g')
			.attr(
				'transform',
				'translate(' + this.margin.left + ',' + this.margin.top + ')'
			);
	}

	initAxis() {
		this.x = d3
			.scaleBand()
			.rangeRound([0, this.width])
			.padding(0.1);
		this.y = d3.scaleLinear().rangeRound([this.height, 0]);
		this.x.domain(data.map(d => d.stage));
		this.y.domain([0, d3.max(data, d => d.count)]);
	}

	drawAxis() {
		this.g
			.append('g')
			.attr('transform', 'translate(0,' + this.height + ')')
			.call(d3.axisBottom(this.x));

		this.g
			.append('text')
			.attr(
				'transform',
				'translate(' +
					this.width / 2 +
					' ,' +
					(this.height + this.margin.top + 5) +
					')'
			)
			.style('text-anchor', 'middle')
			.text('Stage');

		this.g.append('g').call(d3.axisLeft(this.y));

		this.g
			.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('y', -50)
			.attr('x', 0 - this.height / 2)
			.attr('dy', '1em')
			.style('text-anchor', 'middle')
			.text('Participants');
	}

	drawChart() {
		this.g
			.selectAll('.bar')
			.data(data)
			.enter()
			.append('rect')
			.attr('class', 'bar')
			.attr('fill', this.barColor)
			.attr('x', d => this.x(d.stage))
			.attr('y', d => this.y(d.count))
			.attr('width', this.x.bandwidth())
			.attr('height', d => this.height - this.y(d.count));

		this.g
			.selectAll('.bartext')
			.data(data)
			.enter()
			.append('text')
			.attr('text-anchor', 'middle')
			.attr('x', (d, i) => {
				return this.x(i) + this.x.bandwidth() / 2;
			})
			.attr('y', d => {
				return this.y(d.count) - 2;
			})
			.text(d => {
				return d.count;
			});
	}
}
