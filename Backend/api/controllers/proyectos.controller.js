import * as service from "../../services/proyectos.service.js"

function getProyectos(req, res){
    console.log("Filtros", req.query)
    const filtros = req.query
    service.getProyectos(filtros)
        .then( (proyectos) => res.status(200).json(proyectos) )
}

function getProyectoId(req, res){ 
    const id = req.params.id
    service.getProyectoId(id)
        .then( proyecto => res.status(200).json(proyecto) )
}

function agregarProyecto( req, res ){
    service.agregarProyecto(req.body)
        .then( (proyecto) => res.status(201).json(proyecto) )
}
function reemplazarProyecto(req, res){
    const id = req.params.id
    service.modificarProyecto(id, req.body)
        .then(proyecto => res.status(201).json(proyecto)) 
}

function actualizarProyecto(req, res){
    const id = req.params.id
    service.actualizarProyecto(id, req.body)
        .then(proyecto => {
            if( proyecto ){
                res.status(201).json(proyecto)
            }else{
                res.status(404).json({error: { message: "No se encuentra el proyecto" }})
            }
        })
}

function borrarProyecto(req, res){
    const id = req.params.id
    service.eliminarProyecto(id)
        .then( (id) => res.status(202).json({id: id}) )
}

export {
    getProyectos,
    getProyectoId,
    agregarProyecto,
    reemplazarProyecto,
    actualizarProyecto,
    borrarProyecto
}