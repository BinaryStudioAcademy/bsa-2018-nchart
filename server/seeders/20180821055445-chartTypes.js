module.exports = {
	// up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
	up: queryInterface => queryInterface.bulkInsert(
		'chartTypes',
		[
			// todo: insert is not working, though post of this obj works fine
			{
				id: 3,
				type: 'Multi categorical',
				name: 'Alluvial Diagram',
				sysName: 'alluvialDiagram',
				description:
						'Alluvial diagrams allow to represent flows and to see correlations between categorical dimensions, visually linking to the number of elements sharing the same categories. It is useful to see the evolution of cluster (such as the number of people belonging',
				dimensionSettings: { arr: 1 },
				customizeSettings: [
					{
						defaultValue: 847,
						description: 'Artboard width in pixels.',
						option: 'Width',
						id: 17
					},
					{
						defaultValue: 500,
						description: 'Artboard height in pixels.',
						option: 'Height',
						id: 18
					},
					{
						defaultValue: 5,
						description:
								'Width of black bars representing nodes, in pixels.',
						option: 'Nodes Width',
						id: 19
					},
					{
						defaultValue: 0.4,
						description: 'Opacity of nodes.',
						option: 'Links Opacity',
						id: 20
					},
					{
						defaultValue: ['size', 'name', 'automatic'],
						description:
								'Sorting of nodes inside each step. It can be ‘automatic’ (trying to reduce the number of overlappings among flows), ‘size’ (nodes ordered from the biggest to the smallest), and ‘alphabetical’.',
						option: 'Sort By',
						id: 21
					},
					{
						defaultValue: [],
						description:
								'The color of flows. The color is defined by the source node. For each unique value found in the dimension dragged as ‘steps’ a color is defined.',
						option: 'Color scale',
						id: 22
					}
				],
				createdAt: '2018-08-16T21:00:00.000Z',
				updatedAt: '2018-08-16T21:00:00.000Z'
			}
		],
		{}
	),

	// down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
	down: queryInterface => queryInterface.bulkDelete('chartTypes', null, {})
};
