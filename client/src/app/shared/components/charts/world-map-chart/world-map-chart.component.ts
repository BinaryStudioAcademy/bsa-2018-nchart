import {
	Component,
	Input,
	OnInit,
	OnChanges,
	ElementRef,
	ViewChild
} from '@angular/core';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import * as geoRobinson from 'd3-geo-projection';
import * as topojson from 'topojson';
import { CustomizeOption } from '@app/models/chart.model';
import { countries } from './world-countries';
interface Settings<T> {
	height: T;
	width: T;
	leftMargin: T;
	verticalPadding: T;
	horizontalPadding: T;
}

@Component({
	selector: 'app-world-map-chart',
	templateUrl: './world-map-chart.component.html'
})
export class WorldMapChartComponent implements OnInit, OnChanges {
	@Input()
	data: any[];
	@Input()
	settings: Settings<CustomizeOption>;

	margin = { top: 0, right: 0, bottom: 0, left: 0 };
	color = d3
		.scaleThreshold()
		.domain([
			10000,
			100000,
			500000,
			1000000,
			5000000,
			10000000,
			50000000,
			100000000,
			500000000,
			1500000000
		])
		.range(<any>[
			'rgb(247,251,255)',
			'rgb(222,235,247)',
			'rgb(198,219,239)',
			'rgb(158,202,225)',
			'rgb(107,174,214)',
			'rgb(66,146,198)',
			'rgb(33,113,181)',
			'rgb(8,81,156)',
			'rgb(8,48,107)',
			'rgb(3,19,43)'
		]);

	@ViewChild('chart')
	chart: ElementRef;

