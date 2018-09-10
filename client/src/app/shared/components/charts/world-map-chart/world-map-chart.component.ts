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
		.scaleQuantile<any>()
		.range([
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
		const format = d3.format(',');
		// Set tooltips
		const tip = d3Tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(
				d =>
					`<strong>Country: </strong><span class='details'>${
						d.properties.name
					}<br></span><strong>Value: </strong><span class='details'>${format(
						d.value
					)}</span>`
			);
		this.setTip(tip);

		// configuration
		const colorVariable = 'value';
		const geoIDVariable = 'id';

		const colorVariableValueByID = {};
		const geography = countries;
		const {
			width,
			height,
			rotate,
			scale,
			showRaticule,
			chooseProjection,
			chooseRegion
		} = this.getSettingsValue(this.settings);

		this.data.forEach(d => {
			colorVariableValueByID[d[geoIDVariable]] = d[colorVariable];
		});
		geography.features.forEach(d => {
			d[colorVariable] = colorVariableValueByID[d.id];
		});
		const valuesSet = new Set();
		this.data.forEach(d => {
			valuesSet.add(d.value);
		});

		// calculate jenks natural breaks
		let numberOfClasses;
		valuesSet.size > this.color.range().length - 1
			? (numberOfClasses = this.color.range().length - 1)
			: (numberOfClasses = valuesSet.size);

		const jenksNaturalBreaks = this.jenks(
			this.data.map(d => d[colorVariable]),
			numberOfClasses
		);
		this.color.domain(jenksNaturalBreaks);

		// projection settings
		let projection;
		projection = this.getProjection(chooseProjection, projection);
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
			.data<any>(geography.features)
			.enter()
			.append('path')
			.attr('d', path)
			.style('fill', d => {
				if (typeof colorVariableValueByID[d.id] !== 'undefined') {
					return this.color(colorVariableValueByID[d.id]);
				}
				return 'white';
			})
			.style('stroke', d => {
				if (d[colorVariable] !== undefined) {
					return '#777';
				}
				return 'lightgray';
			})
			.style('opacity', 1)
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
					.style('opacity', 1)
					.style('stroke-width', 0.3);
			});

		svg.append('path')
			.datum(topojson.mesh(geography.features, (a, b) => a.id !== b.id))
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

	getProjection(chooseProjection, projection) {
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
		return projection;
	}

	setTip(tip) {
		tip.direction(function(d) {
			if (d.properties.name === 'Antarctica') {
				return 'n';
			}
			// Americas
			if (d.properties.name === 'Greenland') {
				return 's';
			}
			if (d.properties.name === 'Canada') {
				return 'e';
			}
			if (d.properties.name === 'USA') {
				return 'e';
			}
			if (d.properties.name === 'Mexico') {
				return 'e';
			}
			// Europe
			if (d.properties.name === 'Iceland') {
				return 's';
			}
			if (d.properties.name === 'Norway') {
				return 's';
			}
			if (d.properties.name === 'Sweden') {
				return 's';
			}
			if (d.properties.name === 'Finland') {
				return 's';
			}
			if (d.properties.name === 'Russia') {
				return 'w';
			}
			// Asia
			if (d.properties.name === 'China') {
				return 'w';
			}
			if (d.properties.name === 'Japan') {
				return 's';
			}
			// Oceania
			if (d.properties.name === 'Indonesia') {
				return 'w';
			}
			if (d.properties.name === 'Papua New Guinea') {
				return 'w';
			}
			if (d.properties.name === 'Australia') {
				return 'w';
			}
			if (d.properties.name === 'New Zealand') {
				return 'w';
			}
			// otherwise if not specified
			return 'n';
		});

		tip.offset(function(d) {
			if (d.properties.name === 'Antarctica') {
				return [0, 0];
			}
			// Americas
			if (d.properties.name === 'Greenland') {
				return [10, -10];
			}
			if (d.properties.name === 'Canada') {
				return [24, -28];
			}
			if (d.properties.name === 'USA') {
				return [-5, 8];
			}
			if (d.properties.name === 'Mexico') {
				return [12, 10];
			}
			if (d.properties.name === 'Chile') {
				return [0, -15];
			}
			// Europe
			if (d.properties.name === 'Iceland') {
				return [15, 0];
			}
			if (d.properties.name === 'Norway') {
				return [10, -28];
			}
			if (d.properties.name === 'Sweden') {
				return [10, -8];
			}
			if (d.properties.name === 'Finland') {
				return [10, 0];
			}
			if (d.properties.name === 'France') {
				return [-9, 66];
			}
			if (d.properties.name === 'Italy') {
				return [-8, -6];
			}
			if (d.properties.name === 'Russia') {
				return [5, 385];
			}
			// Africa
			if (d.properties.name === 'Madagascar') {
				return [-10, 10];
			}
			// Asia
			if (d.properties.name === 'China') {
				return [-16, -8];
			}
			if (d.properties.name === 'Mongolia') {
				return [-5, 0];
			}
			if (d.properties.name === 'Pakistan') {
				return [-10, 13];
			}
			if (d.properties.name === 'India') {
				return [-11, -18];
			}
			if (d.properties.name === 'Nepal') {
				return [-8, 1];
			}
			if (d.properties.name === 'Myanmar') {
				return [-12, 0];
			}
			if (d.properties.name === 'Laos') {
				return [-12, -8];
			}
			if (d.properties.name === 'Vietnam') {
				return [-12, -4];
			}
			if (d.properties.name === 'Japan') {
				return [5, 5];
			}
			// Oceania
			if (d.properties.name === 'Indonesia') {
				return [0, -5];
			}
			if (d.properties.name === 'Papua New Guinea') {
				return [-5, -10];
			}
			if (d.properties.name === 'Australia') {
				return [-15, 0];
			}
			if (d.properties.name === 'New Zealand') {
				return [-15, 0];
			}
			// otherwise if not specified
			return [-10, 0];
		});
	}
	jenks(d, n_cl) {
		// Compute the matrices required for Jenks breaks. These matrices
		// can be used for any classing of data with `classes <= n_classes`
		function getMatrices(data, n_classes) {
			// in the original implementation, these matrices are referred to
			// as `LC` and `OP`
			//
			// * lower_class_limits (LC): optimal lower class limits
			// * variance_combinations (OP): optimal variance combinations for all classes
			const lower_class_limits = [],
				variance_combinations = [];
			let i,
				j,
				// the variance, as computed at each step in the calculation
				variance = 0;

			// Initialize and fill each matrix with zeroes
			for (i = 0; i < data.length + 1; i++) {
				const tmp1 = [],
					tmp2 = [];
				for (j = 0; j < n_classes + 1; j++) {
					tmp1.push(0);
					tmp2.push(0);
				}
				lower_class_limits.push(tmp1);
				variance_combinations.push(tmp2);
			}

			for (i = 1; i < n_classes + 1; i++) {
				lower_class_limits[1][i] = 1;
				variance_combinations[1][i] = 0;
				// in the original implementation, 9999999 is used but
				// since Javascript has `Infinity`, we use that.
				for (j = 2; j < data.length + 1; j++) {
					variance_combinations[j][i] = Infinity;
				}
			}

			for (let l = 2; l < data.length + 1; l++) {
				// `SZ` originally. this is the sum of the values seen thus
				// far when calculating variance.
				let sum = 0,
					// `ZSQ` originally. the sum of squares of values seen
					// thus far
					sum_squares = 0,
					// `WT` originally. This is the number of
					w = 0,
					// `IV` originally
					i4 = 0;

				// in several instances, you could say `Math.pow(x, 2)`
				// instead of `x * x`, but this is slower in some browsers
				// introduces an unnecessary concept.
				for (let m = 1; m < l + 1; m++) {
					// `III` originally
					const lower_class_limit = l - m + 1,
						val = data[lower_class_limit - 1];

					// here we're estimating variance for each potential classing
					// of the data, for each potential number of classes. `w`
					// is the number of data points considered so far.
					w++;

					// increase the current sum and sum-of-squares
					sum += val;
					sum_squares += val * val;

					// the variance at this point in the sequence is the difference
					// between the sum of squares and the total x 2, over the number
					// of samples.
					variance = sum_squares - (sum * sum) / w;

					i4 = lower_class_limit - 1;

					if (i4 !== 0) {
						for (j = 2; j < n_classes + 1; j++) {
							// if adding this element to an existing class
							// will increase its variance beyond the limit, break
							// the class at this point, setting the lower_class_limit
							// at this point.
							if (
								variance_combinations[l][j] >=
								variance + variance_combinations[i4][j - 1]
							) {
								lower_class_limits[l][j] = lower_class_limit;
								variance_combinations[l][j] =
									variance + variance_combinations[i4][j - 1];
							}
						}
					}
				}

				lower_class_limits[l][1] = 1;
				variance_combinations[l][1] = variance;
			}

			// return the two matrices. for just providing breaks, only
			// `lower_class_limits` is needed, but variances can be useful to
			// evaluage goodness of fit.
			return {
				lower_class_limits: lower_class_limits,
				variance_combinations: variance_combinations
			};
		}

		// the second part of the jenks recipe: take the calculated matrices
		// and derive an array of n breaks.
		function breaks(data, lw_class_limits, n_classes) {
			let k = data.length - 1,
				countNum = n_classes;
			const kclass = [];
			// the calculation of classes will never include the upper and
			// lower bounds, so we need to explicitly set them
			kclass[n_classes] = data[data.length - 1];
			kclass[0] = data[0];

			// the lower_class_limits matrix is used as indexes into itself
			// here: the `k` variable is reused in each iteration.
			while (countNum > 1) {
				kclass[countNum - 1] = data[lw_class_limits[k][countNum] - 2];
				k = lw_class_limits[k][countNum] - 1;
				countNum--;
			}

			return kclass;
		}

		if (n_cl > d.length) {
			return null;
		}

		// sort data in numerical order, since this is expected
		// by the matrices function
		d = d.slice().sort(function(a, b) {
			return a - b;
		});

		// get our basic matrices
		const matrices = getMatrices(d, n_cl),
			// we only need lower class limits here
			lower_class_lim = matrices.lower_class_limits;

		// extract n_classes out of the computed matrices
		return breaks(d, lower_class_lim, n_cl);
	}
}
