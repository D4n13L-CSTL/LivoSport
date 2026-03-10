from modelClass.BaseDAO import WriteDAO, BaseDAO
import json

class Clubes(WriteDAO):

    def register_club(self,nombre, administrador, email,telefono):

        query = """
        INSERT INTO clubes (nombre, administrador, email,telefono) VALUES (%s,%s,%s,%s) RETURNING id
                    """

        return self.insert_and_return_id(query, (nombre, administrador, email,telefono))
    
    def register_user_club(self,id_usuario, id_club, id_rol):
        query = """
                INSERT INTO clubes_usuarios (id_usuario, id_club, id_rol) VALUES (%s,%s,%s)
            """
        return self.execute(query, (id_usuario, id_club, id_rol))


    def crear_formulario_de_inscripcion(self, formulario: dict, id_club: int):
        query = """
            insert into formulario_registro_atleta (formulario, id_club) VALUES (%s,%s)
        """
        return self.execute(query, (json.dumps(formulario), id_club))
    

class VerFormularios(BaseDAO):

    def formulario_club(self, id_club):
        query = """
                select id as id_form, formulario from formulario_registro_atleta where id_club = %s
                """
    
        return self.fetch_all(query,(id_club,))

    def formulario_x_id_and_id_club(self, id_club, id_formulario):
        query = """
        SELECT formulario
        FROM formulario_registro_atleta
        WHERE id_club = %s AND id = %s;

        """
        return self.fetch_all(query,  (id_club, id_formulario))
  
  
class ListaAtletas(BaseDAO):
    def lista_atletas(self, id_club):
    
        query = """
                SELECT 
                a.id AS id_atleta,
                a.nombres AS nombre_atleta,
                a.email AS correo
            FROM atletas a
            INNER JOIN club_atleta ca ON a.id = ca.id_atleta
            INNER JOIN clubes c ON ca.id_club = c.id
            WHERE c.id = %s

        """
        return self.fetch_all(query, (id_club,))
