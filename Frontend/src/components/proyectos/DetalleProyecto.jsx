import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as serviceProyecto from "../../services/proyectos.service";

const DetalleProyecto = () => {
  const [proyecto, setProyecto] = useState({});
  const [isEditing, setIsEditing] = useState(false); 
  const { id } = useParams();
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem("user"))?._id;
  const userName = JSON.parse(localStorage.getItem("user"))?.userName;
  const userEmail = JSON.parse(localStorage.getItem("user"))?.email;

  useEffect(() => {
    serviceProyecto.getProyecto(id).then((proyecto) => {
      setProyecto(proyecto);
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProyecto({ ...proyecto, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      console.log("Datos enviados al backend:", proyecto);
      await serviceProyecto.updateProyecto(id, proyecto);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar el proyecto:", error); 
      alert("No se pudo actualizar el proyecto");
    }
  };

  const handleDelete = async () => {
    try {
      await serviceProyecto.deleteProyecto(id);
      navigate("/");
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
      alert("No se pudo eliminar el proyecto");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ padding: "20px", marginTop: "10px" }}
    >
      <div
        className="card text-white bg-dark"
        style={{
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
          padding: "20px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <div className="text-center mb-3">
          {proyecto.img && (
            <img
              src={proyecto.img}
              alt={proyecto.name}
              style={{
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          )}
        </div>
        <h5 className="card-title text-center mb-3" style={{ fontWeight: "bold" }}>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={proyecto.name || ""}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Editar nombre"
            />
          ) : (
            <span>
              {proyecto.name || (
                <span style={{ fontStyle: "italic", color: "gray" }}>
                  No asignado
                </span>
              )}
            </span>
          )}
        </h5>
        <table className="table table-dark table-striped">
          <tbody>
            {[
              { label: "Descripción", field: "description" },
              { label: "Sección", field: "section" },
              { label: "Tecnologías", field: "technologies" },
              { label: "Creador", field: "clientId" },
            ].map(({ label, field }) => (
              <tr key={field}>
                <th scope="row">{label}</th>
                <td>
                  {field === "clientId" ? (
                    <span>
                      {proyecto.clientId === userId ? (
                        userName ? (
                          `${userName} (yo)`
                        ) : (
                          `${userEmail} (yo)`
                        )
                      ) : proyecto.clientId ? (
                        <Link
                          to={`/profile/${proyecto.clientId}`}
                          style={{
                            textDecoration: "none",
                            color: "lightblue",
                            fontWeight: "bold",
                          }}
                        >
                          {proyecto.clientId}
                        </Link>
                      ) : (
                        <span style={{ fontStyle: "italic", color: "gray" }}>
                          No asignado
                        </span>
                      )}
                    </span>
                  ) : isEditing ? (
                    <input
                      type="text"
                      name={field}
                      value={proyecto[field] || ""}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder={`Editar ${label.toLowerCase()}`}
                    />
                  ) : (
                    <span>
                      {proyecto[field] || (
                        <span style={{ fontStyle: "italic", color: "gray" }}>
                          No asignado
                        </span>
                      )}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-around mt-2">
          {proyecto.clientId === userId && (
            <>
              {isEditing ? (
                <>
                  <button
                    className="btn"
                    onClick={handleSaveChanges}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      borderRadius: "5px",
                    }}
                  >
                    Guardar Cambios
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      borderRadius: "5px",
                    }}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn"
                    onClick={() => setIsEditing(true)}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      borderRadius: "5px",
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="btn"
                    onClick={handleDelete}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      borderRadius: "5px",
                    }}
                  >
                    Eliminar
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );


};

export default DetalleProyecto;
