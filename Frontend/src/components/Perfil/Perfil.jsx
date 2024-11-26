import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../contexts/session.context";

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const token = useToken();
  const navigate = useNavigate();

  const fetchUsuario = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:2025/api/usuario", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("No se pudo cargar el perfil");
      }

      const data = await response.json();
      setUsuario(data);
      setUpdatedUser(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setUpdatedUser(usuario);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("http://localhost:2025/api/usuario", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("No se pudieron guardar los cambios");
      }

      const data = await response.json();
      setUsuario(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, [token]);

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        padding: "20px",
      }}
    >
      <div
        className="card text-white bg-dark"
        style={{
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <div
          className="image-container d-flex justify-content-center"
          style={{
            marginBottom: "10px",
          }}
        >
          <img
            src={usuario?.profilePic || "default-profile-pic-url"}
            alt={usuario?.userName}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              backgroundColor: "#333",
              padding: "5px",
              borderRadius: "10px",
            }}
          />
        </div>

        <div
          className="text-center mb-2"
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "40px"
          }}
        >
          {usuario.userName || usuario.email}
        </div>

        <table className="table table-dark table-striped table-bordered mt-2">
          <tbody>
            <tr>
              <th scope="row">Email:</th>
              <td>
                {usuario.email}
              </td>
            </tr>
            <tr>
              <th scope="row">Nombre de usuario:</th>
              <td>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="userName"
                      value={updatedUser.userName || ""}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </>
                ) : (
                  usuario.userName || <span style={{ color: "#B0B0B0", fontStyle: "italic" }}>No asignado</span>
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">Descripción:</th>
              <td>
                {isEditing ? (
                  <>
                    <textarea
                      name="bio"
                      value={updatedUser.bio || ""}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </>
                ) : (
                  usuario.bio || <span style={{ color: "#B0B0B0", fontStyle: "italic" }}>No asignado</span>
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">Profesión:</th>
              <td>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="profession"
                      value={updatedUser.profession || ""}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </>
                ) : (
                  usuario.profession || <span style={{ color: "#B0B0B0", fontStyle: "italic" }}>No asignado</span>
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">Número de contacto:</th>
              <td>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="contactNumber"
                      value={updatedUser.contactNumber || ""}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </>
                ) : (
                  usuario.contactNumber || <span style={{ color: "#B0B0B0", fontStyle: "italic" }}>No asignado</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="d-flex justify-content-around mt-2">
          {isEditing ? (
            <>
              <button
                className="btn"
                style={{
                  backgroundColor: "green",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "5px",
                }}
                onClick={handleSaveChanges}
              >
                Guardar cambios
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "5px",
                }}
                onClick={handleEditToggle}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              className="btn"
              style={{
                backgroundColor: "red",
                color: "white",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
              onClick={handleEditToggle}
            >
              Editar perfil
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
