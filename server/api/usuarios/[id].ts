import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()
export default defineEventHandler(async (event) =>{
        const {id} = event.context.params;
        if (!id) {
            return {
              statusCode: 400,
              body: { message: 'User ID is required' }
            };
          }

        try {
            await prisma.usuario.delete({
                where :{
                    id :Number (id)
                }
            });
            return {
                statusCode: 200,
                body: { message: 'User deleted successfully' },
              };
        } catch (error) {
            return {
                statusCode: 500,
                body: { message: 'Error deleting user' },
              };
        }

})