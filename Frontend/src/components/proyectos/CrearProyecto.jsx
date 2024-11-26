import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as serviceProyecto from "../../services/proyectos.service";

const CrearProyecto = () => {
  const navigate = useNavigate();
  const [proyecto, setProyecto] = useState({ 
    name: "",
    description: "",
    section: "",
    technologies: "",
  });
  
  const [errores, setErrores] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProyecto({ ...proyecto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const erroresValidacion = validarFormulario(proyecto);
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      setIsSubmitting(false);
      return; 
    }

    try {
      const technologiesArray = proyecto.technologies.split(',').map((tech) => tech.trim());

      const user = JSON.parse(localStorage.getItem("user"));  
      const userId = user ? user._id : null;  

      const proyectoData = { 
        ...proyecto, 
        img: "https://picsum.photos/400/225",
        technologies: technologiesArray, 
        clientId: userId, 
      };

      await serviceProyecto.agregarProyecto(proyectoData);
      navigate("/");
      
    } catch (error) {
      console.error("Error al crear el proyecto:", error); 
      alert("No se pudo crear el proyecto");
    }
    setIsSubmitting(false);
  };

  const validarFormulario = (data) => {
    const errores = {};
    if (!data.name) errores.name = "El nombre es obligatorio";
    if (!data.description) errores.description = "La descripción es obligatoria";
    if (!data.section) errores.section = "La sección es obligatoria";
    if (!data.technologies) errores.technologies = "Las tecnologías son obligatorias";
    return errores;
  };

  return (
    <div className="container mt-5">
      <div
        className="card p-4 mx-auto bg-dark"
        style={{
          maxWidth: "600px",
          color: "#fff",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
          borderRadius: "8px",
        }}
      >
        <h2 className="text-center">Nuevo Proyecto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del proyecto</label>
            <input
              type="text"
              name="name"
              value={proyecto.name}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Nombre"
            />
            {errores.name && <div className="text-danger">{errores.name}</div>}
          </div>

          <div className="form-group mt-3">
            <label>Descripción</label>
            <textarea
              name="description"
              value={proyecto.description}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Descripción"
            ></textarea>
            {errores.description && (
              <div className="text-danger">{errores.description}</div>
            )}
          </div>

          <div className="form-group mt-3">
            <label>Sección</label>
            <input
              type="text"
              name="section"
              value={proyecto.section}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Sección"
            />
            {errores.section && <div className="text-danger">{errores.section}</div>}
          </div>

          <div className="form-group mt-3">
            <label>Tecnologías</label>
            <input
              type="text"
              name="technologies"
              value={proyecto.technologies}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Tecnologías"
            />
            {errores.technologies && (
              <div className="text-danger">{errores.technologies}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-danger mt-4 w-100"
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              backgroundColor: "red",
              borderColor: "red",
            }}
            disabled={isSubmitting}
          >
            Crear Proyecto
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearProyecto;
