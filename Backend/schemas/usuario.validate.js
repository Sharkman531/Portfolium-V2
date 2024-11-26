import * as yup from 'yup';

export const usuarioSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(50, "La contraseña no puede tener más de 50 caracteres")
        .matches(/[0-9]/, "La contraseña debe tener al menos un numero")
        .matches(/[A-Z]/, "La contraseña debe tener al menos una mayuscula"),
    passwordConfirm: yup.string().oneOf([yup.ref("password")], "Las contraseñas deben conincidir").required(),
})

export const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(50, "La contraseña no puede tener más de 50 caracteres")
        .matches(/[0-9]/, "La contraseña debe tener al menos un numero")
        .matches(/[A-Z]/, "La contraseña debe tener al menos una mayuscula"),
}) 