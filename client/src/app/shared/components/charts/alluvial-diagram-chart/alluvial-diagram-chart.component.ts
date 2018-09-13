import {
	Component,
	Input,
	ElementRef,
	ViewChild,
	OnChanges
} from '@angular/core';
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';
import { CustomizeOption } from '@app/models/chart.model';
interface Settings<T> {
	width: T;
	height: T;
	nodesWidth: T;
	nodePadding: T;
	linksOpacity: T;
}

@Component({
	selector: 'app-alluvial-diagram-chart ',
	templateUrl: './alluvial-diagram-chart.component.html'
})
export class AlluvialDiagramChartComponent implements OnChanges {
	@Input()
	data: any[];
	@Input()
	settings: Settings<CustomizeOption>;
	@ViewChild('chart')
	chart: ElementRef;

	margin = { top: 20, right: 10, bottom: 10, left: 10 };

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
		if (this.data.length && this.settings) {
			d3.select('svg').remove();
			const {
				width,
				height,
				nodesWidth,
				nodePadding,
				linksOpacity
			} = this.getSettingsValue(this.settings);

			const graph = { nodes: [], links: [] };

			this.data.forEach(d => {
				graph.nodes.push({ name: d.source });
				graph.nodes.push({ name: d.target });
				graph.links.push({
					source: d.source,
					target: d.target,
					value: d.value
				});
			});

			graph.links = this.compressLinks(graph.links);
			// return only the distinct / unique nodes
			const nodesSet = new Set();
			graph.nodes.forEach(element => {
				nodesSet.add(element.name);
			});
			graph.nodes = [];
			const colors = [];
			nodesSet.forEach(element => {
				graph.nodes.push(element);
				colors.push(element);
			});
			// loop through each link replacing the text with its index from node
			graph.links.forEach((d, i) => {
				graph.links[i].source = graph.nodes.indexOf(
					graph.links[i].source
				);
				graph.links[i].target = graph.nodes.indexOf(
					graph.links[i].target
				);
			});

			// now loop through each nodes to make nodes an array of objects
			// rather than an array of strings
			graph.nodes.forEach((d, i) => {
				graph.nodes[i] = {
					nodeId: i,
					name: d
				};
			});

			const svg = d3
				.selectAll('.alluvial-diagram-chart')
				.append('svg')
				.attr('width', width + this.margin.left + this.margin.right)
				.attr('height', height + this.margin.top + this.margin.bottom)
				.append('g')
				.attr(
					'transform',
					'translate(' +
						this.margin.left +
						',' +
						this.margin.top +
						')'
				);

			const formatNumber = d3.format(',.0f'),
				format = (d: any) => {
					return formatNumber(d);
				};

			const сolor = d3
				.scaleSequential(d3.interpolateSpectral)
				.domain([0, nodesSet.size - 1]);

			const sankey = d3Sankey
				.sankey()
				.nodeWidth(nodesWidth)
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

			sankey(graph);

			link = link
				.data(graph.links)
				.enter()
				.append('path')
				.attr('d', d3Sankey.sankeyLinkHorizontal())
				.attr('stroke', (d: any) => {
					return сolor(colors.indexOf(d.source.name));
				})
				.attr('stroke-width', (d: any) => {
					return Math.max(1, d.width);
				});

			link.append('title').text((d: any) => {
				return d.source.name + ' → ' + d.target.name;
			});

			node = node
				.data(graph.nodes)
				.enter()
				.append('g');

			node.append('rect')
				.attr('x', (d: any) => {
					return d.x0;
				})
				.attr('y', (d: any) => {
					return d.y0;
				})
				.attr('height', (d: any) => {
					return d.y1 - d.y0;
				})
				.attr('width', (d: any) => {
					return d.x1 - d.x0;
				})
				.attr('fill', (d: any) => {
					return сolor(colors.indexOf(d.name));
				})
				.attr('stroke', '#000');

			node.append('text')
				.attr('x', (d: any) => {
					return d.x0 - 6;
				})
				.attr('y', (d: any) => {
					return (d.y1 + d.y0) / 2;
				})
				.attr('dy', '0.35em')
				.attr('text-anchor', 'end')
				.text((d: any) => {
					return d.name;
				})
				.filter((d: any) => {
					return d.x0 < width / 2;
				})
				.attr('x', (d: any) => {
					return d.x1 + 6;
				})
				.attr('text-anchor', 'start');

			node.append('title').text((d: any) => {
				return d.name + '\n' + format(d.value);
			});
		}
	}
	compressLinks(original) {
		const compressed = [];
		const copy = original.slice(0);
		for (let i = 0; i < original.length; i++) {
			let myCount = 0;
			for (let w = 0; w < copy.length; w++) {
				if (
					original[i].source === copy[w].source &&
					original[i].target === copy[w].target
				) {
					myCount += copy[w].value;
					const a = {
						name: '',
						value: 0,
						group: '',
						id: '',
						color: ''
					};
					copy[w] = a;
				}
			}
			if (myCount > 0) {
				const a = {
					source: '',
					target: '',
					value: 0
				};
				a.source = original[i].source;
				a.target = original[i].target;
				a.value = myCount;
				compressed.push(a);
			}
		}
		return compressed;
	}
}
