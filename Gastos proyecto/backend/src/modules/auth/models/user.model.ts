import { pool } from '../../../config/database';
import bcrypt from 'bcryptjs';

export interface User {
  id: number;
  username: string;
  password?: string;
  email?: string;
  role: 'ADMIN' | 'USER';
}

export async function findUserByUsername(username: string): Promise<User | null> {
  const result = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $1', [username]);
  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function createUser(data: { username: string; email: string; role?: 'ADMIN' | 'USER' }): Promise<User> {
  const role = data.role || 'USER';
  const result = await pool.query(
    'INSERT INTO users (username, email, role) VALUES ($1, $2, $3) RETURNING *',
    [data.username, data.email, role]
  );
  return result.rows[0];
}

export async function comparePassword(passwordPlain: string, hash: string): Promise<boolean> {
  if (!hash) return false;
  return bcrypt.compare(passwordPlain, hash);
}

export async function seedUsers(): Promise<void> {
  const countResult = await pool.query('SELECT COUNT(*) AS total FROM users');
  const count = Number(countResult.rows[0].total);

  if (count > 0) {
    console.log(' Usuarios ya existentes, no se ejecuta el seed.');
    return;
  }

  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  await pool.query(
    'INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4)',
    ['admin', adminPassword, 'admin@gastos.com', 'ADMIN']
  );
  await pool.query(
    'INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4)',
    ['user', userPassword, 'user@gastos.com', 'USER']
  );

  console.log(' Usuarios creados por defecto:');
  console.log('   - ADMIN: admin / admin123 (admin@gastos.com)');
  console.log('   - USER : user  / user123 (user@gastos.com)');
}