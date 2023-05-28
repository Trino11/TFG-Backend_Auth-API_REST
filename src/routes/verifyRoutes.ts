import { Router } from 'express';
import verifyController from '../controllers/verifyController'

class VerifyRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    
    config() {
        this.router.get("/", verifyController.verifyToken);
    }
}
const verifyRoutes = new VerifyRoutes();
export default verifyRoutes.router;