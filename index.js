import express from "express"; // EXMAScript modules syntax
import usuarioRoutes from "./Routes/usuarioRoutes.js";
import db from "./config/db.js";
// con esta libreria nos aseguramos de que el request provegna de una url indicada
import csurf from "csurf";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 3000;

//habilitar lectura de datos de formulario
app.use(express.urlencoded({ extended: true }));

// habilitar cookie parser
app.use(cookieParser());

// habilitar CSRF
app.use(
  csurf({
    cookie: true,
  })
);

// conexion a la bbdd
try {
  await db.authenticate();
  //crea las tablas si no existieran
  db.sync();
  console.log("Conexion correcta a la bbdd");
} catch (e) {
  console.log(e);
}

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
