from flask import request
from datetime import time, date
from utils.register_user import User



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
        

#////////////////////////////////////////////////////////////////
#////////////////////////////////////////////////////////////////
class ServiceRegistrarAtletas:
    
    def __init__(self, atletasDBO, usuario):
        self.atletasDBO  = atletasDBO
        self.registro_user = usuario

    def usuario_atleta_service(self,username, email, password,nombre, apellido, tipo_documento, n_documento, 
            fecha_nacimiento, genero, direccion, telefono, 
            contacto_emergencia, telef_emergencia,tipo_sangre,alergias,condiciones,medicamentos,categoria,posicion,dorsal,fecha_ingreso,estatura,peso, mano_dominante,  exp_previa):
        
        usuario = self.registro_user.user_create(username,email,password)

        atleta = self.atletasDBO.registro_basic(usuario,nombre, apellido, tipo_documento, n_documento,fecha_nacimiento, genero, direccion, telefono, email, contacto_emergencia, telef_emergencia)
        historial_medico = self.atletasDBO.registro_historial_medico(tipo_sangre,alergias,condiciones,medicamentos,atleta)
        informacion_deportiva = self.atletasDBO.registro_informacion_deportiva(categoria,posicion,dorsal,fecha_ingreso,estatura,peso, mano_dominante,exp_previa, atleta)
        return 
    




    

class ServicesObtenerAtletas:
    def __init__(self, atletas):
        self.atletas = atletas

    def ver_atletas(self):
        
        return self.atletas.atletas_generales()
        
