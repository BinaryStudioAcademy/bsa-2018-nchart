import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

@Component({
	selector: 'app-bar-chart',
	templateUrl: './bar-chart.component.html',
	styleUrls: ['./bar-chart.component.sass']
})
export class BarChartComponent implements OnInit, OnChanges {
	@Input()
	data: any[];
	@Input()
	settings: {
		height: number;
		width: number;
		leftMargin: number;
		verticalPadding: number;
		innerPadding: number;
	} = {
		height: 500,
		width: 500,
		leftMargin: 30,
		verticalPadding: 20,
		innerPadding: 0.5
	};

	svg: any;
	x: any;
	y: any;
	margin = { top: 20, right: 20, bottom: 20, left: 40 };
	g: any;

	ngOnInit() {}

	ngOnChanges() {
		if (this.data !== undefined) {
			const {
				width,
				height,
				leftMargin,
				innerPadding,
				verticalPadding
			} = this.settings;

			const tip = d3Tip()
				.attr('class', 'd3-tip')
				.offset([-10, 0])
				.html(function(d) {
					return `<strong>${
						d.name
					} :</strong> <span style='color:red'> ${d.value} </span>`;
				});

			d3.select('svg').remove();
			d3.select('.d3-tip').remove();
			this.svg = d3
				.select('.bar-chart')
				.append('svg')
				.attr('width', width)
				.attr('height', height);
			this.g = this.svg
				.append('g')
				.attr(
					'transform',
					'translate(' + leftMargin + ',' + this.margin.top + ')'
				);

			const innerWidth =
				+this.svg.attr('width') - this.margin.left - this.margin.right;
			const innerHeight =
				+this.svg.attr('height') -
				this.margin.top -
				this.margin.bottom -
				verticalPadding;

			this.svg.call(tip);

			this.x = d3
				.scaleBand()
				.rangeRound([0, innerWidth])
				.paddingInner(innerPadding);

			this.y = d3.scaleLinear().rangeRound([innerHeight, 0]);

			this.x.domain(this.data.map(d => d.group));
			this.y.domain([0, d3.max(this.data, d => d.value)]);
			const x1 = d3
				.scaleBand()
				.padding(0.1)
				.rangeRound([0, this.x.bandwidth()]);

			x1.domain(this.data.map(d => d.id));

			this.g
				.selectAll('.bar')
				.data(this.data)
				.enter()
				.append('rect')
				.attr('class', 'bar')
				.attr('x', (d, i) => this.x(d.group) + x1(d.id))
				.attr('y', d => this.y(d.value))
				.attr('width', x1.bandwidth())
				.attr(
					'height',
					d => innerHeight - this.y(this.clampHeight(d.value))
				)
				.attr('fill', d => d.color)
				.on('mouseover', function(d) {
					tip.show(d, this);
				})
				.on('mouseout', function(d) {
					tip.hide(d, this);
				});

			this.g
				.append('g')
				.attr('class', 'axis')
				.attr('transform', 'translate(0,' + innerHeight + ')')
				.call(d3.axisBottom(this.x));

			this.g
				.append('g')
				.attr('class', 'axis')
				.call(d3.axisLeft(this.y))
				.append('text')
				.attr('x', 2)
				.attr('y', this.y(this.y.ticks().pop()) + 0.5)
				.attr('dy', '0.32em')
				.attr('fill', '#000')
				.attr('font-weight', 'bold')
				.attr('text-anchor', 'start');
		}
	}

	clampHeight(value: number) {
		if (value < 0) {
			return 0;
		}
		return value;
	}
}
