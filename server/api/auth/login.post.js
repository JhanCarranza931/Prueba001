import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
const JWT_SECRET = process.env.NUXT_PUBLIC_SESSION_PASSWORD;
 console.log(JWT_SECRET)

export default defineEventHandler(async (event) => {
  const { correo, password } = await readBody(event);
  console.log(correo)
  // Find the user in the database
  const user = await prisma.usuario.findUnique({
    where: {correo }
  });

  if (!user) {
    return { statusCode: 401, body: { success: false, message: 'Invalid username or password' } };
  }

  // Check if the password is correct
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return { statusCode: 401, body: { success: false, message: 'Invalid username or password' } };
  }

  // Create a JWT token
  const token = jwt.sign(
    { id: user.id, username: user.correo }, 
    JWT_SECRET, 
    { expiresIn: '12h' } // Token expires in 12 hour
  );
 

  // Return the token to the frontend
  return { 
    statusCode: 200, 
    body: { 
      success: true, 
      message: 'Login successful', 
      token 
    } 
  };
});