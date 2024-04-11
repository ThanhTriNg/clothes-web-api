import db from "../models";
import bcrypt from "bcryptjs";

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(15);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
export const register = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(password, hashPassword(password));
      const response = await db.User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: hashPassword(password),
        },
      });
      resolve({
        err: response[1] ? 0 : 1,
        message: response[1] ? "Register is successfully" : "Email is used",
      });
    } catch (error) {
      reject(error);
    }
  });
