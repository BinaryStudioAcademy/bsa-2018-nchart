
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'users',
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			defaultGroupId: DataTypes.INTEGER
		},
		{}
	);
	// User.associate = models => {
	User.associate = () => {
		// associations can be defined here
	};
	return User;
};
