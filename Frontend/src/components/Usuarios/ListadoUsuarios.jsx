import React, { useEffect, useState } from "react";
import { useToken } from "../../contexts/session.context";
import { useNavigate, Link } from "react-router-dom";

function ListadoUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useToken();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;

  const fetchUsuarios = async () => {
    try {
      if (!token) {
        alert("No estás autenticado. Por favor, inicia sesión.");
        return;
      }

      const response = await fetch("http://localhost:2025/api/usuarios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de usuarios");
      }

      const data = await response.json();
      setUsuarios(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, [token]);

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card text-white bg-dark" style={{ padding: "20px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)", borderRadius: "10px" }}>
        <h2 className="text-center mb-4">Listado de Usuarios</h2>

        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th>Foto de Perfil</th>
              <th>Nombre de Usuario / Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td style={{ display: "flex", alignItems: "center" }}>

                  <img
                    src={usuario.profilePic || "https://picsum.photos/400/225"}
                    alt={usuario.userName || "Perfil"}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      backgroundColor: "#333",
                    }}
                  />
                </td>
                <td style={{ paddingLeft: "15px" }}>
                  {usuario.userName || usuario.email}
                </td>
                <td style={{ textAlign: "center" }}>
                  <Link
                    to={usuario._id === userId ? "/profile" : `/profile/${usuario._id}`}
                    className="btn btn-dark"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      border: "none",
                      textDecoration: "none",
                      display: "inline-block" 
                    }}
                  >
                    Ver perfil
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListadoUsuarios;