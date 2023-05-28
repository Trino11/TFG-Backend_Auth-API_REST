import { Router } from 'express';
import loginController from '../controllers/loginController'

class LoginRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    
    config() {
        this.router.post("/", loginController.loginUser);
    }
}
const loginRoutes = new LoginRoutes();
export default loginRoutes.router;