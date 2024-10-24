-- CreateTable
CREATE TABLE "Estado" (
    "id" SERIAL NOT NULL,
    "stado_actividad" TEXT NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "dni" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "carrera" TEXT,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telefono" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioRoles" (
    "usuario_id" INTEGER NOT NULL,
    "rol_id" INTEGER NOT NULL,

    CONSTRAINT "UsuarioRoles_pkey" PRIMARY KEY ("usuario_id","rol_id")
);

-- CreateTable
CREATE TABLE "Actividades" (
    "id" SERIAL NOT NULL,
    "actividad" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "usuario_id" INTEGER,
    "estado_id" INTEGER,

    CONSTRAINT "Actividades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstadoAsis" (
    "id" SERIAL NOT NULL,
    "stado_asis" TEXT NOT NULL,

    CONSTRAINT "EstadoAsis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asistencias" (
    "id" SERIAL NOT NULL,
    "hora_entrada" TIMESTAMP(3) NOT NULL,
    "hora_salida" TIMESTAMP(3),
    "usuario_id" INTEGER NOT NULL,
    "estado_asis_id" INTEGER,

    CONSTRAINT "Asistencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reportes" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "actividad_id" INTEGER,
    "asistencia_id" INTEGER,

    CONSTRAINT "Reportes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_dni_key" ON "Usuario"("dni");

-- AddForeignKey
ALTER TABLE "UsuarioRoles" ADD CONSTRAINT "UsuarioRoles_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioRoles" ADD CONSTRAINT "UsuarioRoles_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actividades" ADD CONSTRAINT "Actividades_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actividades" ADD CONSTRAINT "Actividades_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "Estado"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencias" ADD CONSTRAINT "Asistencias_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencias" ADD CONSTRAINT "Asistencias_estado_asis_id_fkey" FOREIGN KEY ("estado_asis_id") REFERENCES "EstadoAsis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reportes" ADD CONSTRAINT "Reportes_actividad_id_fkey" FOREIGN KEY ("actividad_id") REFERENCES "Actividades"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reportes" ADD CONSTRAINT "Reportes_asistencia_id_fkey" FOREIGN KEY ("asistencia_id") REFERENCES "Asistencias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
