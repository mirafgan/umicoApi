const { DataTypes } = require("sequelize");

const UserModel = {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}
module.exports = UserModel