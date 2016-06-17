
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('group', {
        key: {
            type: DataTypes.STRING(50),
            unique: true
        },
        title: { type: DataTypes.STRING(20), allowNull: false, unique: true },
        interfaces: {
            type: DataTypes.TEXT
        },
        description: { type: DataTypes.TEXT, allowNull: true },
    });
};