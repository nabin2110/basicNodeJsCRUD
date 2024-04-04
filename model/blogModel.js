module.exports = (sequelize, DataTypes) => {
    const Blogs = sequelize.define("blog", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sub_title:{
        type: DataTypes.STRING,
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    
    });
    return Blogs;
  };