import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@dwt4av-hibridas-cluster.z4azp.mongodb.net/")

const db = client.db("Portfolium")  

async function getProyectos(filtros = {}){
    const filterMongo = { eliminado: { $ne: true } }
    if(filtros.tematica !== undefined){
        filterMongo.tematica = {$eq : filtros.tematica}
    }
    if( filtros.puntuacionMayorQue !== undefined || filtros.puntuacionMenorQue !== undefined ){
        filterMongo.$and = [ {puntuacion: { $gt: parseInt(filtros.puntuacionMayorQue) }}, { puntuacion: { $lt: parseInt(filtros.puntuacionMenorQue) } } ]
    }
    if( filtros.descripcion !== undefined ){
        filterMongo.$text = { $search: filtros.descripcion }
    }
    await client.connect()
    return db.collection("Projects").find( filterMongo ).toArray()
}

async function getProyectoId(id_ingresado){
    await client.connect()
    const datos = await db.collection("Projects").findOne( { _id: ObjectId.createFromHexString(id_ingresado) } )  
    return datos 
}

async function agregarProyecto(proyectoData){  
    await client.connect();
    const result = await db.collection("Projects").insertOne(proyectoData);
    return result;
}

async function eliminarProyecto(id_ingresado){ 
    await client.connect()
    await db.collection("Projects").deleteOne({ _id: ObjectId.createFromHexString(id_ingresado)} );
    return id_ingresado
}
const modificarProyecto = async (id_ingresado, proyectoActualizada) => {
    await client.connect()
    await db.collection("Projects").replaceOne({ _id: ObjectId.createFromHexString(id_ingresado)}, proyectoActualizada)
    return proyectoActualizada 
}

const actualizarProyecto = async (id, proyectoActualizada) => {
    await client.connect()
    const { _id, ...proyectoSinId } = proyectoActualizada;  

    const proyectoNueva = await db.collection("Projects").updateOne(
        { _id: ObjectId.createFromHexString(id) }, 
        { $set: proyectoSinId }
    ); 

    return proyectoNueva
}

export {
    getProyectoId,
    getProyectos,
    agregarProyecto,
    eliminarProyecto,
    modificarProyecto,
    actualizarProyecto
}