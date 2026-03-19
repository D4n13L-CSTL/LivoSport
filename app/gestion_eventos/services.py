


class EventosServicesWrite:
    def __init__(self, eventos):
        self.eventos = eventos

    def servicio_de_creacion(self, datos):

        return self.eventos.crear_un_evento(datos)
  

    def ver_eventos(self, id_club):
        eventos = self.eventos.obtener_eventos(id_club) 
        eventos_limpios = []
       
        for e in eventos:
            eventos_limpios.append({
                "id":e.get('id'),
                "titulo": e.get('titulo'),
                "tipo": e.get('tipo'),
                "fecha": str(e.get('fecha')) if e.get('fecha') else None,
                "ubicacion": e.get('ubicacion'),
                "equipo": e.get('equipo'),
                "descripcion": e.get('descripcion'),
                "hora_ini": str(e.get('hora_ini')) if e.get('hora_ini') else None,
                "hora_fin": str(e.get('hora_fin')) if e.get('hora_fin') else None,
                "id_club": e.get('id_club')
            })
            
        return eventos_limpios 