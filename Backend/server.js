import express from "express"
import apiProyectos from "./api/routes/proyectos.routes.js"
import apiUsuario from "./api/routes/usuarios.routes.js"
import cors from "cors"
import { Server as SocketIO } from "socket.io"
import http from "http"

const app = express();
const server = http.createServer(app);

const io = new SocketIO(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
});

app.use( express.urlencoded({ extended: true }) ) 
app.use( express.json() )

const corsOptions = {
    origin: "http://localhost:5173",    
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "auth-token"],      
}

app.use(cors(corsOptions))

app.use("/api", apiProyectos)
app.use("/api", apiUsuario) 

server.listen(2025, () => console.log("Servidor funcionando")) 