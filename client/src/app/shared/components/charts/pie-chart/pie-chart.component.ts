import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

export interface DataType {
	label: string;
	item: string;
	value: number;
}

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
	radius = 100;
	color = d3.scaleOrdinal(d3.schemeCategory10);
	g: any;

	ngOnInit() {
		this.data = [
			{ label: 'Africa', item: 'A', value: 5 },
			{ label: 'Africa', item: 'B', value: 22 },
			{ label: 'Africa', item: 'C', value: 11 },
			{ label: 'Asia', item: 'A', value: 4 },
			{ label: 'Asia', item: 'B', value: 3 },
			{ label: 'Asia', item: 'C', value: 2 },
			{ label: 'Asia', item: 'D', value: 1 },
			{ label: 'Europe', item: 'A', value: 360 },
			{ label: 'Europe', item: 'B', value: 245 }
		];

		const m = 15,
			r = 100,
			z = d3.scaleOrdinal(d3.schemeCategory10);

		const pie = d3
			.pie<DataType>()
			.value(function(d) {
				return d.value;
			})
			.sort(function(a, b) {
				return b.value - a.value;
			});
		// .sort(function(a, b)  {return (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0);})

		const arc = d3
			.arc()
			.innerRadius(0)
			.outerRadius(r);

		const pies = d3
			.nest<DataType>()
			.key(function(d) {
				return d.label;
			})
			.entries(this.data);

		const svg = d3
			.select('.pie-chart')
			.selectAll('div')
			.data(pies)
			.enter()
			.append('div')
			.style('display', 'inline-block')
			.style('width', (r + m) * 2 + 'px')
			.style('height', (r + m) * 2 + 'px')
			.append('svg')
			.attr('width', (r + m) * 2)
			.attr('height', (r + m) * 2)
			.append('g')
			.attr('transform', 'translate(' + (r + m) + ',' + (r + m) + ')');

		svg.append('text')
			.attr('dy', '7.8em')
			.attr('text-anchor', 'middle')
			.text(function(d) {
				return d.key;
			});

		const g = svg
			.selectAll('g')
			.data(function(d) {
				return pie(d.values);
			})
			.enter()
			.append('g');

		g.append('path')
			.attr('d', <any>arc)
			.style('fill', function(d) {
				return z(d.data.item);
			})
			.append('title')
			.text(function(d) {
				return d.data.item + ': ' + d.data.value;
			});

		g.filter(function(d) {
			return d.endAngle - d.startAngle > 0.2;
		})
			.append('text')
			.attr('dy', '.35em')
			.attr('text-anchor', 'middle')
			.attr('transform', function(d) {
				return (
					'translate(' +
					arc.centroid(<any>d) +
					')rotate(' +
					angle(d) +
					')'
				);
			})
			.text(function(d) {
				return `${d.data.item}: ${d.data.value}`;
			});

		function angle(d) {
			const a = ((d.startAngle + d.endAngle) * 90) / Math.PI - 90;
			return a > 90 ? a - 180 : a;
		}
	}
}
