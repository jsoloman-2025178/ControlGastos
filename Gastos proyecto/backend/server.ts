import dotenv from 'dotenv';
import { app } from './app';
import { testConnection, ensureDatabase, pool } from './src/config/database';
import { seedUsers } from './src/modules/auth/models/user.model';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
  try {
    await ensureDatabase();
    await testConnection();
    await createTablesIfNotExist();
    await seedUsers();

    app.listen(PORT, () => {
      console.log(` Servidor corriendo en http://localhost:${PORT}`);
      console.log(` Endpoint de login: http://localhost:${PORT}/api/auth/login`);
      console.log(` Endpoint de login Google: http://localhost:${PORT}/api/auth/google`);
    });
  } catch (error) {
    console.error(' No se pudo iniciar el servidor. Revisa la configuracion de la base de datos en .env');
    process.exit(1);
  }
}

async function createTablesIfNotExist(): Promise<void> {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255),
      email VARCHAR(100) UNIQUE,
      role VARCHAR(10) NOT NULL DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER')),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await pool.query(createUsersTable);
  await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(100) UNIQUE;');
  await pool.query('ALTER TABLE users ALTER COLUMN password DROP NOT NULL;');
  console.log(' Tabla users verificada/actualizada con soporte de email y Google Auth.');
}

startServer();