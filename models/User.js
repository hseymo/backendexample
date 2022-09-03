const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")

class User extends Model {}

User.init({
    // add properites here, ex:
    username: {
         type: DataTypes.STRING,
         allowNull:false,
         unique:true,
         validate: {
            isAlphanumeric: true
         }
    },
    email: {
        type: DataTypes.STRING,
        unique: true, 
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[8]
        }
    }
},{
    hooks:{
        beforeCreate: async (userData) => {
            userData.email = await userData.email.toLowerCase();
            userData.password = await bcrypt.hash(userData.password,5);
            return userData;
        },
        beforeUpdate: async (updatedUserData) => {
            updatedUserData.email = await updatedUserData.email.toLowerCase();
            return updatedUserData;
        }
    },
    sequelize,
});

module.exports=User