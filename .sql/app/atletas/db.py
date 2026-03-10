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