import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToken } from "../../contexts/session.context";

function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const token = useToken();
  const navigate = useNavigate();

  const fetchUsuario = async () => {
    try {
      if (!token) {
        navigate("/login"); 
        return;
      }

      const response = await fetch(`http://localhost:2025/api/usuarios/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          setUsuario(null);
        }
        throw new Error("No se pudo cargar el perfil");
      }

      const data = await response.json();
      setUsuario(data); 
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
      setUsuario(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, [id, token]); 

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  if (!usuario) {
    return <div>Usuario no encontrado</div>;
  }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ marginTop: "10px", padding: "20px" }}>
      <div className="card text-white bg-dark" style={{ boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)", borderRadius: "10px", padding: "20px" }}>
        <div className="image-container d-flex justify-content-center" style={{ marginBottom: "10px" }}>
          <img
            src={usuario?.profilePic || "default-profile-pic-url"}
            alt={usuario?.userName}
            style={{ width: "200px", height: "200px", objectFit: "cover", backgroundColor: "#333", padding: "5px", borderRadius: "10px" }}
          />
        </div>
        <div className="text-center mb-2" style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "40px" }}>
          Perfil de {usuario.userName || usuario.email}
        </div>
        <table className="table table-dark table-striped table-bordered mt-3">
          <tbody>
            <tr>
              <th scope="row">Email:</th>
              <td>{usuario.email || <span style={{ color: "#B0B0B0", fontStyle: "italic" }}>No asignado</span>}</td>
            </tr>
            <tr>
              <th scope="row">Nombre de usuario:</th>
              <td>{usuario.userName || <span style={{ color: "#B0B0B0", fontStyle: "italic" }}>No asignado</span>}</td>
            </tr>
            <tr>
              <th scope="row">Descripción:</th>
              <td>{usuario.bio || <span style={{ color: "#B0B0B0", fontStyle: "italic" }}>No asignado</span>}</td>
            </tr>
            <tr>
              <th scope="row">Profesión:</th>
              <td>{usuario.profession || <span style={{ color: "#B0B0B0", fontStyle: "italic" }}>No asignado</span>}</td>
            </tr>
            <tr>
              <th scope="row">Número de contacto:</th>
              <td>{usuario.contactNumber || <span style={{ color: "#B0B0B0", fontStyle: "italic" }}>No asignado</span>}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PerfilUsuario;
