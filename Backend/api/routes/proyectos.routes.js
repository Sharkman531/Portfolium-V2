import { Router } from "express";
import * as controller from "../controllers/proyectos.controller.js"
import { validateProject } from "../../middleware/project.validate.middleware.js"
import { validateToken } from "../../middleware/token.validate.middleware.js"

const route = Router()   

route.get( "/proyectos", [validateToken] , controller.getProyectos )
route.get( "/proyectos/:id",[validateToken], controller.getProyectoId )
route.post( "/proyectos", [validateProject], controller.agregarProyecto )
route.put("/proyectos/:id",[validateToken], controller.reemplazarProyecto)      
route.patch("/proyectos/:id",[validateToken], controller.actualizarProyecto)    
route.delete("/proyectos/:id",[validateToken] ,controller.borrarProyecto)    

export default route 