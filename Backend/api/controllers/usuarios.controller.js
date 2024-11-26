import * as service from "../../services/usuarios.service.js"

export function createUser(req, res){
    service.createUser(req.body)
        .then( (usuario) => res.status(201).json( usuario ) )
        .catch( ( ) => res.status(400).json( { message: "No se pudo crear" } ) ) 
}

export function login(req, res){ 
    service.login(req.body)
        .then( (usuario) => res.status(200).json(usuario) )
        .catch( () => res.status(400).json({ message: "No se pudo loguear" }) ) 
}

export function getUser(req, res){
    service.getUser(req.usuario._id)
        .then( (usuario) => res.status(200).json(usuario) )
        .catch( () => res.status(400).json({ message: "No se pudo obtener el usuario" }) )
}

export function updateUser(req, res){
    const { userName, bio, profession, contactNumber } = req.body;
    const userId = req.usuario._id; 

    service.updateUser(userId, { userName, bio, profession, contactNumber })
        .then((usuarioActualizado) => res.status(200).json(usuarioActualizado))
        .catch(() => res.status(400).json({ message: "No se pudieron guardar los cambios" }));
}

export function getAllUsers(req, res) {
    service.getAllUsers()
        .then((usuarios) => res.status(200).json(usuarios))
        .catch(() => res.status(400).json({ message: "No se pudieron obtener los usuarios" }));
}

export function getUserById(req, res) {
    const { id } = req.params; 

    service.getUserById(id)
        .then((usuario) => {
            if (!usuario) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            res.status(200).json(usuario);
        })
        .catch(() => res.status(500).json({ message: "No se pudo obtener el usuario" }));
}