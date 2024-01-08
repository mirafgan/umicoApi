const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const UserModel = require("../models/models");
const sequelize = new Sequelize("salam", "root", "", {
    host: "localhost",
    dialect: "mysql"
});


const User = sequelize.define("users", UserModel)
const register = async (arg) => {
    try {
        await sequelize.sync()
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(arg.password, salt)
        User.create({ ...arg, password: hash })
        return { message: "Register successful", ok: true }
    } catch (error) {
        return { message: `An Error occured ${error}`, ok: false }
    }

}
const login = async (arg) => {
    const { username, password } = arg;
    
    try {
        await sequelize.sync()
        const user = await User.findOne({ where: { username: username } })
        return bcrypt.compareSync(password, user.password)
    }

    catch (error) {
        console.log('tapilmadi ' + error)
        return false
    }
}
module.exports = { register, login }