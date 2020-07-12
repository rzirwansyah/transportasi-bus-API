import { Pool } from 'pg'; //modul dalam pg untuk melakukan pooling query ke postgres
import dotenv from 'dotenv'; //modul dalam dotenv untuk indexing file env untuk digunakan ke process.env

dotenv.config();

const databaseConfig = { connectionString: process.env.DATABASE_URL }; //mendapatkan variabel url db di env untuk process.env
const pool = new Pool(databaseConfig); //membuat pool tersambung dengan env db

export default pool;