module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define('country', {
        countryCd: {
            type: Sequelize.CHAR(3),
            primaryKey: true,
            allowNull: false
        },
        countryName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Country;
}