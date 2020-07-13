import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../../env';

/**
 *  metode hashing pass
 *  @param { string } password
 *  @returns { string } return hashed pass
 */

const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);
const hashPassword = password => bcrypt.hashSync(password, salt);

/**
 * perbandingan password
 * @param { string } hashPassword
 * @param { string } password
 * @returns { Boolean  return True or False}
 */

const comparePassword = (hashedPassword, password) => {

    return bcrypt.compareSync(password, hashedPassword);

};

/**
 * isValidEmail metode
 * @param { string } email
 * @returns { Boolean } True or False
 */

const isValidEmail = (email) => {

    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);

};

/**
 * validatePassword metode
 * @param { string } password
 * @returns { Boolean } True or False
 */

const validatePassword = (password) => {

    return !(password.length <= 8 || password === '');

};

/**
 * isEmpty metode
 * @param { string, integer } input
 * @returns { Boolean } True or False
 */

const isEmpty = (input) => {

    if (input === undefined || input === '') {
        return true
    }
    return !input.replace(/\s/g, '').length;

};

/**
 * metode pembantu untuk empty
 * @param { string, integer } input
 * @returns { Boolean } True or False
 */

const empty = (input) => {

    if (input === undefined || input === '') {
        return true;
    }

};

/**
 * pembangkitan token
 * @param { string } id
 * @returns { string } token
 */

const generateUserToken = (email, id, is_admin, first_name, last_name) => {

    const token = jwt.sign({
        email,
        user_id: id,
        is_admin,
        first_name,
        last_name,
    },
    env.secret, { expiresIn: '3d' });
    return token;

}; //fungsi untuk mendapatkan token dari jwt yang bersumber dari parameter email etc

export {

    hashPassword,
    comparePassword,
    isValidEmail,
    validatePassword,
    isEmpty,
    empty,
    generateUserToken,

};
