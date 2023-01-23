import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import generarID from "../helpers/tokens.js";
import { emailRegistro } from "../helpers/emails.js";

const formularioLogin = (req, res) => {
  res.render("auth/login", {
    // podemos pasarle propsa nuestra vista a traves del metodo render
    pagina: "Iniciar sesion",
  });
};

const formularioRegistro = (Sreq, res) => {
  res.render("auth/registro", {
    // podemos pasarle propsa nuestra vista a traves del metodo render
    pagina: "crear cuenta",
  });
};

const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    // podemos pasarle propsa nuestra vista a traves del metodo render
    pagina: "Recupera tu acceso a Bienes Raices",
  });
};

const registrar = async (req, res) => {
  // validacion
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre no puede estar vacio, MOGOLICO")
    .run(req);

  await check("email")
    .isEmail()
    .withMessage("No parece que hayas ingresado un email, pone un @ y un .com")
    .run(req);

  await check("password")
    .isLength({ min: 6 })
    .withMessage("El password debe ser de al menos 6 caracteres, cagon")
    .run(req);

  // await check("repetir_password")
  //   .isLength({ min: 6 })
  //   .equals("password")
  //   .withMessage("No sabes escribir")
  //   .run(req);

  let resultado = validationResult(req);

  // verificar el resultado de la validacion
  // Vuelve a renderizar la vista con los errores en caso de que los haya
  // para eso utilizamos el metodo render nuevamente pasando los errores.
  if (!resultado.isEmpty()) {
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      //errores
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  // verificar que el user no este duplicado
  const existeUsuario = await Usuario.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      errores: [
        {
          msg: "El usuario ya esta registrado",
        },
      ],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  // creamos el user en la bbdd
  const usuario = await Usuario.create({
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
    token: generarID(),
  });

  // Envia email de confirmacion
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  // mostrar mensaje de confirmacion por mail
  res.render("templates/mensaje", {
    pagina: "Cuenta creada correctamente",
    mensaje:
      "Hemos enviado un correo de confirmacion por, presiona en el enlace",
  });
};

// funcion que comprueba una cuenta
// next = parametro para pasar al siguiente middleware EJEMPLO
const confirmar = (req, res, next) => {
  const { token } = req.params;
  // recibimos el parametro pasado por la url
  console.log(token);
  next();
};

export {
  formularioLogin,
  formularioRegistro,
  registrar,
  confirmar,
  formularioOlvidePassword,
};
