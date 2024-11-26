import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'

const Error404Page = () => {

    const navigate = useNavigate()
    
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div
                className="card text-center"
                style={{
                    backgroundColor: 'black',
                    color: 'white',
                    padding: '30px',
                    width: '100%',
                    maxWidth: '500px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                }}
            >
                <h1 className="mb-3">Ups!</h1>
                <p className="mb-4">La página que buscas no existe...</p>
                <button
                    className="btn"
                    style={{
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '10px 20px',
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '5px',
                    }}
                    onClick={() => navigate('/')}
                >
                    Volver al inicio
                </button>
            </div>
        </div>
    );
}

export default Error404Page