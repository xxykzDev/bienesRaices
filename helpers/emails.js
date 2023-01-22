import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const { email, nombre, token } = datos;

  //enviamos el email
  // enviamos la informacion del mail
  await transport.sendMail({
    from: "BienesRaices.com",
    to: email,
    subject: "Confirma tu cuenta",
    text: "Confirma tu cuenta en Bienes raices",
    html: `
      <p>Hola ${nombre}, Comprueba tu cuenta en BienesRaices.com</p>
      <p>Solo debes confirmar en el enlace!</p>
      <a href="">Confirmar Cuenta</a>
      <p>Si no creaeste la cuenta peudes ignorar este mail</p>
    `,
  });
};

export { emailRegistro };
