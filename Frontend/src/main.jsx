import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import {
  createBrowserRouter, 
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login/Login.jsx';
import Register from './components/Login/Register.jsx';
import Home from './pages/Home.jsx';
import ProtectedRoute from './components/Rutas/ProtectedRoute.jsx';
import Layout from './components/Layout/Layout.jsx';
import DetalleProyecto from './components/Proyectos/DetalleProyecto.jsx'
import CrearProyecto from './components/Proyectos/CrearProyecto.jsx'
import Logout from './components/Login/Logout.jsx'
import Error404Page from './pages/Error404Page.jsx'
import Users from './components/Usuarios/ListadoUsuarios.jsx'
import Profile from './components/Perfil/Perfil.jsx'
import UserProfile from './components/Perfil/PerfilUsuario.jsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error404Page />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute><Home /></ProtectedRoute>, 
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/logout", 
        element: <Logout />
      },
      {
        path: "/users",
        element: <ProtectedRoute> <Users /> </ProtectedRoute> 
      },
      {
        path: "/profile",
        element: <ProtectedRoute> <Profile /> </ProtectedRoute> 
      },
      {
        path: "/profile/:id",
        element: <ProtectedRoute> <UserProfile /> </ProtectedRoute> 
      },
      {
        path: "/proyecto/:id",
        element: <ProtectedRoute> <DetalleProyecto /> </ProtectedRoute>
      },
      {
        path: "/create-project", 
        element: <ProtectedRoute> <CrearProyecto />
       </ProtectedRoute>
      },
      
      {
        path: "*",
        element: <Error404Page />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
