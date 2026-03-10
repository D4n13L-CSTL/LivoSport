
class AsistenciaService:
    def __init__(self, asistencia):
        self.asistencia = asistencia
        
    def pasar_asistencia_services(self,id_atleta,fecha,presente, observaciones):
        
        return self.asistencia.pasar_lista(id_atleta,fecha,presente, observaciones)