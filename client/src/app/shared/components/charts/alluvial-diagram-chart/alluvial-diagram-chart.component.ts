import { Component, Input, ElementRef, ViewChild, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { sankey as Sankey } from './sankey.js';
interface DataType {
	dy: any;
	source: any;
	sy: number;
	target: any;
	ty: any;
	value: number;
}

@Component({
	selector: 'app-alluvial-diagram-chart ',
	templateUrl: './alluvial-diagram-chart.component.html'
})
export class AlluvialDiagramChartComponent implements OnInit {
	@Input()
	data: DataType[];

	@ViewChild('chart')
	chart: ElementRef;

	margin = { top: 70, right: 10, bottom: 10, left: 100 };

	ngOnInit() {
		const width = 700 - this.margin.left - this.margin.right;
		const height = 350 - this.margin.top - this.margin.bottom;
		const formatNumber = d3.format(',.0f');
		const format = function(d) {
			return formatNumber(d);
		};
		const color = d3.scaleOrdinal(d3.schemeCategory10);
		const data = {
			nodes: [
				{ node: 0, name: 'node0' },
				{ node: 1, name: 'node1' },
				{ node: 2, name: 'node2' },
				{ node: 3, name: 'node3' }
			],
			links: [
				{ source: 0, target: 2, value: 1 },
				{ source: 1, target: 3, value: 1 }
			]
		};

		const svg = d3
			.selectAll('.alluvial-diagram-chart')
			.append('svg')
			.attr('width', width + this.margin.left + this.margin.right)
			.attr('height', height + this.margin.top + this.margin.bottom)
			.append('g')
			.attr(
				'transform',
				'translate(' + this.margin.left + ',' + this.margin.top + ')'
			);
		const sankey = Sankey();

		sankey
			.nodeWidth(36)
			.nodePadding(20)
			.size([width, height]);

		const path = sankey.link();

		sankey
			.nodes(data.nodes)
			.links(data.links)
			.layout(32);

		// add in the links
		const link = svg
			.append('g')
			.selectAll('.link')
			.data<any>(data.links)
			.enter()
			.append('path')
			.attr('class', 'link')
			.attr('d', path)
			.style('stroke-width', function(d) {
				return Math.max(1, d.dy);
			})
			.sort(function(a, b) {
				return b.dy - a.dy;
			});

		// add the link titles
		link.append('title').text(function(d) {
			return (
				d.source.name + ' → ' + d.target.name + '\n' + format(d.value)
			);
		});

		// add in the nodes
		const node = svg
			.append('g')
			.selectAll('.node')
			.data<any>(data.nodes)
			.enter()
			.append('g')
			.attr('class', 'node')
			.attr('transform', function(d) {
				return 'translate(' + d.x + ',' + d.y + ')';
			});

		// add the rectangles for the nodes
		node.append('rect')
			.attr('height', function(d) {
				return d.dy;
			})
			.attr('width', sankey.nodeWidth())
			.style('fill', function(d) {
				return (d.color = color(d.name.replace(/ .*/, '')));
			})
			.append('title')
			.text(function(d) {
				return d.name + '\n' + format(d.value);
			});

		// add in the title for the nodes
		node.append('text')
			.attr('x', -6)
			.attr('y', function(d) {
				return d.dy / 2;
			})
			.attr('dy', '.35em')
			.attr('text-anchor', 'end')
			.attr('transform', null)
			.text(function(d) {
				return d.name;
			})
			.filter(function(d) {
				return d.x < width / 2;
			})
			.attr('x', 6 + sankey.nodeWidth())
			.attr('text-anchor', 'start');
	}
}
