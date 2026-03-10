from flask import request
from datetime import time, date




class Atletas:
    def __init__(self, atleta):
        self.atleta = atleta
        
    def register_atleta(self,users_atleta,nombres,apellidos,cedula,fecha_nacimiento, direccion,telefono, email):
        return self.atleta.register_atleta(users_atleta,nombres,apellidos,cedula,fecha_nacimiento, direccion,telefono, email)
    
    def inscripcion_de_atleta(self,id_atleta, id_club):
        return self.atleta.inscripcion_atleta_club(id_atleta, id_club)

    def guardar_informacion_de_atleta(self,id_atleta,id_formulario,respuestas):

        return self.atleta.register_informacion_atleta(id_atleta,id_formulario,respuestas)
    

class ServicesEventos():
    def __init__(self, atleta):
        self.atleta = atleta
    
    def ver_eventos_asignados(self):
        id_club_for_atleta = request.cookies.get("id_club_atleta_cookie")

        rows = self.atleta.verEventos(id_club_for_atleta)

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
        