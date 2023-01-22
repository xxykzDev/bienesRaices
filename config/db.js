import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const db = new Sequelize(
  process.env.BD_NOMBRE,
  process.env.BD_USUARIO,
  process.env.BD_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: "mysql",
    define: {
      timestamps: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, // milisegundos , es el tiempo que pasara intentando conectar
      idle: 10000, // si no hay movimientos ni visitas durante 10 segundos, lo desconecta,
    },
    operatorsAliases: false,
  }
);

export default db;
