import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
    3;
};
export const register = ({ email, password }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOrCreate({
                where: { email },
                defaults: {
                    email,
                    password: hashPassword(password),
                },
            });

            resolve({
                err: response[1] ? 0 : 1,
                message: response[1] ? 'Register is successfully' : 'Email is used',
            });
        } catch (error) {
            reject(error);
        }
    });

export const login = ({ email, password }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOne({
                where: { email },
                raw: true,
            });
            const isChecked = response && bcrypt.compareSync(password, response.password);
            const token = isChecked
                ? jwt.sign(
                      { id: response.id, email: response.email, roleCode: response.roleCode },
                      process.env.JWT_SECRET,
                      { expiresIn: '1d' },
                  )
                : null;
            resolve({
                err: token ? 0 : 1,
                message: token ? 'Login is successfully' : response ? 'Wrong password' : 'Email does not exist',
                access_token: token,
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
