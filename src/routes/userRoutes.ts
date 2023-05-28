import { Router } from 'express';
import userController from '../controllers/userController'

class UserRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    
    config() {
        this.router.get("/", userController.allInfo);
    }
}
const userRoutes = new UserRoutes();
export default userRoutes.router;