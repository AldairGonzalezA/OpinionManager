import express, {application} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import authRoutes from '../src/auth/auth.routes.js';
import userRoutes from '../src/users/user.routes.js';
import categoryRoutes from '../src/category/category.routes.js';
import commentRoutes from '../src/comments/comment.routes.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js';
import publicationRoutes from '../src/publications/publication.routes.js';
import { createUserAdmin } from '../src/users/user.controller.js';
import { categoryDefault } from '../src/category/category.controller.js';

const middlewares = (app) =>{
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const routes = (app) =>{
    app.use("/opinionManager/v1/auth", authRoutes);
    app.use("/opinionManager/v1/users", userRoutes);
    app.use("/opinionManager/v1/publications", publicationRoutes);
    app.use("/opinionManager/v1/comments", commentRoutes);
    app.use("/opinionManager/v1/categories", categoryRoutes);
}

const connectarDB = async () =>{
    try {
        await dbConnection();
        console.log('Conexion exitosa con la base de datos')
    } catch (error) {
        console.log('Error al conectar con la base de datos', error);
        process.exit(1);
    }
} 

export const initServer= async () =>{
    const app = express();
    const port = process.env.PORT || 3000;
    try {
        middlewares(app);
        await connectarDB();
        routes(app);
        await createUserAdmin(); 
        categoryDefault();
        app.listen(port);
        console.log(`Server running on port ${port}`);
    } catch (error) {
        console.log(`Server init failed ${error}`)
    }
}