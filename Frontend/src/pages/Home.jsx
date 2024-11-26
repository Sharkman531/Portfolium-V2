import React,{ useEffect, useState } from 'react'
import ListadoProyectos from '../components/Proyectos/ListadoProyectos'
import * as serviceProyectos from '../services/proyectos.service'
const Home = () => {
    const [proyectos, setProyectos] = useState([])

    useEffect( () => {
        serviceProyectos.getProyectos()
        .then( proyectos => {
            setProyectos(proyectos)
        })
    },[] )

    return (
        <ListadoProyectos listado={proyectos} /> 
    )
}

export default Home