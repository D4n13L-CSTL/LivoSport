from flask_jwt_extended import create_access_token
from flask import request
from datetime import timedelta

class ClubBase:
    def __init__(self, clubs):
        self.club  = clubs


class Clubs(ClubBase):
    def __init__(self, clubs):
        super().__init__(clubs)

    def register_club_id(self,nombre, administrador, email,telefono):
        return self.club.register_club(nombre, administrador, email,telefono)
    
    def register_user_club_class(self,id_usuario, id_club, id_rol):
        return self.club.register_user_club(id_usuario, id_club, id_rol)
    
    def formulario_inscripcion(self, formulario):
        id_club = request.cookies.get("id_club_cookie")
        return self.club.crear_formulario_de_inscripcion(formulario,id_club)
    

class ObtenerFormulario(ClubBase):
    def __init__(self, clubs):
        super().__init__(clubs)

    def ver_formularios(self):
        id_club = request.cookies.get("id_club_cookie")
        print(id_club)
        return self.club.formulario_club(id_club)

    def formulario_for_id(self,id_club, id_formulario):

        return self.club.formulario_x_id_and_id_club(id_club, id_formulario)


class InvitacionService:
    def __init__(self, formulario_dao: ObtenerFormulario):
        self.formulario_dao = formulario_dao

    def generar_link(self, id_club: int, id_formulario: int):
        # Validar que el formulario existe en ese club
        formulario = self.formulario_dao.formulario_for_id(id_club, id_formulario)
        if not formulario:
            raise ValueError("El formulario no existe o no pertenece al club")

        # Crear token con claims
        claims = {"id_club": id_club, "id_formulario": id_formulario}
        token = create_access_token(
            identity="invitacion",
            additional_claims=claims,
            expires_delta=timedelta(days=7)
        )

        #Retornar link
        return f"https://livo-flask.onrender.com/club/v1/api/registro_atleta?token={token}"
    

class LogicAtletas(ClubBase):
    def __init__(self, clubs):
        super().__init__(clubs)
        
    def obtener_lista_atletas(self):
        try:
            id_club = request.cookies.get("id_club_cookie")
            return self.club.lista_atletas(id_club)
        except Exception as e:
            return {'Error': str(e)},  500