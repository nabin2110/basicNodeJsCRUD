module.exports = {
    HOST: "localhost",
    USER: "nabin",
    PASSWORD: "password",
    DB: "db_nodeblogs",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };