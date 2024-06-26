module.exports = (sequelize,DataTypes)=>{
    const Users = sequelize.define("user",{
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:true
        }
    })
    return Users;
};