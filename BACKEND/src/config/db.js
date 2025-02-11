import dotenv from 'dotenv';
import mysql from 'mysql2/promise'; 

dotenv.config();  


async function conexionbd() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000 // 10 segundos
  });

  return connection;
}


export default conexionbd;  
