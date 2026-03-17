# Configuración o modelos del módulo
from modelClass.BaseDAO import BaseDAO, WriteDAO

class ClubUtils(BaseDAO):

    def club_perte(self, cedula ):
        query  = """
                SELECT  atletas.id as id_atleta,clubes.id,clubes.nombre FROM public.club_atleta
                join clubes on clubes.id = club_atleta.id_club
                join atletas on atletas.id = club_atleta.id_atleta
                where atletas.n_documento = %s
                """
        return self.fetch_all(query, (cedula,))
    
