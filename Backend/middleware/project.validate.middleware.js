import { projectSchema } from "../schemas/project.validate.js"

export async function validateProject(req, res, next){
    try {
        const datoValidados = await projectSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        req.body = datoValidados  
        next()
    } catch (error) {
        res.status(400).json({ message: error.errors })
    }
} 