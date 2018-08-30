import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import { CustomizeOption } from '@app/models/chart.model';

interface DataType {
	label: string;
	item: string;
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
			// sortChartsBy,
			// sortArcsBy,
			showValues
		} = this.getSettingsValue(this.settings);

		this.data = [
			{ label: 'America', item: 'B', value: 20 },
			{ label: 'America', item: 'C', value: 55 },
			{ label: 'America', item: 'A', value: 11 },
			{ label: 'Europe', item: 'A', value: 9 },
			{ label: 'Europe', item: 'B', value: 2 },
			{ label: 'Europe', item: 'C', value: 22 },
			{ label: 'Africa', item: 'C', value: 5 },
			{ label: 'Africa', item: 'B', value: 22 },
			{ label: 'Africa', item: 'A', value: 11 }
		];

		this.data.sort((a, b) => {
			return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
		});

		const z = d3.scaleOrdinal(d3.schemeCategory10);

		d3.select('.pie-chart').style('width', `${width}px`);

		const pie = d3.pie<DataType>().value(d => {
			return d.value;
		});
		/*.sort((a, b) => {
				return b.value - a.value;
			});*/
		// .sort(function(a, b)  {return (a.item < b.item) ? 1 : ((b.item < a.item) ? -1 : 0);})

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
				return z(d.data.item);
			});
		if (showValues) {
			g.append('title').text(function(d) {
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
		}
		function angle(d) {
			const a = ((d.startAngle + d.endAngle) * 90) / Math.PI - 90;
			return a > 90 ? a - 180 : a;
		}
	}
}
