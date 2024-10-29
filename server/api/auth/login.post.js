import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const JWT_SECRET = process.env.NUXT_PUBLIC_SESSION_PASSWORD;

export default defineEventHandler(async (event) => {

  const { correo, password } = await readBody(event);
  const user = await prisma.usuario.findUnique({
    where: {correo },
    include:{
      roles:true
    }
  });

  if (!user) {
    return { statusCode: 401, body: { success: false, message: 'Invalid username or password' } };
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return { statusCode: 401, body: { success: false, message: 'Invalid username or password' } };
  }

  const token = jwt.sign(
    { id: user.id, username: user.correo }, 
    JWT_SECRET, 
    { expiresIn: '12h' } 
  );
  const users = {
    rol : user.roles[0].rol_id,
    us : user.roles[0].usuario_id
  };
 

  // Return the token to the frontend
  return { 
    statusCode: 200, 
    body: { 
      success: true,
      user: users,
      message: 'Login successful', 
      token 
    } 
  };
});                            