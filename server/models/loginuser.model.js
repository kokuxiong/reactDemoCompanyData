module.exports = (sequelize, Sequelize) => {
    const Loginuser = sequelize.define('loginuser', {
        accountId: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: Sequelize.CHAR(6),
            allowNull: false
        }
    });
    return Loginuser;
}