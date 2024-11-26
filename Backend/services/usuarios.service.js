import { MongoClient, ObjectId } from "mongodb"
import bcrypt from "bcrypt"
import { crearToken } from "./token.service.js"

const client = new MongoClient("mongodb+srv://admin:admin@dwt4av-hibridas-cluster.z4azp.mongodb.net/")

const db = client.db("Portfolium")
const usuarios = db.collection("Users") 

export async function createUser(usuario){
    await client.connect() 

    const existe = await usuarios.findOne({ email: usuario.email })

    if( existe ) throw new Error( "cuenta ya existe" )

    const nuevoUsuario = { ...usuario, passwordConfirm: undefined, profilePic: "https://picsum.photos/400/225" }

    nuevoUsuario.password = await bcrypt.hash( usuario.password, 10 )

    await usuarios.insertOne(nuevoUsuario)

    return {...nuevoUsuario, password: undefined}
}

export async function login(usuario){
    await client.connect()

    const existe = await usuarios.findOne({ email: usuario.email })
    console.log("existe")
    if( !existe ) throw new Error( "No se pudo loguear" ) 

    const esValido = await bcrypt.compare( usuario.password, existe.password )
    console.log("es Valido")

    if( !esValido ) throw new Error( "No se pudo loguear" )

    const token = await crearToken(existe)
    
    return { ...existe, token: token, password: undefined, passwordConfirm: undefined }
}

export async function getUser(id){
    await client.connect()

    const existe = await usuarios.findOne({ _id: new ObjectId(id) })

    if( !existe ) throw new Error( "No se pudo obtener el usuario" )

    return { ...existe, password: undefined }
}

export async function updateUser(userId, data) {
    await client.connect();

    const { userName, bio, profession, contactNumber } = data;

    const updateData = {
        userName,
        bio,
        profession,
        contactNumber,
    };

    const result = await usuarios.updateOne(
        { _id: new ObjectId(userId) },
        { $set: updateData }
    );

    if (result.modifiedCount === 0) {
        throw new Error("No se pudo actualizar el usuario");
    }

    const usuarioActualizado = await usuarios.findOne({ _id: new ObjectId(userId) });

    return { ...usuarioActualizado, password: undefined };
}

export async function getAllUsers() {
    await client.connect()

    const todosUsuarios = await usuarios.find().toArray(); 

    return todosUsuarios.map(usuario => {
        return { ...usuario, password: undefined }; 
    });
}

export async function getUserById(id) {
    await client.connect();

    const usuario = await usuarios.findOne({ _id: new ObjectId(id) });

    if (!usuario) throw new Error("Usuario no encontrado");

    return { ...usuario, password: undefined };
}