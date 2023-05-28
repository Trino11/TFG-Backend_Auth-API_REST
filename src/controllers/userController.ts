import { Request, Response } from 'express';
import { getClient } from '../database/database.'
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

class UserController {

    public async allInfo(req: Request, res: Response) {

        let token = req.body.token;
        if (!token) { //If dont have a token header send a 401 and a msg
            res.status(401).json({ error: "The token is not valid or expired" })
            return
        }
        if (typeof (token) === 'string') //Ts need this line to know that token is a string and not a string[]
            jwt.verify(token, String(process.env.JWTKEY), async (err, decod) => { //Verify the token
                if (err)
                    res.status(401).json({ error: "The token is not valid or expired" })
                else if (typeof (decod) !== 'string') {

                    const client: MongoClient = getClient()
                    const database = client.db('database');
                    const users = database.collection('userCreds');
        
                    const result = await users.findOne({uid:decod?.uid}, {projection:{username:1, email:1}});
                    res.status(200).json({ msg: "Returning user data", user:{uid:decod?.uid, username:result?.username, email:result?.email} })
                }
            })


    }
}
const userController = new UserController();
export default userController;