import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { mkdir } from 'node:fs/promises';

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
      if (part.name === 'foto' && part.type === 'image/png') {
        fileData = part;
      } else if (part.data) {
        fields[part.name] = part.data.toString('utf-8');
      }
    });
    
    if (!fileData) {
      throw createError({
        statusCode: 400,
        message: 'No se ha proporcionado un archivo de foto',
      });
    }
    
    // Verificación para ver si `fileData` fue asignado correctamente
    console.log('fileData:', fileData);
    console.log('fields:', fields);

    const { dni, nombre, apellido, carrera, correo, password, telefono, rol } = fields;
    const hashedPassword = await bcrypt.hash(password, 10);

    const searchRol = await prisma.roles.findUnique({
      where: { rol: rol },
    });

    if (!searchRol) {
      throw createError({
        statusCode: 400,
        message: 'Rol no encontrado',
      });
    }

    const uploadDir = join(process.cwd(),'public' ,'uploads');
    
    // Ensure the upload directory exists
    await mkdir(uploadDir, { recursive: true });
    
    const fileName = `${Date.now()}-${fileData.filename}`;
    const filePath = join(uploadDir, fileName);

    await writeFile(filePath, fileData.data);

    const NewUsuario = await prisma.usuario.create({
      data: {
        dni,
        nombre,
        apellido,
        carrera,
        correo,
        password: hashedPassword,
        telefono,
        foto: fileName, // Store the file name instead of the binary data
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
        password: undefined, // Don't send the password back to the client
      },
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: `Error al crear el usuario: ${error.message}`,
    });
  }
});