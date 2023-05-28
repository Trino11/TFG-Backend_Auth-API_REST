import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

class VerifyController {

    public async verifyToken(req: Request, res: Response) {

        let token = req.body.token;
        if (!token) { //If dont have a token header send a 401 and a msg
            res.status(401).json({ error: "The token is not valid or expired" })
            return
        }
        if (typeof (token) === 'string') //Ts need this line to know that token is a string and not a string[]
            jwt.verify(token, String(process.env.JWTKEY), (err, decod) => { //Verify the token
                if (err)
                    res.status(401).json({ error: "The token is not valid or expired" })
                else if (typeof (decod) !== 'string') {
                    res.status(200).json({ msg: "The token is valid", uid:decod?.uid})
                }
                //userId = decod?.userId
            })

    }
}
const loginController = new VerifyController();
export default loginController;