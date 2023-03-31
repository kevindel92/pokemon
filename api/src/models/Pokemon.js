const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// Modelo pokemon, debe tener id, nombre, imagen, vida,
// ataque, defensa, velocidad, altura, peso
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('pokemon', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hp: {
        type: DataTypes.INTEGER
    },
    attack: {
        type: DataTypes.INTEGER
    },
    defense: {
        type: DataTypes.INTEGER
    },
    speed: {
        type: DataTypes.INTEGER
    },
    height: {
        type: DataTypes.INTEGER
    },
    weight: {
        type: DataTypes.INTEGER
    },
    image: {
        type: DataTypes.STRING
    },
    createdInDb: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
    },{
    timestamps: false
    });
};
