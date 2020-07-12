import pool from './pool';

export default {

    /**
     * Query DB
     * @param { object } req
     * @param { object } res
     * @returns { object } object
     */

    query(quertText, params) {
        return new Promise((resolve, reject) => {
            pool.query(quertText, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    } //metode query dengan quertText = perintah query dan params = nilai yang dibutuhkan untuk query. Metode ini menggunakan promise di JS
     
};