import {
	Component,
	Input,
	OnChanges,
	ElementRef,
	ViewChild
} from '@angular/core';
import * as d3 from 'd3';
import { CustomizeOption } from '@app/models/chart.model';

interface Settings<T> {
	width: T;
	height: T;
	maxRadius: T;
	setOrigin: T;
}
interface DataType {
	xAxis: number;
	yAxis: number;
	size: number;
	item: string;
}

@Component({
	selector: 'app-scatterplot-chart ',
	templateUrl: './scatterplot-chart.component.html'
})
export class ScatterplotChartComponent implements OnChanges {
	@Input()
	data: DataType[];

	@Input()
	settings: Settings<CustomizeOption>;

	@ViewChild('chart')
	chart: ElementRef;

	margin = { top: 30, right: 150, bottom: 40, left: 70 };

	getSettingsValue(settings: Settings<CustomizeOption>): Settings<any> {
		return Object.keys(settings).reduce(
			(acc, v) => {
				acc[v] = settings[v].value;
				return acc;
			},
			{} as Settings<any>
		);
	}

	ngOnChanges() {
		const { width, height, maxRadius, setOrigin } = this.getSettingsValue(
			this.settings
		);
		d3.select('svg').remove();
		d3.selectAll('.tooltip').remove();
		const svg = d3
			.select('.scatterplot-chart')
			.append('svg')
			.attr('width', width + this.margin.left + this.margin.right)
			.attr('height', height + this.margin.top + this.margin.bottom)
			.attr('xmlns', 'http://www.w3.org/2000/svg')
			.attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
			.append('g')
			.attr(
				'transform',
				'translate(' + this.margin.left + ',' + this.margin.top + ')'
			);

		const xScale = d3.scaleLinear().range([0, width]);

		const yScale = d3.scaleLinear().range([height, 0]);

		const radius = d3.scaleSqrt().range([2, maxRadius]);

		const xAxis = d3.axisBottom(xScale);

		const yAxis = d3.axisLeft(yScale);

		const color = d3.scaleOrdinal(d3.schemeCategory10);

		const tooltip = d3
			.select('body')
			.append('div')
			.attr('class', 'tooltip')
			.style('opacity', 0);

		if (setOrigin) {
			xScale
				.domain([
					0,
					d3.max(this.data, d => {
						return d.xAxis;
					})
				])
				.nice();
			yScale
				.domain([
					0,
					d3.max(this.data, d => {
						return d.yAxis;
					})
				])
				.nice();
		} else {
			xScale
				.domain(
					d3.extent(this.data, d => {
						return d.xAxis;
					})
				)
				.nice();
			yScale
				.domain(
					d3.extent(this.data, d => {
						return d.yAxis;
					})
				)
				.nice();
		}

		// Size
		radius
			.domain(
				d3.extent(this.data, function(d) {
					return d.size;
				})
			)
			.nice();

		svg.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.attr('class', 'x axis')
			.call(xAxis);

		svg.append('g')
			.attr('transform', 'translate(0,0)')
			.attr('class', 'y axis')
			.call(yAxis);

		const bubble = svg
			.selectAll('.bubble')
			.data(this.data)
			.enter()
			.append('circle')
			.attr('class', 'bubble')
			.attr('cx', function(d) {
				return xScale(d.xAxis);
			})
			.attr('cy', function(d) {
				return yScale(d.yAxis);
			})
			.attr('r', function(d) {
				return radius(d.size);
			})
			.style('fill', function(d) {
				return color(d.item);
			});

		bubble
			.append('title')
			.attr('x', function(d) {
				return radius(d.size);
			})
			.text(function(d) {
				return d.item;
			})
			.on('mouseover', function(d) {
				tooltip
					.transition()
					.duration(0)
					.style('opacity', 0.9);
				tooltip
					.html('Species:' + d.item)
					.style('left', d3.event.pageX + 5 + 'px')
					.style('top', d3.event.pageY - 28 + 'px');
			})
			.on('mouseout', function(d) {
				tooltip
					.transition()
					.duration(500)
					.style('opacity', 0);
			});

		const legend = svg
			.selectAll('legend')
			.data(color.domain())
			.enter()
			.append('g')
			.attr('class', 'legend')
			.attr('transform', function(d, i) {
				return 'translate(0,' + i * 20 + ')';
			});

		// give x value equal to the legend elements.
		// no need to define a function for fill, this is automatically fill by color.
		legend
			.append('rect')
			.attr('x', width+this.margin.right/2)
			.attr('width', 18)
			.attr('height', 18)
			.style('fill', color);

		// add text to the legend elements.
		// rects are defined at x value equal to width, we define text at width - 6, this will print name of the legends before the rects.
		legend
			.append('text')
			.attr('x', width - 6 + this.margin.right/2)
			.attr('y', 9)
			.attr('dy', '.35em')
			.style('text-anchor', 'end')
			.text(function(d) {
				return d;
			});

		legend.on('click', function(type) {
			d3.selectAll('.bubble')
				.style('opacity', 0.15)
				.filter(d => {
					return d['item'] === type;
				})
				.style('opacity', 1);
		});
	}
}
