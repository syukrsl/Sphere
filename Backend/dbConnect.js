const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const connectMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to MySQL has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the MySQL database:", error);
    process.exit(1);
  }
};

module.exports = {
  Sequelize: sequelize,
  connectMySQL,
};
