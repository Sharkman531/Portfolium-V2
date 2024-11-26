import React from 'react';
import { Link } from 'react-router-dom';
import { useToken } from "../../contexts/session.context";

const NavBar = () => {

    const token = useToken();

    const userName = JSON.parse(localStorage.getItem("user"))?.userName;
    
    const userEmail = JSON.parse(localStorage.getItem("user"))?.email;

    return ( 
        <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Portfolium</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse justify-content-between" id="navbarNav">

                    <ul className="navbar-nav ms-auto">
                        {!token ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/register">Register</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/">Proyectos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/users">Usuarios</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/profile">Perfil</Link>
                                </li>
                                <li className="nav-item d-flex align-items-center px-2">
                                    <div
                                        style={{
                                            width: '1px',
                                            height: '24px',
                                            backgroundColor: 'white'
                                        }}
                                    ></div>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/logout">Logout</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
    


};

export default NavBar;
