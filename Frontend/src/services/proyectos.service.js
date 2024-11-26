import { call } from "./api.service"

export async function getProyectos(){
    return call( { uri: "proyectos" } ) 
}

export async function getProyecto( id ){
    return call( { uri: `proyectos/${id}` } ) 
}

export async function agregarProyecto(proyectoData) { 
    return call({
      uri: "proyectos",  
      method: "POST",   
      body: proyectoData,  
    });
  }

export async function updateProyecto(id, data) {
    const { _id, ...proyectoSinId } = data;   

    return call({
        uri: `proyectos/${id}`,
        method: "PATCH", 
        body: proyectoSinId, 
    });
}

export async function deleteProyecto(id) {
    return call({
        uri: `proyectos/${id}`,
        method: "DELETE", 
    });
}