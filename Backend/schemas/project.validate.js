import yup from 'yup';

export const projectSchema = yup.object({
    name: yup
        .string()
        .required("El nombre es obligatorio"),
    description: yup
        .string()
        .required("La descripción es obligatoria"), 
    technologies: yup 
        .array()
        .of(yup.string().required("Cada tecnología debe ser un texto"))
        .min(1, "Debe incluir al menos una tecnología")
        .required("El campo de tecnologías es obligatorio"),
    section: yup
        .string()
        .required("La sección es obligatoria"),
    img: yup
        .string()
        .url("La URL de la imagen debe ser válida")
        .required("La imagen es obligatoria"),
    clientId: yup
        .string()
        .required("El clientId es obligatorio")
});
