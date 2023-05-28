import { Request, Response } from 'express';

class InfoController {
    public async showInfo(req:Request, res: Response){
        res.status(200).json({msg:"Login server on"})
    }
}
const infoController = new InfoController();
export default infoController;