# Configuración o modelos del módulo
from modelClass.BaseDAO import BaseDAO, WriteDAO

class Mensualidad(BaseDAO):

    def ver_mensualidad(self, id_club ):
        query  = """
                select * from mensualidad_club
                join clubes on mensualidad_club.id_club = clubes.id
                where clubes.id = %s

                """
        return self.fetch_all(query, (id_club,))
    
    