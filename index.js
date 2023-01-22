import express from "express"; // EXMAScript modules syntax
import usuarioRoutes from "./Routes/usuarioRoutes.js";
import db from "./config/db.js";

const app = express();

const PORT = 3000;

// conexion a la bbdd
try {
  await db.authenticate();
  //crea las tablas si no existieran
  db.sync();
  console.log("Conexion correcta a la bbdd");
} catch (e) {
  console.log(e);
}

//habilitar lectura de datos de formulario
app.use(express.urlencoded({ extended: true }));

// habilitamos pug
app.set("view engine", "pug");

// le indicamos en que directorio estaran nuestras vistas
app.set("views", "./views");

app.use(express.static("public"));

// Routing;
// app.get("/", usuarioRoutes);
// para poder utilizar las todas las rutas definidas en nuestro routing,
// dedbemos utilizar el metodo use, de esta forma sera posible acceder a ellas.
app.use("/auth", usuarioRoutes);

app.listen(PORT, () => {
  console.log(`Aplicacion funcionando en el puerto ${PORT}`);
});
