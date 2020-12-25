module.exports = (sequelize, Sequelize) => {
    const Sex = sequelize.define('sex', {
        sexCd: {
            type: Sequelize.CHAR(2),
            primaryKey: true,
            allowNull: false
        },
        sexName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Sex;
}