CREATE TABLE usuarios (
  "id" serial PRIMARY KEY,
  "username" text,
  "email" text UNIQUE,
  "password" text,
  "tipo_de_user_id" int
);


CREATE TABLE clubes (
  "id" serial PRIMARY KEY,
  "nombre" text,
  "administrador" text,
  "email" text,
  "telefono" text,
  "fecha_create" date,
  "fecha_update" date,
  "id_usario" int,
  CONSTRAINT fk_club_user FOREIGN KEY (id_usario)
    REFERENCES usuarios (id)
   
);

CREATE TABLE roles_de_club (
  "id" serial PRIMARY KEY,
  "nombre" text
);  

CREATE TABLE clubes_usuarios (
  "id" serial PRIMARY KEY,
  "id_usuario" int,
  "id_club" int,
  "id_rol" int
);


CREATE TABLE atletas (
  "id" serial PRIMARY KEY,
  "id_usuario" int,
  "nombre" text,
  "apellido" text,
  "tipo_documento" text, 
  "n_documento" text,
  "fecha_nacimiento" date,
  "genero" text,
  "direccion" text,
  "telefono" text,
  "email" text,
  "contacto_emergencia" text, 
  "telef_emergencia" text
);

CREATE TABLE club_atleta (
  "id" serial PRIMARY KEY,
  "id_atleta" int,
  "id_club" int,
  "fecha_registro" date
);

CREATE TABLE formulario_registro_atleta (
  "id" serial PRIMARY KEY,
  "formulario" jsonb,
  "id_club" int
);

CREATE TABLE respuestas_formulario_atleta (
    id serial PRIMARY KEY,
    id_atleta int NOT NULL REFERENCES atletas(id),
    id_formulario int NOT NULL REFERENCES formulario_registro_atleta(id),
    respuestas jsonb NOT NULL,
    fecha_respuesta timestamp DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE tipo_de_user(
  id serial PRIMARY KEY,
  nombre text
);


-- Tabla de tipos de eventos
CREATE TABLE tipo_eventos (
    id_tipo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla de eventos
CREATE TABLE eventos (
    id_evento SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,
    hora TIME,
    id_tipo INT NOT NULL,
    FOREIGN KEY (id_tipo) REFERENCES tipo_eventos(id_tipo)
);

-- Tabla de relación entre clubes y eventos (N:M)
CREATE TABLE eventos_club (
    id_club INT NOT NULL,
    id_evento INT NOT NULL,
    PRIMARY KEY (id_club, id_evento),
    FOREIGN KEY (id_club) REFERENCES clubes(id) ON DELETE CASCADE,
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento) ON DELETE CASCADE
);


-----------------------------------------------------------------------------------------
-- Tabla de métodos de pago (transferencia, depósito, efectivo, etc.)
CREATE TABLE metodo_pago (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Pagos reportados por los atletas a un club
CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    id_atleta INT NOT NULL REFERENCES atletas(id) ON DELETE CASCADE,
    id_club INT NOT NULL REFERENCES clubes(id) ON DELETE CASCADE,
    monto NUMERIC(10,2) NOT NULL,
    fecha_pago DATE NOT NULL,
    referencia VARCHAR(100), -- nro de transacción, recibo, etc.
    metodo text ,
    comprobante_url TEXT, -- si guardas evidencia (ej: imagen/pdf en S3)
    estado VARCHAR(20) DEFAULT 'pendiente', 
    fecha_reporte TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Historial de revisiones (para que el club pueda cambiar estado con comentarios)
CREATE TABLE pagos_historial (
    id SERIAL PRIMARY KEY,
    id_pago INT NOT NULL REFERENCES pagos(id) ON DELETE CASCADE,
    estado VARCHAR(20) NOT NULL, -- pendiente, aprobado, rechazado
    comentario TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);




CREATE TABLE asistencias (
  id SERIAL PRIMARY KEY,
  id_atleta INT NOT NULL,
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  presente BOOLEAN,
  observaciones TEXT,
  CONSTRAINT fk_asistencia_atleta FOREIGN KEY (id_atleta)
    REFERENCES atletas (id)
    ON DELETE CASCADE
);



create table info_depot_atleta (
"id" serial PRIMARY KEY,
"categoria" text ,
"posicion" text,
"dorsal" text,
"fecha_ingreso" date,
"estatura" real,
"peso" real,
"mano_dominante" text,
"exp_previa" int,
"id_atleta" int
)

create table historial_medico(
"id" serial PRIMARY KEY ,
"tipo_sangre" text,
"alergias" text, 
"condiciones" text,
"medicamentos" text,
"id_atleta" int
)

create table documentos(
"id" serial PRIMARY KEY , 
"path" text,
"observacion" text,
"id_atleta" int
)




ALTER TABLE "clubes_usuarios" ADD FOREIGN KEY ("id_club") REFERENCES "clubes" ("id");

ALTER TABLE "clubes_usuarios" ADD FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id");

ALTER TABLE "clubes_usuarios" ADD FOREIGN KEY ("id_rol") REFERENCES "roles_de_club" ("id");

ALTER TABLE "atletas" ADD FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id");

ALTER TABLE "club_atleta" ADD FOREIGN KEY ("id_club") REFERENCES "clubes" ("id");

ALTER TABLE "club_atleta" ADD FOREIGN KEY ("id_atleta") REFERENCES "atletas" ("id");

ALTER TABLE "formulario_registro_atleta" ADD FOREIGN KEY ("id_club") REFERENCES "clubes" ("id");

ALTER TABLE "usuarios" ADD FOREIGN KEY ("tipo_de_user_id") REFERENCES "tipo_de_user" ("id");

ALTER TABLE "info_depot_atleta" ADD FOREIGN KEY ("id_atleta") REFERENCES "atletas" ("id");
ALTER TABLE "historial_medico" ADD FOREIGN KEY ("id_atleta") REFERENCES "atletas" ("id");
ALTER TABLE "documentos" ADD FOREIGN KEY ("id_atleta") REFERENCES "atletas" ("id");



