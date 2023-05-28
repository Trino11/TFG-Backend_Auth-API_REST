import { Router } from 'express';
import registerController from '../controllers/registerController'

class RegisterRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    
    config() {
        this.router.post("/", registerController.registerUser);
    }
}
const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;