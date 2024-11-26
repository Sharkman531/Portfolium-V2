import React from 'react'
import { Link } from 'react-router-dom'

const ListadoProyectos = ({ listado }) => {
    console.log(listado)
    return (
        <div className="container my-5">
            
            <hr style={{ height: '3px', backgroundColor: 'black', border: 'none' }} /> 

            <div className="text-center my-4">
                <Link
                    to="/create-project"
                    className="btn btn-danger btn-lg"
                    style={{
                        fontSize: '1.5rem',
                        width: '50%',
                        backgroundColor: 'black',
                        borderColor: 'black',
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        display: 'inline-block',
                        textDecoration: 'none' 
                    }}
                >
                    Crear Proyecto
                </Link>
            </div>

            <hr style={{ height: '3px', backgroundColor: 'black', border: 'none' }} />

            <div className="row" style={{
                marginTop: '50px',
            }}>
                {listado.length > 0 &&
                    listado.map((proyecto) => (
                        <div
                            key={proyecto._id}
                            className="col-md-4 col-12 mb-4"
                            onClick={() => window.location.href = `/proyecto/${proyecto._id}`}
                        >
                            <div
                                className="card"
                                style={{
                                    width: "90%",
                                    backgroundColor: "#000",
                                    color: "#fff",
                                    cursor: "pointer",
                                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                                    transition: "transform 0.2s",
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                            >
                                <img
                                    src={proyecto.img}
                                    className="card-img-top"
                                    alt={proyecto.name}
                                    style={{
                                        height: "200px",
                                        objectFit: "cover",
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{proyecto.name}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );


}

export default ListadoProyectos