import {
	Component,
	Input,
	OnChanges,
	ElementRef,
	ViewChild
} from '@angular/core';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import * as geo from 'd3-geo-projection';
import * as topojson from 'topojson';
import { CustomizeOption } from '@app/models/chart.model';
import { countries } from '@app/shared/components/charts/world-map-chart/world-countries';
interface Settings<T> {
	height: T;
	width: T;
	rotate: T;
	scale: T;
	showRaticule: T;
	chooseProjection: T;
	chooseRegion: T;
}

@Component({
	selector: 'app-world-map-chart',
	templateUrl: './world-map-chart.component.html'
})
export class WorldMapChartComponent implements OnChanges {
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

	ngOnChanges() {
		d3.select('svg').remove();
		d3.select('.d3-tip').remove();
		const populationById = {};
		const data = countries;
		this.data.forEach((d: any) => {
			populationById[d.id] = +d.value;
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
		const {
			width,
			height,
			rotate,
			scale,
			showRaticule,
			chooseProjection,
			chooseRegion
		} = this.getSettingsValue(this.settings);

		let projection;
		switch (chooseProjection) {
			case 'robinson':
				projection = geo.geoRobinson();
				break;
			case 'hammerRetroazimuthal':
				projection = geo
					.geoHammerRetroazimuthal()
					.parallel(52)
					.clipAngle(180 - 1e-3);
				break;
			case 'mercator':
				projection = d3.geoMercator();
				break;
			case 'azimuthalEqualArea':
				projection = d3.geoAzimuthalEqualArea();
				break;
			case 'azimuthalEquidistant':
				projection = d3.geoAzimuthalEquidistant();
				break;
			case 'gnomonic':
				projection = d3.geoGnomonic();
				break;
			case 'orthographic':
				projection = d3.geoOrthographic();
				break;
			case 'stereographic':
				projection = d3.geoStereographic();
				break;
			case 'albers':
				projection = d3.geoAlbers();
				break;
			case 'conicConformal':
				projection = d3.geoConicConformal();
				break;
			case 'conicEqualArea':
				projection = d3.geoConicEqualArea();
				break;
			case 'equirectangular':
				projection = d3.geoEquirectangular();
				break;
			case 'conicEquidistant':
				projection = d3.geoConicEquidistant();
				break;
			case 'transverseMercator':
				projection = d3.geoTransverseMercator();
				break;
			case 'sinusoidalRaw':
				projection = geo.geoInterrupt(geo.geoSinusoidalRaw, [
					[
						// northern hemisphere
						[[-180, 0], [-160, 90], [-140, 0]],
						[[-140, 0], [-120, 90], [-100, 0]],
						[[-100, 0], [-80, 90], [-60, 0]],
						[[-60, 0], [-40, 90], [-20, 0]],
						[[-20, 0], [0, 90], [20, 0]],
						[[20, 0], [40, 90], [60, 0]],
						[[60, 0], [80, 90], [100, 0]],
						[[100, 0], [120, 90], [140, 0]],
						[[140, 0], [160, 90], [180, 0]]
					],
					[
						// southern hemisphere
						[[-180, 0], [-180, -90], [-160, 0]],
						[[-160, 0], [-140, -90], [-120, 0]],
						[[-120, 0], [-100, -90], [-80, 0]],
						[[-80, 0], [-60, -90], [-40, 0]],
						[[-40, 0], [-20, -90], [0, 0]],
						[[0, 0], [20, -90], [40, 0]],
						[[40, 0], [60, -90], [80, 0]],
						[[80, 0], [100, -90], [120, 0]],
						[[120, 0], [140, -90], [160, 0]],
						[[160, 0], [180, -90], [180, 0]]
					]
				]);
				break;
			case 'berghausStar':
				projection = geo
					.geoBerghaus()
					.rotate([20, -90])
					.clipAngle(180 - 1e-3);
				break;
			default:
				break;
		}
		projection
			.rotate([rotate, 0, 0])
			.scale(scale)
			.translate([width / 2, height / 2])
			.precision(0.1);

		switch (chooseRegion) {
			case 'world':
				break;
			case 'europe':
				projection = d3
					.geoMercator()
					.center([13, 52])
					.translate([width / 2, height / 2])
					.scale(width / 1.5);
				break;
			case 'asia':
				projection = geo
					.geoPatterson()
					.center([58, 54])
					.scale(520)
					.translate([0, 0])
					.precision(0.1);
				break;
			case 'africa':
				projection = geo.geoChamberlinAfrica();
				break;
			case 'northAmerica':
				projection = geo.geoModifiedStereographicGs50();
				break;
			case 'usa':
				projection = d3
					.geoAlbersUsa()
					.translate([width / 2, height / 2])
					.scale(1000);
				break;
			default:
				break;
		}

		const path = d3.geoPath().projection(projection);

		const graticule = d3.geoGraticule();

		const svg = d3
			.selectAll('.world-map-chart')
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
		if (showRaticule) {
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
		}
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
}
