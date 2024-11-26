import { Router } from "express";
import * as controller from "../controllers/usuarios.controller.js"
import { validateUser, login } from "../../middleware/usuario.validate.middleware.js"
import { validateToken } from "../../middleware/token.validate.middleware.js"

const route = Router()

route.post( "/usuarios",[validateUser], controller.createUser )
route.post( "/usuarios/login",[login], controller.login )
route.get( "/usuario",[validateToken], controller.getUser )
route.get("/usuarios", [validateToken], controller.getAllUsers); 
route.get("/usuarios/:id", [validateToken], controller.getUserById);
route.patch("/usuario", [validateToken], controller.updateUser);

export default route  