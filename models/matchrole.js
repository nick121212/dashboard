module.exports = (sequelize, DataTypes) => {
    /*
     * 赛事角色管理
     * 赛事下的角色列表
     * */
    return sequelize.define('matchrole', {
        key: {type: DataTypes.STRING(50), unique: true},
        title: {type: DataTypes.STRING(20), allowNull: false, unique: true},
        roles: {type: DataTypes.STRING(100), allowNull: false},
        description: {type: DataTypes.TEXT, allowNull: true}
    });
};