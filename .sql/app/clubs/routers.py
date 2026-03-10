from flask import Blueprint, make_response, jsonify, request
from flask_restx import Resource
from .documentation import * 
from . import gestion_club, formularios_registrados, link_generate_inscripcion, atletas_logic
from ..auth import auth_user
from flask_jwt_extended import decode_token, jwt_required




@api.route('/register')
class ClubRest(Resource):
    @api.expect(payload_club, validate=True)
    @api.response(200, 'Club registrado correctamente', respuesta_success)
    @api.response(400, 'Error en los datos enviados', respuesta_error)
    @api.response(500, 'Error interno del servidor', respuesta_error)
    def post(self):
        """Registro de un club con su usuario administrador"""
        try:
            data = api.payload

            nombre = data["nombre_de_club"]
            administrador = data["nombre_administrador"]
            email = data["email_club"]
            telefono = data["telefono_club"]
            username = data['username'].upper()
            password = data['password']

            club_register = gestion_club.register_club_id(nombre, administrador, email, telefono)
            if not club_register:
                return {"Error": "Club no registrado"}, 400

            id_tipo_user = 1
            club_user_register = auth_user.user_create(username, email, password, id_tipo_user)
            if not club_user_register:
                return {"Error": "Usuario del club no registrado"}, 400

            
            rol_de_club = 1
            gestion_club.register_user_club_class(club_user_register, club_register, rol_de_club)

            return {"Succes": "Club registrado correctamente"}, 200
        
        except Exception as e:
            return {"Error": str(e)}, 500
    

@api.route('/formulario')
class FormularioClub(Resource):
    @api.expect(payload_formulario)
    @api.response(200, 'Formulario creado correctamente', respuesta_formulario_success)
    @api.response(500, 'Error interno', respuesta_formulario_error)
    @jwt_required()
    def post(self):
        """Crea un formulario de inscripción para un club.

        Recibe un JSON con:
        - `id_club`: ID del club.
        - `formulario`: diccionario dinámico con los campos y tipos de datos del formulario.
        """
        try:
            data = api.payload
            formulario_data = data.get('formulario')  

            gestion_club.formulario_inscripcion(formulario_data)
            return {"Response":"Formulario creado correctamente"} , 200
        
        except Exception as e:
            return {"Error":str(e)} , 500


@api.route('/formulario/obtener')
class VerFormularioClub(Resource):
    @api.response(200, 'Formulario del club', payload_formulario)
    @api.response(500, 'Error interno', respuesta_formulario_error)
    @jwt_required()
    def get(self):
        """Obtiene el formulario de inscripción de un club por su ID."""
        
        club_formulario = formularios_registrados.ver_formularios()
        return make_response(jsonify(club_formulario))
        
        


@api.route('/formulario/<int:id_formulario>/invitacion')
class GenerarLinkInscripcion(Resource):
    @api.doc('generar_link_inscripcion')
    @api.response(200, 'Link generado exitosamente', link_response_model)
    @api.response(500, 'Error al generar el link', error_response_model)
    @jwt_required()
    def post(self,id_formulario):
        """
        Genera un link de inscripción para un formulario específico.  
        El link contiene un token de seguridad (JWT).
        """
        try:
            id_club = request.cookies.get("id_club_cookie")
            print(id_club)
            link  = link_generate_inscripcion.generar_link(id_club, id_formulario)
            return {"Link":link}      
        except Exception as e:
            return {"Error":str(e)} , 500
        


@api.route('/registro_atleta')
class obtener_formulario(Resource):
    @api.doc('obtener_formulario')
    @api.param('token', 'Token de seguridad JWT', required=True)
    @api.response(200, 'Formulario obtenido exitosamente', formulario_response_model)
    @api.response(400, 'Token inválido o error de validación', error_response_model)
    @api.response(404, 'Formulario no encontrado', error_response_model)
    @jwt_required()
    def get(self):
        """
        Obtiene un formulario de inscripción a partir de un token JWT.
        No requiere que el usuario esté autenticado.
        """
        token = request.args.get("token")
        if not token:
            return {"error": "Falta token"}, 400

        try:
            # Decodificamos sin necesidad de que sea un usuario logueado
            data = decode_token(token)
            id_club = data["id_club"]
            id_formulario = data["id_formulario"]

            # Buscar el formulario
            formulario = formularios_registrados.formulario_for_id(id_club, id_formulario)
            if not formulario:
                return {"error": "Formulario no encontrado"}, 404

            return {"formulario": formulario, "id_club": id_club}, 200

        except Exception as e:
            return {"error": str(e)}, 400
        


    @api.route('/atletas')
    class ObtenerAtletas(Resource):
        @api.doc('get_atletas')
        @api.response(200, 'Lista obtenida correctamente', atletas_response_model)
        @api.response(500, 'Error interno del servidor')
        @jwt_required()
        def get(self):
            """
            Retorna la lista de atletas registrados
            """
            atleta = atletas_logic.obtener_lista_atletas()
            try:
                return {"atletas": atleta}, 200
            except Exception as e:
                return {"Error": str(e)}, 500