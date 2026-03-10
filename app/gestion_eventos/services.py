from flask import request
from datetime import date, time

class EventosBase:
    def __init__(self, evento):
        self.evento  = evento

class EventosServicesWrite(EventosBase):

    def __init__(self, evento):
        super().__init__(evento)

    def servicio_de_creacion(self, nombre, descripcion, fecha, hora, id_tipo):
        return self.evento.crear_un_evento(nombre, descripcion, fecha, hora, id_tipo)
  
    def servicio_relacion_evento_club(self, id_evento):
        id_club = request.cookies.get("id_club_cookie")
        return self.evento.relacion_evento_club(id_club,id_evento)
    

class EventosServicesRead(EventosBase):
    def __init__(self, evento):
        super().__init__(evento)
    
    def readEventos(self):
        id_club = request.cookies.get("id_club_cookie")
        rows = self.evento.obtener_eventos(id_club)
        eventos = []
        for row in rows:
            eventos.append({
                "nombre": row["nombre"],
                "descripcion": row["descripcion"],
                "fecha": row["fecha"].isoformat() if isinstance(row["fecha"], date) else row["fecha"],
                "hora": row["hora"].strftime("%H:%M:%S") if isinstance(row["hora"], time) else row["hora"],
                "tipo_evento": row["nombre"] if "tipo_evento" not in row else row["tipo_evento"]
            })
        
        return eventos
    