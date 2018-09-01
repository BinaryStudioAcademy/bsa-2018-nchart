import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import { CustomizeOption } from '@app/models/chart.model';
import ColorHash from 'color-hash';
interface DataType {
	label: string;
	name: string;
	value: number;
}

interface Settings<T> {
	width: T;
	margin: T;
	radius: T;
	isDonut: T;
	sortChartsBy: T;
	sortArcsBy: T;
	showValues: T;
}

@Component({
	selector: 'app-pie-chart',
	templateUrl: './pie-chart.component.html',
	styleUrls: ['./pie-chart.component.sass']
})
export class PieChartComponent implements OnInit, OnChanges {
	@Input()
	settings: Settings<CustomizeOption>;
	@Input()
	data: DataType[];

	getSettingsValue(settings: Settings<CustomizeOption>): Settings<any> {
		return Object.keys(settings).reduce(
			(acc, v) => {
				acc[v] = settings[v].value;
				return acc;
			},
			{} as Settings<any>
		);
	}
	ngOnInit() {}
	ngOnChanges() {
		d3.selectAll('.pie').remove();
		const {
			width,
			margin,
			radius,
			isDonut,
			sortChartsBy,
			sortArcsBy,
			showValues
		} = this.getSettingsValue(this.settings);

		switch (sortChartsBy) {
			case 'name(asc)':
				this.data.sort((a, b) => {
					return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
				});
				break;
			case 'name(desc)':
				this.data.sort((a, b) => {
					return a.label > b.label ? -1 : a.label < b.label ? 1 : 0;
				});
				break;
			default:
				break;
		}

		d3.select('.pie-chart').style('width', `${width}px`);

		const pie = d3.pie<DataType>().value(d => {
			return d.value;
		});
		switch (sortArcsBy) {
			case 'value':
				pie.sort((a, b) => {
					return b.value - a.value;
				});
				break;
			case 'name':
				pie.sort(function(a, b) {
					return a.name < b.name ? 1 : b.name < a.name ? -1 : 0;
				});
				break;
			default:
				break;
		}

		const colorHash = new ColorHash();
		const arc = d3.arc().outerRadius(radius);

		isDonut ? arc.innerRadius(radius / 1.5) : arc.innerRadius(0);

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
			.attr('class', 'pie')
			.style('display', 'inline-block')
			.style('width', (radius + margin) * 2 + 'px')
			.style('height', (radius + margin) * 2 + 'px')
			.append('svg')
			.attr('width', (radius + margin) * 2)
			.attr('height', (radius + margin) * 2)
			.append('g')
			.attr(
				'transform',
				'translate(' + (radius + margin) + ',' + (radius + margin) + ')'
			);

		svg.append('text')
			.attr('dy', `${radius + 20}`)
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
				return colorHash.hex(d.data.name + '');
			});
		if (showValues) {
			g.append('title').text(function(d) {
				return d.data.value;
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
					return `${d.data.value}`;
				});
		}
		function angle(d) {
			const a = ((d.startAngle + d.endAngle) * 90) / Math.PI - 90;
			return a > 90 ? a - 180 : a;
		}
	}
}
