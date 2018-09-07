import { Component, Input, ElementRef, ViewChild, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';
import { CustomizeOption } from '@app/models/chart.model';
interface SNodeExtra {
	nodeId: number;
	name: string;
}
interface SLinkExtra {
	source: number;
	target: number;
	value: number;
}
type SNode = d3Sankey.SankeyNode<SNodeExtra, SLinkExtra>;
type SLink = d3Sankey.SankeyLink<SNodeExtra, SLinkExtra>;

interface DataType {
	nodes: SNode[];
	links: SLink[];
}

interface Settings<T> {
	width: T;
	height: T;
	nodeWidth: T;
	nodePadding: T;
	linksOpacity: T;
}

@Component({
	selector: 'app-alluvial-diagram-chart ',
	templateUrl: './alluvial-diagram-chart.component.html'
})
export class AlluvialDiagramChartComponent implements OnInit {
	@Input()
	// data: DataType[];
	@Input()
	settings: Settings<CustomizeOption>;
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
	margin = { top: 50, right: 10, bottom: 10, left: 20 };

	ngOnInit() {
		const data: DataType = {
			nodes: [
				{ nodeId: 0, name: 'a' },
				{ nodeId: 1, name: 'b' },
				{ nodeId: 2, name: 'c' },
				{ nodeId: 3, name: 'English' },
				{ nodeId: 4, name: 'German' }
			],
			links: [
				{ source: 0, target: 3, value: 1 },
				{ source: 1, target: 3, value: 1 },
				{ source: 2, target: 3, value: 1 },
				{ source: 0, target: 4, value: 1 },
				{ source: 1, target: 4, value: 1 },
				{ source: 2, target: 4, value: 1 }
			]
		};
		let {
			width,
			height,
			nodeWidth,
			nodePadding,
			linksOpacity
		} = this.getSettingsValue(this.settings);
		width = 700 - this.margin.left - this.margin.right;
		height = 350 - this.margin.top - this.margin.bottom;
		nodeWidth = 10;
		nodePadding = 10;
		linksOpacity = 0.3;
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

		const formatNumber = d3.format(',.0f'),
			format = function(d: any) {
				return formatNumber(d);
			},
			color = d3.scaleOrdinal(d3.schemeCategory10);

		const sankey = d3Sankey
			.sankey()
			.nodeWidth(nodeWidth)
			.nodePadding(nodePadding)
			.size([width, height]);

		let link = svg
			.append('g')
			.attr('class', 'links')
			.attr('fill', 'none')
			.attr('stroke-opacity', linksOpacity)
			.selectAll('path');

		let node = svg
			.append('g')
			.attr('class', 'nodes')
			.attr('font-family', 'sans-serif')
			.attr('font-size', 10)
			.selectAll('g');

		sankey(data);

		link = link
			.data(data.links)
			.enter()
			.append('path')
			.attr('d', d3Sankey.sankeyLinkHorizontal())
			.attr('stroke', function(d: any) {
				return color(d.source.name);
			})
			.attr('stroke-width', function(d: any) {
				return Math.max(1, d.width);
			});

		link.append('title').text(function(d: any) {
			return d.source.name + ' → ' + d.target.name;
		});

		node = node
			.data(data.nodes)
			.enter()
			.append('g');

		node.append('rect')
			.attr('x', function(d: any) {
				return d.x0;
			})
			.attr('y', function(d: any) {
				return d.y0;
			})
			.attr('height', function(d: any) {
				return d.y1 - d.y0;
			})
			.attr('width', function(d: any) {
				return d.x1 - d.x0;
			})
			.attr('fill', function(d: any) {
				return color(d.name);
			})
			.attr('stroke', '#000');

		node.append('text')
			.attr('x', function(d: any) {
				return d.x0 - 6;
			})
			.attr('y', function(d: any) {
				return (d.y1 + d.y0) / 2;
			})
			.attr('dy', '0.35em')
			.attr('text-anchor', 'end')
			.text(function(d: any) {
				return d.name;
			})
			.filter(function(d: any) {
				return d.x0 < width / 2;
			})
			.attr('x', function(d: any) {
				return d.x1 + 6;
			})
			.attr('text-anchor', 'start');

		node.append('title').text(function(d: any) {
			return d.name + '\n' + format(d.value);
		});
	}
}
