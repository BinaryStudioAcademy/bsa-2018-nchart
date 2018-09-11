import {
	Component,
	Input,
	OnInit,
	OnChanges,
	ViewChild,
	ElementRef
} from '@angular/core';
import * as d3 from 'd3';
import { CustomizeOption } from '@app/models/chart.model';
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
	templateUrl: './pie-chart.component.html'
})
export class PieChartComponent implements OnInit, OnChanges {
	@Input()
	settings: Settings<CustomizeOption>;
	@Input()
	data: DataType[];
	@ViewChild('chart')
	chart: ElementRef;

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
		if (this.data && this.settings) {
			d3.selectAll('svg').remove();
			const {
				width,
				margin,
				radius,
				isDonut,
				sortChartsBy,
				sortArcsBy,
				showValues
			} = this.getSettingsValue(this.settings);

			const colorsSet = new Set();
			const numberOfPies = new Set();
			this.data.forEach(element => {
				numberOfPies.add(element.label);
				colorsSet.add(element.name);
			});
			const colorsArr = [];
			colorsSet.forEach(element => {
				colorsArr.push(element);
			});
			const color = d3
				.scaleSequential(d3.interpolateSpectral)
				.domain([0, colorsArr.length - 1]);

			switch (sortChartsBy) {
				case 'name(asc)':
					this.data.sort((a, b) => {
						return a.label < b.label
							? -1
							: a.label > b.label
								? 1
								: 0;
					});
					break;
				case 'name(desc)':
					this.data.sort((a, b) => {
						return a.label > b.label
							? -1
							: a.label < b.label
								? 1
								: 0;
					});
					break;
				default:
					break;
			}

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
			const arc = d3.arc().outerRadius(radius);

			isDonut ? arc.innerRadius(radius / 1.5) : arc.innerRadius(0);

			const pies = d3
				.nest<DataType>()
				.key(function(d) {
					return d.label;
				})
				.entries(this.data);

			let row = 1;
			let count = 0;
			let column = 1;
			const numInRow = 4;
			const columns = Math.ceil(numberOfPies.size/4)
			const svg = d3
				.selectAll('.pie-chart')
				.append('svg')
				.attr('width', width)
				.attr('height', (radius+margin)*2*columns+50)
				.attr('xmlns', 'http://www.w3.org/2000/svg')
				.attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
				.selectAll('g')
				.data(pies)
				.enter()
				.append('g')
				.attr('width', (radius + margin) * 2)
				.attr('height', (radius + margin) * 2)
				.append('g')
				.attr('transform', function(d) {
					const x = (radius + margin) * 2 * row - radius;
					const y = (radius + margin) * 2 * column - radius;
					const translate = `translate(${x}, ${y})`;
					row++;
					count++;
					if (row > numInRow) {
						row = 1;
						column++;
					}
					if(count === numberOfPies.size){
						row = 1;
						column = 1;
					}
					return translate;
				});

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
				.style('fill', function(d: any) {
					return color(colorsArr.indexOf(d.data.name));
				});
			g.append('title').text(function(d) {
				return d.data.name +': '+d.data.value;
			});
			if (showValues) {
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
		}
		function angle(d) {
			const a = ((d.startAngle + d.endAngle) * 90) / Math.PI - 90;
			return a > 90 ? a - 180 : a;
		}
	}
}