	ngOnInit() {
		const populationById = {};
		const data = countries;
		const population = [
			{ id: 'CHN', name: 'China', population: '1330141295' },
			{ id: 'IND', name: 'India', population: '1173108018' },
			{ id: 'USA', name: 'United States', population: '310232863' },
			{ id: 'IDN', name: 'Indonesia', population: '242968342' },
			{ id: 'BRA', name: 'Brazil', population: '201103330' },
			{ id: 'PAK', name: 'Pakistan', population: '177276594' },
			{ id: 'BGD', name: 'Bangladesh', population: '158065841' },
			{ id: 'NGA', name: 'Nigeria', population: '152217341' },
			{ id: 'RUS', name: 'Russia', population: '139390205' },
			{ id: 'JPN', name: 'Japan', population: '126804433' },
			{ id: 'MEX', name: 'Mexico', population: '112468855' },
			{ id: 'PHL', name: 'Philippines', population: '99900177' },
			{ id: 'VNM', name: 'Vietnam', population: '89571130' },
			{ id: 'ETH', name: 'Ethiopia', population: '88013491' },
			{ id: 'DEU', name: 'Germany', population: '82282988' },
			{ id: 'EGY', name: 'Egypt', population: '80471869' },
			{ id: 'TUR', name: 'Turkey', population: '77804122' },
			{
				id: 'COD',
				name: 'Congo, Democratic Republic of the',
				population: '70916439'
			},
			{ id: 'IRN', name: 'Iran', population: '67037517' },
			{ id: 'THA', name: 'Thailand', population: '66404688' },
			{ id: 'FRA', name: 'France', population: '64057792' },
			{ id: 'GBR', name: 'United Kingdom', population: '61284806' },
			{ id: 'ITA', name: 'Italy', population: '58090681' },
			{ id: 'MMR', name: 'Burma', population: '53414374' },
			{ id: 'ZAF', name: 'South Africa', population: '49109107' },
			{ id: 'KOR', name: 'Korea, South', population: '48636068' },
			{ id: 'UKR', name: 'Ukraine', population: '45415596' },
			{ id: 'COL', name: 'Colombia', population: '44205293' },
			{ id: 'SDN', name: 'Sudan', population: '41980182' },
			{ id: 'TZA', name: 'Tanzania', population: '41892895' },
			{ id: 'ARG', name: 'Argentina', population: '41343201' },
			{ id: 'ESP', name: 'Spain', population: '40548753' },
			{ id: 'KEN', name: 'Kenya', population: '40046566' },
			{ id: 'POL', name: 'Poland', population: '38463689' },
			{ id: 'DZA', name: 'Algeria', population: '34586184' },
			{ id: 'CAN', name: 'Canada', population: '33759742' },
			{ id: 'UGA', name: 'Uganda', population: '33398682' },
			{ id: 'MAR', name: 'Morocco', population: '31627428' },
			{ id: 'PER', name: 'Peru', population: '29907003' },
			{ id: 'IRQ', name: 'Iraq', population: '29671605' },
			{ id: 'SAU', name: 'Saudi Arabia', population: '29207277' },
			{ id: 'AFG', name: 'Afghanistan', population: '29121286' },
			{ id: 'NPL', name: 'Nepal', population: '28951852' },
			{ id: 'UZB', name: 'Uzbekistan', population: '27865738' },
			{ id: 'VEN', name: 'Venezuela', population: '27223228' },
			{ id: 'MYS', name: 'Malaysia', population: '26160256' },
			{ id: 'GHA', name: 'Ghana', population: '24339838' },
			{ id: 'YEM', name: 'Yemen', population: '23495361' },
			{ id: 'TWN', name: 'Taiwan', population: '23024956' },
			{ id: 'PRK', name: 'Korea, North', population: '22757275' },
			{ id: 'SYR', name: 'Syria', population: '22198110' },
			{ id: 'ROU', name: 'Romania', population: '22181287' }
		];
		population.forEach((d: any) => {
			populationById[d.id] = +d.population;
		});
		data.features.forEach((d: any) => {
			d.population = populationById[d.id];
		});

		const format = d3.format(',');
		const tip = d3Tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(
				d =>
					`<strong>Country: </strong><span class='details'>${
						d.properties.name
					}<br></span><strong>Population: </strong><span class='details'>${format(
						d.population
					)}</span>`
			);

		const width = 960 - this.margin.left - this.margin.right;
		const height = 960 - this.margin.top - this.margin.bottom;
		const projection = <any>geoRobinson
			.geoRobinson()
			.scale(148)
			.rotate([352, 0, 0])
			.translate([width / 2, height / 2]);

		/* var projection = <any>geoRobinson.geoCylindricalStereographic()
            .scale(153)
            .translate([width / 2, height / 2])
            .precision(0.1);*/

		/*const projection = <any>geoRobinson.geoHammerRetroazimuthal()
            .parallel(52)
            .clipAngle(180 - 1e-3)
            .scale(130)
            .translate([width / 2, height / 2])
            .precision(.1);*/
		const path = d3.geoPath().projection(projection);

		const graticule = d3.geoGraticule();

		const svg = d3
			.select('.world-map-chart')
			.append('svg')
			.attr('width', width)
			.attr('height', height);

		const defs = svg.append('defs');

		defs.append('path')
			.datum({ type: 'Sphere' })
			.attr('id', 'sphere')
			.attr('d', path);

		defs.append('clipPath')
			.attr('id', 'clip')
			.append('use')
			.attr('xlink:href', '#sphere');

		svg.append('use')
			.attr('class', 'stroke')
			.attr('xlink:href', '#sphere');

		svg.append('use')
			.attr('class', 'fill')
			.attr('xlink:href', '#sphere');

		svg.append('path')
			.datum(graticule)
			.attr('class', 'graticule')
			.attr('clip-path', 'url(#clip)')
			.attr('d', path);

		svg.call(tip);
		svg.append('g')
			.attr('class', 'countries')
			.attr('clip-path', 'url(#clip)')
			.selectAll('path')
			.data<any>(data.features)
			.enter()
			.append('path')
			.attr('d', path)
			.style('fill', (d: any) => this.color(populationById[d.id]))
			.style('stroke', 'white')
			.style('opacity', 0.8)
			.style('stroke-width', 0.3)
			.on('mouseover', function(d) {
				tip.show(d, this);
				d3.select(this)
					.style('opacity', 1)
					.style('stroke-width', 3);
			})
			.on('mouseout', function(d) {
				tip.hide(d, this);
				d3.select(this)
					.style('opacity', 0.8)
					.style('stroke-width', 0.3);
			});

		svg.append('path')
			.datum(topojson.mesh(data.features, (a, b) => a.id !== b.id))
			.attr('class', 'names')
			.attr('clip-path', 'url(#clip)')
			.attr('d', path);
	}

	getSettingsValue(settings: Settings<CustomizeOption>): Settings<any> {
		return Object.keys(settings).reduce(
			(acc, v) => {
				acc[v] = settings[v].value;
				return acc;
			},
			{} as Settings<any>
		);
	}

	ngOnChanges() {}
}
