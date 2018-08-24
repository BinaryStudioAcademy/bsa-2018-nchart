import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { normalize } from 'normalizr';
import { ChartsActionConstants } from '@app/store/actions/charts/charts.action-types';
import * as chartActions from '@app/store/actions/charts/charts.actions';
import { StoreService } from '@app/services/store.service';
import {
	getActiveChartId,
	getChart,
	getFirstChart
} from '@app/store/selectors/charts.selectors';
import {
	CreateChart,
	CreateChartComplete,
	SelectChart,
	SelectChartComplete
} from '@app/store/actions/charts/charts.actions';
import { chartScheme } from '@app/schemes/chart.schema';
import { ChartService } from '@app/services/chart.service';
import { Chart } from '@app/models/chart.model';
import { getActiveProject } from '@app/store/selectors/projects.selectors';
import { withLatestFrom } from 'rxjs/internal/operators';

@Injectable()
export class ChartsEffects {
	api = {
		loadCharts: (): Observable<any> => {
			return of({
				payload: [
					{
						id: 2,
						type: 'Other',
						name: 'Pie Chart',
						sysName: 'pieChart',
						description: `A pie chart (or a circle chart) is a
						 circular statistical graphic which is divided into slices to illustrate numerical proportion.`,
						dimensionSettings: [
							{
								multiple: false,
								description:
									'The values in the dimension will be used as labels.',
								required: false,
								variable: 'Label',
								type: ['string', 'number', 'date'],
								id: 5
							},
							{
								multiple: true,
								description:
									'The field accept multiple dimensions. Each dimension added to this field will generate an arc for each pie chart.',
								required: true,
								variable: 'Arcs',
								type: ['number'],
								id: 6
							}
						],
						customizeSettings: [
							{
								value: 800,
								description: 'width in pixels',
								option: 'Width',
								id: 8
							},
							{
								value: 4,
								description: `Pie chart will be disposed on a grid.
								 This option allows to define how many pie charts must be drawn for each line.
								  The number of lines is calculated according to this option.`,
								option: 'Columns',
								id: 9
							},
							{
								value: 10,
								description:
									'The vertical and horizontal padding between pie charts, in pixels.',
								option: 'Padding',
								id: 10
							},
							{
								value: false,
								description:
									'If selected, pie charts will be drawn ad donut chart. The size is defined by the Thickness option (see below).',
								option: 'Donut chart',
								id: 11
							},
							{
								value: 10,
								description:
									'If Donut chart option is selects, this value will be used to defines its thickness.',
								option: 'Thickness',
								id: 12
							},
							{
								value: false,
								description:
									'If selected, the absolute value of each value will be displayed with a label.',
								option: 'Show Values',
								id: 13
							},
							{
								value: ['size', 'name'],
								description:
									'Order of the pie chart. Can be ‘size’ (from the biggest to the smallest), ‘name’ (alphabetical order).',
								option: 'Sort charts by',
								id: 14
							},
							{
								value: ['size', 'name'],
								description: `Order of the arcs inside each pie chart.
								 Can be ‘automatic’ (same order in each pie chart), ‘size’ (from biggest to smallest in each pie chart)
								  or ‘name’ (alphabetical order).`,
								option: 'Sort arcs by',
								id: 15
							},
							{
								value: [],
								description: `List of dimensions headers dragged as ‘Arcs’.
								 If set to ordinal, you can set a color for each value.
								  If set to linear, the app will try to find the minimum and maximum
								   value contained in the dimension, and then creating a gradient among those two values.`,
								option: 'Color scale',
								id: 16
							}
						],
						createdAt: '2018-08-16T21:00:00.000Z',
						updatedAt: '2018-08-16T21:00:00.000Z'
					},
					{
						id: 1,
						type: 'Other',
						name: 'Bar chart',
						sysName: 'barChart',
						description: `A bar chart or bar graph is a chart or graph that presents
						 grouped data with rectangular bars with heights proportional to the values that they represent.`,
						dimensionSettings: [
							{
								multiple: false,
								description:
									'For each unique value found in the column, a group (a new bar chart) is created.',
								required: true,
								variable: 'X Axis',
								type: ['string', 'number'],
								id: 1
							},
							{
								multiple: false,
								description:
									'For each unique value found in the column, a bar is created.',
								required: false,
								variable: 'Group',
								type: ['string', 'number'],
								id: 2
							},
							{
								multiple: false,
								description:
									'Accepts only columns containing numbers. The value will define the bar height.',
								required: false,
								variable: 'Size',
								type: ['number'],
								id: 3
							},
							{
								multiple: false,
								description:
									'Can accept both number and strings. A color will be defined for each unique value found in the list.',
								required: false,
								variable: 'Color',
								type: ['string', 'number'],
								id: 4
							}
						],
						customizeSettings: [
							{
								id: 1,
								value: 800,
								description: 'Artboard width in pixels.',
								option: 'Width'
							},
							{
								id: 2,
								value: 600,
								description: 'Artboard height in pixels.',
								option: 'Height'
							},
							{
								id: 3,
								value: 40,
								description:
									'Margin for left side of a bar chart, in pixel.',
								option: 'Left Margin'
							},
							{
								id: 4,
								value: 0,
								description:
									'Distance among bar charts, in pixel.',
								option: 'Vertical Padding'
							},
							{
								id: 5,
								value: 0.1,
								description:
									'Distance between bars, in percentage of the size of the bar (0 = 0%, 1 = 100%).',
								option: 'Horizontal Padding'
							},
							{
								id: 6,
								value: false,
								description:
									'If set, every barchart element will have the same scale.',
								option: 'Use Same Scale'
							},
							{
								id: 7,
								value: [],
								description: `List of uniques values in the dimension mapped as “color”.
								 If set to ordinal, you can set a color for each value.
								  If set to linear, the app will try to find the minimum
								   and maximum value contained in the dimension, and then creating a gradient among those two values.`,
								option: 'Colour Scale'
							}
						],
						createdAt: '2018-08-16T21:00:00.000Z',
						updatedAt: '2018-08-16T21:00:00.000Z'
					},
					{
						id: 4,
						type: 'Time chunks',
						name: 'Gantt Chart',
						sysName: 'ganttChart',
						description: `A Gantt chart is a type of bar chart, developed by
						 Henry Gantt in the 1910s, that illustrates a project schedule.
						  Gantt charts illustrate the start and finish dates of the terminal elements and summary elements of a project.`,
						dimensionSettings: [
							{
								multiple: false,
								description:
									'For each unique value found in the column, a group (an horizontal series of bars) is created.',
								required: true,
								variable: 'Group',
								type: ['string', 'number', 'date'],
								id: 9
							},
							{
								multiple: false,
								description:
									'Starting point of the bar. RAWGraphs requires dates in a specific format.',
								required: true,
								variable: 'Start date',
								type: ['date'],
								id: 10
							},
							{
								multiple: false,
								description:
									'Ending point of the bar. RAWGraphs requires dates in a specific format.',
								required: true,
								variable: 'End date',
								type: ['date'],
								id: 11
							},
							{
								multiple: false,
								description:
									'Can accept both number and strings. A color will be defined for each unique value found in the list.',
								required: false,
								variable: 'Color',
								type: ['string'],
								id: 12
							}
						],
						customizeSettings: [
							{
								value: 900,
								description: 'Artboard width in pixels',
								option: 'Width',
								id: 23
							},
							{
								value: 600,
								description: 'Artboard height in pixels',
								option: 'Height',
								id: 24
							},
							{
								value: 80,
								description: 'Artboard height in pixels',
								option: 'Left Margin',
								id: 25
							},
							{
								value: 80,
								description: 'Artboard height in pixels',
								option: 'Align Labels To Bar',
								id: 26
							},
							{
								value: [
									'Start date (ascending)',
									'Start date (descending)',
									'name'
								],
								description:
									'Order of the bars series. Could be alphabetical or by date (both ascending and descending)',
								option: 'Sort By',
								id: 27
							},
							{
								value: [],
								description: 'If set to ordinal',
								option: 'Color scale',
								id: 28
							}
						],
						createdAt: '2018-08-16T21:00:00.000Z',
						updatedAt: '2018-08-16T21:00:00.000Z'
					},
					{
						id: 3,
						type: 'Multi categorical',
						name: 'Alluvial Diagram',
						sysName: 'alluvialDiagram',
						description: 'Alluvial diagrams',
						dimensionSettings: [
							{
								multiple: true,
								description: 'It accept multiple',
								required: true,
								variable: 'Steps',
								type: ['string', 'number', 'date'],
								id: 7
							},
							{
								multiple: false,
								description:
									'Defines the weight of each line of the dataset. If not defined, all the lines will have the same weight.',
								required: false,
								variable: 'Size',
								type: ['number'],
								id: 8
							}
						],
						customizeSettings: [
							{
								value: 847,
								description: 'Artboard width in pixels.',
								option: 'Width',
								id: 17
							},
							{
								value: 500,
								description: 'Artboard height in pixels.',
								option: 'Height',
								id: 18
							},
							{
								value: 5,
								description:
									'Width of black bars representing nodes, in pixels.',
								option: 'Nodes Width',
								id: 19
							},
							{
								value: 0.4,
								description: 'Opacity of nodes.',
								option: 'Links Opacity',
								id: 20
							},
							{
								value: ['size', 'name', 'automatic'],
								description: 'Sorting of nodes inside ',
								option: 'Sort By',
								id: 21
							},
							{
								value: [],
								description: 'The color of flows. The color ',
								option: 'Color scale',
								id: 22
							}
						],
						createdAt: '2018-08-16T21:00:00.000Z',
						updatedAt: '2018-08-16T21:00:00.000Z'
					}
				],
				isSuccess: true,
				errors: []
			});
		}
	};

