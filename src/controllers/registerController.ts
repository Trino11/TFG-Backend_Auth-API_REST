import { Request, Response } from 'express';
import { getClient } from '../database/database.'
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
const saltRounds = 10;


class RegisterController {

    public static async isEmailOrUsernameUsed(email: string, username: string): Promise<boolean> {
        const client: MongoClient = getClient()
        var result = true
        try {
            const database = client.db('database');
            const users = database.collection('userCreds');
            const usersResult = await users.findOne({ email: email });
            if (usersResult)
                result = true
            else {
                const usersResult2 = await users.findOne({ username: username });
                if (usersResult)
                    result = true
                else {
                    result = false
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
            client.close()
        }
        return result
    }

    public async registerUser(req: Request, res: Response) {

        const client: MongoClient = getClient()
        try {
            const database = client.db('database');
            const users = database.collection('userCreds');

            const hashPass = await bcrypt.hash(req.body.password, saltRounds);

            var userToRegister = {
                uid: uuidv4(),
                username: req.body.username,
                email: req.body.email,
                password: hashPass
            }

            if (!await RegisterController.isEmailOrUsernameUsed(userToRegister.email, userToRegister.username)) {

                const result = await users.insertOne(userToRegister);

                if (result.insertedId)
                    res.status(201).json({ msg: "User registered" })
                else
                    throw new Error('result.insertedId == null.')
            }
            else
                res.status(400).json({ msg: "Error, email is already in use." })

        } catch (e) {
            console.error(e)
            res.status(500).json({ msg: "Error while trying to access to database." })
        } finally {
            client.close()
        }

    }
}
const registerController = new RegisterController();
export default registerController;