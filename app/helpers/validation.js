import jwt from 'jsonwebtoken';
import env from '../../env';

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

    if (password.length <= 8 || password === '') {
        return false;
    } return true;

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
    if (input.replace(/\s/g, '').length) {
        return false;
    } return true;

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

    isValidEmail,
    validatePassword,
    isEmpty,
    empty,
    generateUserToken,

};