	constructor(
		private action$: Actions,
		private storeService: StoreService,
		private chartService: ChartService
	) {}

	@Effect()
	loadCharts$ = this.action$.pipe(
		ofType(ChartsActionConstants.LOAD_CHARTS),
		switchMap((action: any) =>
			this.api.loadCharts().pipe(
				map(({ payload }) => {
					const { result: all, entities } = normalize(payload, [
						chartScheme
					]);
					return new chartActions.LoadChartsComplete({
						charts: {
							all,
							entities
						}
					});
				}),
				catchError(error => {
					return of(
						new chartActions.LoadChartsFailed({
							action: action,
							msg: 'test',
							error
						})
					);
				})
			)
		)
	);

	@Effect()
	createChart$ = this.action$.pipe(
		ofType(ChartsActionConstants.CREATE_CHART),
		switchMap((action: CreateChart) => {
			return this.storeService.createSubscription(getFirstChart()).pipe(
				switchMap((fchart: Chart) => {
					return this.chartService.createChart({
						chartTypeId: fchart.type,
						datasetId: action.payload.datatsetId,
						customizeSettings: [...fchart.customizeSettings],
						dimensionSettings: this.chartService.transformDimensions(
							fchart.dimensionSettings
						)
					});
				}),
				withLatestFrom(
					this.storeService.createSubscription(getActiveProject())
				),
				map(([c, projectId]) => {
					const { result: chartId, entities } = normalize(
						c,
						chartScheme
					);

					return new CreateChartComplete({
						projectId,
						chart: {
							entities,
							chartId
						}
					});
				})
			);
		})
	);

	@Effect()
	selectChart$ = this.action$.pipe(
		ofType(ChartsActionConstants.SELECT_CHART),
		switchMap((action: SelectChart) => {
			return this.storeService
				.createSubscription(getChart(action.payload.id))
				.pipe(
					withLatestFrom(
						this.storeService.createSubscription(
							getActiveProject()
						),
						this.storeService.createSubscription(getActiveChartId())
					),
					map(([c, projectId, id]) => {
						const currentChart = {
							id: id,
							chartTypeId: c.type,
							customizeSettings: [...c.customizeSettings],
							dimensionSettings: this.chartService.transformDimensions(
								c.dimensionSettings
							)
						};

						const { result: chartId, entities } = normalize(
							currentChart,
							chartScheme
						);

						return new SelectChartComplete({
							projectId,
							chart: {
								entities,
								chartId
							}
						});
					})
				);
		})
	);
}
