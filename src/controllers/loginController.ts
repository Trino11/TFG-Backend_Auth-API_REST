import { Request, Response } from 'express';
import { getClient } from '../database/database.'
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class LoginController {

    private static generateToken(uid: string): string { //Generate a 7d token with the userId and the role on the payload
        const payload = { check: true, uid: uid };
        const token = jwt.sign(payload, String(process.env.JWTKEY), { expiresIn: '7d', algorithm: 'HS256' });
        return token
    }

    public async loginUser(req: Request, res: Response) {

        if (!req.body.password) {
            res.status(401).json({ msg: 'Incorrect user or password.' })
            return
        }

        const client: MongoClient = getClient()
        try {
            const database = client.db('database');
            const users = database.collection('userCreds');

            const result = await users.findOne({ username: req.body.username });

            if (!result || !bcrypt.compareSync(req.body.password, result.password)) {
                res.status(401).json({ msg: 'Incorrect user or password.' })
                return
            }

            res.status(200).json({ msg: 'Login correct', token:LoginController.generateToken(result.uid) })

        } catch (e) {
            console.error(e)
            res.status(500).json({ msg: "Error while trying to access to database." })
        } finally {
            client.close()
        }

    }
}
const loginController = new LoginController();
export default loginController;