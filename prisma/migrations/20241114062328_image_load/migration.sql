/*
  Warnings:

  - A unique constraint covering the columns `[rol]` on the table `Roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `foto` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actividades" ALTER COLUMN "fecha" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "foto" BYTEA NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Roles_rol_key" ON "Roles"("rol");
