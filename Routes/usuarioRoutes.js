import express from "express";
import {
  formularioLogin,
  formularioOlvidePassword,
  formularioRegistro,
  confirmar,
  registrar,
} from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);
router.get("/olvide-password", formularioOlvidePassword);
router.post("/registro", registrar);
// envio de variable, crea url dinamicas
router.get("/confirmar/:token", confirmar);

export default router;
