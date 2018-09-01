import {
	Component,
	Input,
	OnInit,
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
	selector: 'app-scatterplot-chart',
	templateUrl: './scatterplot-chart.component.html'
})
export class ScatterplotChartComponent implements OnInit, OnChanges {
	@Input()
	data: DataType[];
	@Input()
	settings: Settings<CustomizeOption>;
	@ViewChild('chart')
	chart: ElementRef;

	margin = { top: 30, right: 50, bottom: 40, left: 40 };
	width = 960 - this.margin.left - this.margin.right;
	height = 500 - this.margin.top - this.margin.bottom;
	maxRadius = 20;

	ngOnInit() {
		this.data = [
			{ xAxis: 1.5, yAxis: 2, size: 1, item: 'Iris-setosa' },
			{ xAxis: 3.1, yAxis: 3.7, size: 2, item: 'Iris-virginica' },
			{ xAxis: 3.4, yAxis: 1.5, size: 3, item: 'Iris-versicolo' },
			{ xAxis: 2.5, yAxis: 2.5, size: 4, item: 'Iris-setosa' },
			{ xAxis: 8.1, yAxis: 3.6, size: 5, item: 'Iris-virginica' },
			{ xAxis: 3.1, yAxis: 3.5, size: 6, item: 'Iris-versicolo' },
			{ xAxis: 5.5, yAxis: 1, size: 7, item: 'Iris-setosa' },
			{ xAxis: 3.1, yAxis: 6, size: 8, item: 'Iris-virginica' },
			{ xAxis: 4.1, yAxis: 2, size: 10, item: 'Iris-versicolo' },
			{ xAxis: 1.5, yAxis: 2.5, size: 11, item: 'Iris-setosa' },
			{ xAxis: 3.1, yAxis: 2.3, size: 12, item: 'Iris-virginica' },
			{ xAxis: 2.1, yAxis: 1, size: 13, item: 'Iris-versicolo' }
		];

		const svg = d3
			.select('.scatterplot-chart')
			.append('svg')
			.attr('width', this.width + this.margin.left + this.margin.right)
			.attr('height', this.height + this.margin.top + this.margin.bottom)
			.append('g')
			.attr(
				'transform',
				'translate(' + this.margin.left + ',' + this.margin.top + ')'
			);

		const xScale = d3.scaleLinear().range([0, this.width]);

		const yScale = d3.scaleLinear().range([this.height, 0]);

		const radius = d3.scaleSqrt().range([2, this.maxRadius]);

		const xAxis = d3.axisBottom(xScale);

		const yAxis = d3.axisLeft(yScale);

		const color = d3.scaleOrdinal(d3.schemeCategory10);

		/*  //X axis
		xScale.domain(d3.extent(this.data, d => {
			return d.xAxis;
		})).nice();
         //Y axis
		yScale.domain(d3.extent(this.data, d => {
			return d.size;
		})).nice();
		radius.domain(d3.extent(this.data, d => {
			return d.size;
		})).nice();
    */

		xScale
			.domain([
				0,
				d3.max(this.data, function(d) {
					return d.xAxis;
				})
			])
			.nice();
		yScale
			.domain([
				0,
				d3.max(this.data, function(d) {
					return d.size;
				})
			])
			.nice();
		// Size
		radius
			.domain(
				d3.extent(this.data, function(d) {
					return d.size;
				})
			)
			.nice();

		svg.append('g')
			.attr('transform', 'translate(0,' + this.height + ')')
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
			});
	}

	ngOnChanges() {}
}
