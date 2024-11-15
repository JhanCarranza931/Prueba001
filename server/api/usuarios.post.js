import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readMultipartFormData(event);

    if (!body || body.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'No se han proporcionado datos',
      });
    }

    const fields = {};
    let fileData;

    body.forEach((part) => {
      if (part.name === 'foto') {
        fileData = part;
      } else if (part.data) {
        fields[part.name] = part.data.toString('utf-8');
      }
    });

    if (!fileData || !fileData.data) {
      throw createError({
        statusCode: 400,
        message: 'No se ha proporcionado un archivo de foto',
      });
    }

    // Extrae campos del formulario
    const { dni, nombre, apellido, carrera, correo, password, telefono, rol } = fields;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Busca el rol en la base de datos
    const searchRol = await prisma.roles.findUnique({
      where: { rol: rol },
    });

    if (!searchRol) {
      throw createError({
        statusCode: 400,
        message: 'Rol no encontrado',
      });
    }

    // Crea el usuario con la imagen en formato binario
    const NewUsuario = await prisma.usuario.create({
      data: {
        dni,
        nombre,
        apellido,
        carrera,
        correo,
        password: hashedPassword,
        telefono,
        foto: fileData.data, // Asegúrate de que `fileData.data` sea el buffer binario de la imagen
        roles: {
          create: {
            rol_id: searchRol.id,
          },
        },
      },
    });

    return {
      status: 201,
      usuario: {
        ...NewUsuario,
        password: undefined,
      },
    };
  } catch (error) {
    console.error('Error creando el usuario:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: `Error al crear el usuario: ${error.message}`,
    });
  }
});
