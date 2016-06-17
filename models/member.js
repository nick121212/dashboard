module.exports = (sequelize, DataTypes) => {
    /*
     * 管理员权限的设置
     * */
    return sequelize.define('member', {
        login: {type: DataTypes.STRING(45), allowNull: false, unique: true},
        role: {type: DataTypes.STRING(45), allowNull: false}
    });
};