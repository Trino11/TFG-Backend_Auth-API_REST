
import express, { Application, request, response, Router } from 'express';
import cors from 'cors';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import {init} from './database/database.'

import infoRoutes from './routes/infoRoutes';
import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';
import registerRoutes from './routes/registerRoutes';
import verifyRoutes from './routes/verifyRoutes';

require('dotenv').config()

class Server {

    private app: Application;
    private isHttp: boolean = false;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() { //Express configuration
        this.app.set("port", process.env.PORT_ENV = String(process.env.PORT || 3001));

        console.log("Using database on " + process.env.DBHOST + ":" + process.env.DBPORT + " with user " + process.env.DBUSER)

        const swaggerDocument = YAML.load('./swagger.yaml');

        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(session({
            secret: String(process.env.KEYSSN),
            resave: false,
            saveUninitialized: true
        }))

        init()
    }

    async routes() { //Express routes configuration
        let router: Router = Router()

        router.use("/info", infoRoutes);
        router.use("/user", userRoutes);
        router.use("/login", loginRoutes);
        router.use("/register", registerRoutes);
        router.use("/verify", verifyRoutes);
        this.app.use("/v1", router);

    }


    start() {
        this.app.listen(this.app.get("port"), () => console.log("Login server started using http. Listening on port ", this.app.get("port"))); //http server
    }
}
let server = new Server();
server.start();