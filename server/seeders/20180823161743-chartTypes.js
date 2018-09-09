module.exports = {
	up: queryInterface => queryInterface.bulkInsert(
		'chartTypes',
		[
			{
				id: 1,
				type: 'Other',
				name: 'Bar chart',
				sysName: 'barChart',
				description:
						'A bar chart or bar graph is a chart or graph that presents grouped data with rectangular bars with heights proportional to the values that they represent.',
				dimensionSettings: JSON.stringify([
					{
						multiple: false,
						description:
								'For each unique value found in the column, a group (a new bar chart) is created.',
						required: true,
						variable: 'X Axis',
						sysName: 'xaxis',
						type: ['string', 'number'],
						id: 1
					},
					{
						multiple: false,
						description:
								'For each unique value found in the column, a bar is created.',
						required: false,
						variable: 'Group',
						sysName: 'group',
						type: ['string', 'number'],
						id: 2
					},
					{
						multiple: false,
						description:
								'Accepts only columns containing numbers. The value will define the bar height.',
						required: false,
						variable: 'Size',
						sysName: 'size',
						type: ['number'],
						id: 3
					},
					{
						multiple: false,
						description:
								'Can accept both number and strings. A color will be defined for each unique value found in the list.',
						required: false,
						variable: 'Color',
						sysName: 'color',
						type: ['string', 'number'],
						id: 4
					}
				]),
				customizeSettings: JSON.stringify([
					{
						id: 1,
						value: 800,
						description: 'Artboard width in pixels.',
						option: 'Width',
						sysName: 'width'
					},
					{
						id: 2,
						value: 600,
						description: 'Artboard height in pixels.',
						option: 'Height',
						sysName: 'height'
					},
					{
						id: 3,
						value: 40,
						description:
								'Margin for left side of a bar chart, in pixel.',
						option: 'Left Margin',
						sysName: 'leftMargin'
					},
					{
						id: 4,
						value: 0,
						description: 'Distance among bar charts, in pixel.',
						option: 'Vertical Padding',
						sysName: 'verticalPadding'
					},
					{
						id: 5,
						value: 0.1,
						description:
								'Distance between bars, in percentage of the size of the bar (0 = 0%, 1 = 100%).',
						option: 'Horizontal Padding',
						sysName: 'horizontalPadding'
					},
					{
						id: 6,
						value: false,
						description:
								'If set, every barchart element will have the same scale.',
						option: 'Use Same Scale',
						sysName: 'useSameScale'
					},
					{
						id: 7,
						value: [],
						description:
								'List of uniques values in the dimension mapped as “color”. If set to ordinal, you can set a color for each value. If set to linear, the app will try to find the minimum and maximum value contained in the dimension, and then creating a gradient among those two values.',
						option: 'Colour Scale',
						sysName: 'colourScale'
					}
				]),
				createdAt: '2018-08-16T21:00:00.000Z',
				updatedAt: '2018-08-16T21:00:00.000Z'
			},
			{
				id: 2,
				type: 'Other',
				name: 'Pie Chart',
				sysName: 'pieChart',
				description:
						'A pie chart (or a circle chart) is a circular statistical graphic which is divided into slices to illustrate numerical proportion.',
				dimensionSettings: JSON.stringify([
					{
						multiple: false,
						description:
								'The values in the dimension will be used as labels.',
						required: false,
						variable: 'Label',
						sysName: 'label',
						type: ['string', 'number', 'date'],
						id: 5
					},
					{
						multiple: true,
						description:
								'The field accept multiple dimensions. Each dimension added to this field will generate an arc for each pie chart.',
						required: true,
						variable: 'Arcs',
						sysName: 'arcs',
						type: ['number'],
						id: 6
					}
				]),
				customizeSettings: JSON.stringify([
					{
						value: 800,
						description: 'width in pixels',
						option: 'Width',
						id: 8,
						sysName: 'width'
					},
					{
						value: 25,
						description:
								'Pie chart will be disposed on a grid. This option allows to define margin of each pie',
						option: 'Margin',
						id: 9,
						sysName: 'margin'
					},
					{
						value: 100,
						description: 'Radius of each pie.',
						option: 'Radius',
						id: 10,
						sysName: 'radius'
					},
					{
						value: false,
						description:
								'If selected, pie charts will be drawn ad donut chart. The size is defined by the Thickness option (see below).',
						option: 'Donut chart',
						id: 11,
						sysName: 'isDonut'
					},
					{
						value: false,
						description:
								'If selected, the absolute value of each value will be displayed with a label.',
						option: 'Show Values',
						id: 13,
						sysName: 'showValues'
					},
					{
						value: 'name(asc)',
						description: 'Order of the pie chart.',
						option: 'Sort charts by',
						id: 14,
						sysName: 'sortChartsBy'
					},
					{
						value: 'name',
						description:
								'Order of the arcs inside each pie chart. Can be ‘automatic’ (same order in each pie chart), ‘size’ (from biggest to smallest in each pie chart) or ‘name’ (alphabetical order).',
						option: 'Sort arcs by',
						id: 15,
						sysName: 'sortArcsBy'
					},
					{
						value: [],
						description:
								'List of dimensions headers dragged as ‘Arcs’. If set to ordinal, you can set a color for each value. If set to linear, the app will try to find the minimum and maximum value contained in the dimension, and then creating a gradient among those two values.',
						option: 'Colour scale',
						id: 16,
						sysName: 'colourScale'
					}
				]),
				createdAt: '2018-08-16T21:00:00.000Z',
				updatedAt: '2018-08-16T21:00:00.000Z'
			},
			{
				id: 3,
				type: 'Multi categorical',
				name: 'Alluvial Diagram',
				sysName: 'alluvialDiagram',
				description:
						'Alluvial diagrams allow to represent flows and to see correlations between categorical dimensions, visually linking to the number of elements sharing the same categories. It is useful to see the evolution of cluster (such as the number of people belonging',
				dimensionSettings: JSON.stringify([
					{
						multiple: true,
						description:
								'It accept multiple values, at least two column must be selected. Each dragged column will define a step (a vertical group of nodes). The dragging order is also the visualization order. For each unique value found in each column a node will be created.',
						required: true,
						variable: 'Steps',
						sysName: 'steps',
						type: ['string', 'number', 'date'],
						id: 7
					},
					{
						multiple: false,
						description:
								'Defines the weight of each line of the dataset. If not defined, all the lines will have the same weight.',
						required: false,
						variable: 'Size',
						sysName: 'size',
						type: ['number'],
						id: 8
					}
				]),
				customizeSettings: JSON.stringify([
					{
						value: 847,
						description: 'Artboard width in pixels.',
						option: 'Width',
						id: 17,
						sysName: 'width'
					},
					{
						value: 500,
						description: 'Artboard height in pixels.',
						option: 'Height',
						id: 18,
						sysName: 'height'
					},
					{
						value: 5,
						description:
								'Width of black bars representing nodes, in pixels.',
						option: 'Nodes Width',
						id: 19,
						sysName: 'nodesWidth'
					},
					{
						value: 0.4,
						description: 'Opacity of nodes.',
						option: 'Links Opacity',
						id: 20,
						sysName: 'linksOpacity'
					},
					{
						value: '',
						options: ['size', 'name', 'automatic'],
						description:
								'Sorting of nodes inside each step. It can be ‘automatic’ (trying to reduce the number of overlappings among flows), ‘size’ (nodes ordered from the biggest to the smallest), and ‘alphabetical’.',
						option: 'Sort By',
						id: 21,
						sysName: 'sortBy'
					},
					{
						value: [],
						description:
								'The color of flows. The color is defined by the source node. For each unique value found in the dimension dragged as ‘steps’ a color is defined.',
						option: 'Colour scale',
						id: 22,
						sysName: 'colourScale'
					}
				]),
				createdAt: '2018-08-16T21:00:00.000Z',
				updatedAt: '2018-08-16T21:00:00.000Z'
			},
			{
				id: 4,
				type: 'Time chunks',
				name: 'Gantt Chart',
				sysName: 'ganttChart',
				description:
						'A Gantt chart is a type of bar chart, developed by Henry Gantt in the 1910s, that illustrates a project schedule. Gantt charts illustrate the start and finish dates of the terminal elements and summary elements of a project.',
				dimensionSettings: JSON.stringify([
					{
						multiple: false,
						description:
								'For each unique value found in the column, a group (an horizontal series of bars) is created.',
						required: true,
						variable: 'Group',
						sysName: 'group',
						type: ['string', 'number', 'date'],
						id: 9
					},
					{
						multiple: false,
						description:
								'Starting point of the bar. RAWGraphs requires dates in a specific format.',
						required: true,
						variable: 'Start',
						sysName: 'start',
						type: ['date'],
						id: 10
					},
					{
						multiple: false,
						description:
								'Ending point of the bar. RAWGraphs requires dates in a specific format.',
						required: true,
						variable: 'End',
						sysName: 'end',
						type: ['date'],
						id: 11
					},
					{
						multiple: false,
						description:
								'Can accept both number and strings. A color will be defined for each unique value found in the list.',
						required: false,
						variable: 'Color',
						sysName: 'color',
						type: ['string'],
						id: 12
					}
				]),
				customizeSettings: JSON.stringify([
					{
						value: 900,
						description: 'Artboard width in pixels',
						option: 'Width',
						id: 23,
						sysName: 'width'
					},
					{
						value: 600,
						description: 'Artboard height in pixels',
						option: 'Height',
						id: 24,
						sysName: 'height'
					},
					{
						value: 80,
						description: 'Artboard height in pixels',
						option: 'Left Margin',
						id: 25,
						sysName: 'leftMargin'
					},
					{
						value: 80,
						description: 'Artboard height in pixels',
						option: 'Align Labels To Bar',
						id: 26,
						sysName: 'alignLabesToBar'
					},
					{
						value: '',
						options: [
							'Start date (ascending)',
							'Start date (descending)',
							'name'
						],
						description:
								'Order of the bars series. Could be alphabetical or by date (both ascending and descending)',
						option: 'Sort By',
						id: 27,
						sysName: 'sortBy'
					},
					{
						value: [],
						description:
								'If set to ordinal, you can set a color for each value; it lists all the unique values in the dimension mapped as “color”. If set to linear, the app will try to find the minimum and maximum value contained in the dimension, and then it creates a gradient among those two values',
						option: 'Colour scale',
						id: 28,
						sysName: 'colourScale'
					}
				]),
				createdAt: '2018-08-16T21:00:00.000Z',
				updatedAt: '2018-08-16T21:00:00.000Z'
			},
			{
				id: 5,
				type: 'Other',
				name: 'Scatter Plot',
				sysName: 'scatterplot',
				description:
						'A scatter plot, scatterplot, or scattergraph is a type of mathematical diagram using Cartesian coordinates to display values for two variables for a set of data.',
				dimensionSettings: JSON.stringify([
					{
						multiple: false,
						description:
								'The horizontal position of the circles.',
						required: true,
						variable: 'X Axis',
						sysName: 'xaxis',
						type: ['number'],
						id: 13
					},
					{
						multiple: false,
						description:
								'The vertical position of the circles.',
						required: true,
						variable: 'Y Axis',
						sysName: 'yaxis',
						type: ['number'],
						id: 14
					},
					{
						multiple: false,
						description:
								'Area of the circles. If not provided, size will be proportional to the count of rows.',
						required: false,
						variable: 'Size',
						sysName: 'size',
						type: ['number'],
						id: 15
					},
					{
						multiple: false,
						description:
								'For each unique value found in the dimension, a color is created.',
						required: false,
						variable: 'Color',
						sysName: 'color',
						type: ['string', 'number'],
						id: 16
					}
				]),
				customizeSettings: JSON.stringify([
					{
						id: 29,
						value: 800,
						description: 'Artboard width in pixels.',
						option: 'Width',
						sysName: 'width'
					},
					{
						id: 30,
						value: 600,
						description: 'Artboard height in pixels.',
						option: 'Height',
						sysName: 'height'
					},
					{
						id: 31,
						value: 20,
						description:
								'The radius for the circle with the highest value in the dimension mapped as Size.',
						option: 'Max Radius',
						sysName: 'maxRadius'
					},
					{
						id: 32,
						value: false,
						description:
								'If selected, the scatterplot origin will be set at the zero value for both the axes. If not selected, origin will be set to the minimum value for the two axes.',
						option: 'Set Origin',
						sysName: 'setOrigin'
					},
					{
						id: 33,
						value: [],
						description:
								'List of uniques values in the dimension mapped as “color”. If set to ordinal, you can set a color for each value. If set to linear, the app will try to find the minimum and maximum value contained in the dimension, and then creating a gradient among those two values.',
						option: 'Colour Scale',
						sysName: 'colourScale'
					}
				]),
				createdAt: '2018-08-16T21:00:00.000Z',
				updatedAt: '2018-08-16T21:00:00.000Z'
			},
			{
				id: 6,
				type: 'Map',
				name: 'World map',
				sysName: 'worldMap',
				description:
						'A visualization of world map with ability to map each country with numerical value',
				dimensionSettings: JSON.stringify([
					{
						multiple: false,
						description:
								'List of countries',
						required: true,
						variable: 'Countries',
						sysName: 'countries',
						type: ['string'],
						id: 17
					},
					{
						multiple: false,
						description:
								'Values for each country',
						required: false,
						variable: 'Values',
						sysName: 'values',
						type: ['number'],
						id: 18
					}
				]),
				customizeSettings: JSON.stringify([
					{
						id: 34,
						value: 800,
						description: 'Artboard width in pixels.',
						option: 'Width',
						sysName: 'width'
					},
					{
						id: 35,
						value: 600,
						description: 'Artboard height in pixels.',
						option: 'Height',
						sysName: 'height'
					},
					{
						id: 36,
						value: false,
						description:
								'Show raticule',
						option: 'Show raticule',
						sysName: 'showRaticule'
					},
					{
						value: 'robinson',
						description: 'Choose projection of the map',
						option: 'Choose projection',
						id: 37,
						sysName: 'chooseProjection'
					},
					{
						value: 'world',
						description: 'Choose region of the map',
						option: 'Choose region',
						id: 38,
						sysName: 'chooseRegion'
					},
					{
						id: 39,
						value: [],
						description:
								'List of uniques values in the dimension mapped as “color”. If set to ordinal, you can set a color for each value. If set to linear, the app will try to find the minimum and maximum value contained in the dimension, and then creating a gradient among those two values.',
						option: 'Colour Scale',
						sysName: 'colourScale'
					}
				]),
				createdAt: '2018-08-16T21:00:00.000Z',
				updatedAt: '2018-08-16T21:00:00.000Z'
			}
		],
		{}
	),

	down: queryInterface => queryInterface.bulkDelete('chartTypes', null)
};
