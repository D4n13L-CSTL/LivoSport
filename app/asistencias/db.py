from modelClass.BaseDAO import BaseDAO, WriteDAO

class PasarAsistencia(WriteDAO):
    
    def pasar_lista(self, id_atleta,fecha,presente, observaciones):
        
        query = "insert into asistencias (id_atleta,fecha,presente, observaciones) VALUES (%s,%s,%s,%s)"
        
        return self.execute(query, (id_atleta,fecha,presente, observaciones))