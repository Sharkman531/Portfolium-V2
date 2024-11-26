import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient("mongodb+srv://admin:admin@dwt4av-hibridas-cluster.z4azp.mongodb.net/")

const db = client.db("Portfolium")
const tokens = db.collection("Tokens")

const SECRET_KEY = "token"

export async function crearToken(usuario) {
    const token = jwt.sign({...usuario, password: undefined, passwordConfirm: undefined}, SECRET_KEY, { 
        expiresIn: "2h" 
    })

    await client.connect()

    await tokens.insertOne({ token: token, usuario_id: usuario._id })

    const payload = jwt.verify(token, SECRET_KEY)
    console.log(payload.exp, new Date().getTime() / 1000)  

    return token
}

export async function validarToken(token) {
    try {        
        const payload = jwt.verify(token, SECRET_KEY)
        const sessionActiva = await tokens.findOne({ token, usuario_id: new ObjectId(payload._id) })

        if( !sessionActiva ) throw new Error("Token invalido")
        if( payload.exp < (new Date().getTime() / 1000) ) throw new Error("Token expirado")
        return payload
    } catch (error) {
        throw new Error("Token invalido")
    }
}