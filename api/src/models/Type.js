const { DataTypes } = require("sequelize");

// Modelo type, debe tener id y nombre

module.exports = (sequelize) => {
    sequelize.define('type', {
        id: {
            type: DataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });
};