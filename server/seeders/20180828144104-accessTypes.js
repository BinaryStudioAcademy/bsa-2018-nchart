module.exports = {
	up: queryInterface => queryInterface.bulkInsert(
		'accessTypes',
		[
			{
				id: 1,
				accessLevel: 'admin',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: 2,
				accessLevel: 'write',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: 3,
				accessLevel: 'read',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		],
		{}
	),

	down: queryInterface => queryInterface.bulkDelete('accessTypes', null)
};
