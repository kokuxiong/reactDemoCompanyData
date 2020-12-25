module.exports = (sequelize, Sequelize) => {
    const Empinfo = sequelize.define('empinfo', {
        cmpCd: {
            type: Sequelize.CHAR(6),
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sexCd: {
            type: Sequelize.CHAR(2),
            allowNull: false
        },
        birthday: {
            type: Sequelize.DATE(),
            allowNull: false
        },
        countryCd: {
            type: Sequelize.CHAR(3),
            allowNull: false
        }
    });
    return Empinfo;
}