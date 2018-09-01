module.exports = {
	up: (queryInterface, Sequelize) => [
		queryInterface.addColumn(
			'datasets',
			'name',
			{
				type: Sequelize.STRING,
				allowNull: true
			}
		),
		queryInterface.addColumn(
			'datasets',
			'sample',
			{
				type: Sequelize.BOOLEAN,
				allowNull: true
			}
		)
	],
	down: (queryInterface) => [
		queryInterface.removeColumn('datasets', 'sample'),
		queryInterface.removeColumn('datasets', 'name')
	]
};
