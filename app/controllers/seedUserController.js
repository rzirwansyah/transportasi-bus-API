import pool from '../db/dev/pool';

import { hashPassword } from '../helpers/validation';
import { status } from '../helpers/status';

const seedUser = async (req, res) => {

    const seedUserQuery =
    `INSERT INTO users VALUES
    ( default, 'reacaraksa@gmail.com', 'Reaca', 'Teruni', '${ hashPassword('reacaraksa') }', true, NOW() ),
    ( default, 'fresiliavebriani@gmail.com', 'Fresilia', 'Vebriani', '${ hashPassword('fresiliaveb') }', true, NOW() ),
    ( default, 'stephaniebogel@gmail.com', 'Stephanie', 'Isvarini', '${ hashPassword('stephbogel') }', true, NOW() ),
    ( default, 'hayomirinjani@gmail.com', 'Hayomi', 'Rinjani', '${ hashPassword('hayomigendis') }', default, NOW() ),
    ( default, 'aishanabila@gmail.com', 'Aisha', 'Nabila', '${ hashPassword('aishabiya') }', default, NOW() )`;

    try {
        const { rows } = await pool.query(seedUserQuery);
        const dbResponse = rows;
        if (!dbResponse) {
            return res.status(status.bad).send('Seeding was not successful');
        }
        return res.status(status.created).send('Seeding users table was successful');
    } catch (error) {
        return res.status(status.error).send('An error occured try later');
    }

};

export default seedUser;