module.exports = (sequelize, DataTypes) => {
    return sequelize.define('role', {
        key: {type: DataTypes.STRING(50), unique: true},
        title: {type: DataTypes.STRING(20), allowNull: false, unique: true},
        site: {type: DataTypes.STRING(30), allowNull: false, unique: false},
        description: {type: DataTypes.TEXT, allowNull: true},
    });
};