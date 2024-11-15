import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Obtén todos los usuarios y sus roles
    const usuarios = await prisma.usuario.findMany({
      include: {
        roles: true,
      },
    });

    // Convierte las fotos de los usuarios a Base64
    const usuariosConFotoBase64 = usuarios.map(user => ({
      ...user,
      foto: user.foto ? `data:image/png;base64,${user.foto.toString('base64')}` : null,
    }));
    return usuariosConFotoBase64;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw createError({
      statusCode: 500,
      message: `Error al obtener los usuarios: ${error.message}`,
    });
  }
});
