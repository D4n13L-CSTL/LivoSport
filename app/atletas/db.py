from modelClass.BaseDAO import BaseDAO,WriteDAO
import json

class WriteAleta(WriteDAO):
    def register_atleta(self, id_usario,nombres,apellidos,cedula,fecha_nacimiento, direccion,telefono, email):
        query = """
                INSERT INTO atletas (id_usuario,nombres,apellidos,cedula,fecha_nacimiento, direccion,telefono, email)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id
                    """
        return self.insert_and_return_id(query,(id_usario,nombres,apellidos,cedula,fecha_nacimiento, direccion,telefono, email))
    
    def inscripcion_atleta_club(self,id_atleta, id_club):
        query = """
                insert into club_atleta (id_atleta, id_club) values (%s,%s)
                """
        return self.execute(query, (id_atleta, id_club))


    def register_informacion_atleta(self, id_atleta,id_formulario,respuestas):
        query = """
                insert into respuestas_formulario_atleta  (id_atleta,id_formulario,respuestas) values (%s,%s,%s)
            
                """
        return self.execute(query, (id_atleta,id_formulario,json.dumps(respuestas)))
    

class VerEventosAsignados(BaseDAO):
    def verEventos(self, id_club):
        query = """
                select eventos.nombre, eventos.descripcion, eventos.fecha, eventos.hora ,tipo_eventos.nombre  from eventos
                join eventos_club on eventos.id_evento  = eventos_club.id_evento
                join tipo_eventos on tipo_eventos.id_tipo = eventos.id_tipo
                join clubes on clubes.id = eventos_club.id_club
                where clubes.id = %s
                """
        
        return self.fetch_all(query, (id_club,))

#//////////////////////////////////////////////////////////////////////
#//////////////////////////////////////////////////////////////////////
#//////////////////////////////////////////////////////////////////////
class RegistraAtleta(WriteDAO):
    
    def registro_basic(self,id_usuario, nombre, apellido, tipo_documento, n_documento, 
            fecha_nacimiento, genero, direccion, telefono, email, 
            contacto_emergencia, telef_emergencia):
        query = """
        INSERT INTO atletas (
             id_usuario, nombre, apellido, tipo_documento, n_documento, 
            fecha_nacimiento, genero, direccion, telefono, email, 
            contacto_emergencia, telef_emergencia
        ) VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;
        """

        return self.insert_and_return_id(query, (id_usuario, nombre, apellido, tipo_documento, n_documento, 
            fecha_nacimiento, genero, direccion, telefono, email, 
            contacto_emergencia, telef_emergencia))



    def registro_historial_medico(self,tipo_sangre,alergias, condiciones, medicamentos, id_atleta):


        sql_insert_medico = """
            INSERT INTO historial_medico (
                
                tipo_sangre, 
                alergias, 
                condiciones, 
                medicamentos, 
                id_atleta
            ) 
            VALUES (%s, %s, %s, %s, %s);
            """
        return self.execute(sql_insert_medico, (tipo_sangre,alergias, condiciones, medicamentos, id_atleta))


    def registro_informacion_deportiva(self,categoria,posicion,dorsal,fecha_ingreso,estatura,peso, mano_dominante,  exp_previa, id_atleta):
        sql_insert_atleta_detalles = """
            INSERT INTO info_depot_atleta (
                categoria, 
                posicion, 
                dorsal, 
                fecha_ingreso, 
                estatura, 
                peso, 
                mano_dominante, 
                exp_previa, 
                id_atleta
            ) 
            VALUES (
                %s, 
                %s, 
                %s, 
                %s, 
                %s, 
                %s, 
                %s, 
                %s, 
                %s
            );
            """
        return self.execute(sql_insert_atleta_detalles,(categoria,posicion,dorsal,fecha_ingreso,estatura,peso, mano_dominante,  exp_previa, id_atleta))

    def update_atleta(self,id_atleta, datos):
        columnas = [f"{key} = %s" for key in datos.keys()]
        set_query = ", ".join(columnas)
        print(set_query)
        valores = list(datos.values())
        valores.append(id_atleta)
        sql = f"UPDATE atletas SET {set_query} WHERE id = %s"
        self.execute(sql,tuple(valores))


    def update_info_deportiva(self, id_atleta, datos):
        columnas = [f"{key} = %s" for key in datos.keys()]
        set_query = ", ".join(columnas)
        valores = list(datos.values())
        valores.append(id_atleta)
        # Ajuste estándar si la tabla usa id_atleta como llave:
        sql = f"UPDATE info_depot_atleta SET {set_query} WHERE id_atleta = %s"
        self.execute(sql, tuple(valores))
    

    def update_historial_medico(self, id_historial, datos):
        columnas = [f"{key} = %s" for key in datos.keys()]
        set_query = ", ".join(columnas)
        valores = list(datos.values())
        valores.append(id_historial)
        sql = f"UPDATE historial_medico SET {set_query} WHERE id = %s"
        self.execute(sql, tuple(valores))

    def update_usuario(self, id_usuario, datos):
        columnas = [f"{key} = %s" for key in datos.keys()]
        set_query = ", ".join(columnas)
        valores = list(datos.values())
        valores.append(id_usuario)
        sql = f"UPDATE usuarios SET {set_query} WHERE id = %s"
        self.execute(sql, tuple(valores))


class ObtenerAtletas(BaseDAO):

    def atletas_generales(self):
        query = """
            Select * from atletas a 
            join usuarios on  a.id_usuario = usuarios.id
            join info_depot_atleta on info_depot_atleta.id_atleta = a.id
            join historial_medico on historial_medico.id_atleta = a.id
            where a.is_player = true
        """
        return self.fetch_all(query)
    
