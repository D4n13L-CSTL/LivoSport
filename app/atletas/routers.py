from flask import Blueprint, request, make_response, jsonify
from flask_jwt_extended import decode_token, jwt_required
from flask_restx import  Resource
from .documentation import * 
from . import register_atletas, services_eventos, crud_atleta, atleta_get
from ..auth import auth_user




@api.route('/register')
class Auth(Resource):
    @api.doc('registrar_atleta')
    @api.param('token', 'Token de invitación JWT', required=True)
    @api.expect(registro_payload, validate=True)
    @api.response(201, 'Atleta registrado exitosamente', registro_response)
    @api.response(400, 'Error en datos o no se pudo crear el usuario', error_response_model)
    @api.response(500, 'Error interno del servidor', error_response_model)
    
    def post(self):
        """
        Registra un atleta en un club a partir de un token de invitación.  
        Incluye datos básicos del atleta y respuestas personalizadas del formulario creado por el club.
        """
        try:
            token = request.args.get("token")
            data = request.json  # datos enviados por el atleta (payload dinámico + fijo)

            if not token:
                return {"error": "Falta token"}, 400

        
            # 1. Decodificar token
            claims = decode_token(token)
            id_club = claims["id_club"]

            id_formulario = claims["id_formulario"]

            # 2. Datos básicos del atleta (como en tu otro endpoint)
            nombres = data.get("nombres")
            apellidos = data.get("apellidos")
            cedula = data.get("cedula")
            fecha_nacimiento = data.get("fecha_nacimiento")
            direccion = data.get("direccion")
            telefono = data.get("telefono")
            email = data.get("email")
            username = data.get("username").upper()
            password = data.get("password")

            # 3. Crear usuario y atleta
            id_tipo_de_user = 2
            users_atleta = auth_user.user_create(username, email, password, id_tipo_de_user)

            if not users_atleta:
                return {"Error": "No se pudo crear el usuario"}, 400

            id_atleta = register_atletas.register_atleta(
                users_atleta, nombres, apellidos, cedula, fecha_nacimiento,
                direccion, telefono, email
            )
            # 4. Relacionar atleta con el club
            register_atletas.inscripcion_de_atleta(id_atleta, id_club)

            # 5. Guardar respuestas personalizadas del formulario
                #PARA GUARDAR LAS RESPUESTA DEL FORMULARIO EN OTRA TABLA 
            respuestas_formulario = data.get("respuestas", {})
            register_atletas.guardar_informacion_de_atleta(id_atleta, id_formulario,respuestas_formulario)
            return {
                    "success": "Atleta registrado exitosamente",
                    "id_atleta": id_atleta,
                    "id_club": id_club
            }, 201

        except Exception as e:
            return {"error": str(e)}, 500
        

@api.route('/eventos')
class Eventos(Resource):
    @api.doc('get_eventos_asignados')
    @api.marshal_list_with(evento_model)  # Indica que devuelve una lista de eventos
    @jwt_required()
    def get(self):
        """
        Retorna la lista de eventos asignados a un club
        """
        eventos  = services_eventos.ver_eventos_asignados()
        return make_response(jsonify(eventos))



@api.route('/registro_atleta')
class CrudRegistroAtleta(Resource):
    def post(self):
        datos = api.payload
        username = datos.get('username')
        password = datos.get('password') 

        nombre = datos.get('firstName')
        apellido = datos.get('lastName')
        tipo_documento = datos.get('documentType')
        n_documento = datos.get('documentNumber')
        fecha_nacimiento = datos.get('birthDate')
        genero = datos.get('gender')
        direccion = datos.get('address')
        telefono = datos.get('phone')
        email = datos.get('email')
        contacto_emergencia = datos.get('emergencyContact')
        telef_emergencia = datos.get('emergencyPhone')

        tipo_sangre = datos.get('bloodType')
        alergias = datos.get('allergies')
        condiciones = datos.get('medicalConditions')
        medicamentos = datos.get('medications')

        categoria = datos.get('team')
        posicion = datos.get('position')
        dorsal = datos.get('jerseyNumber')
        fecha_ingreso = datos.get('joinDate')
        estatura = datos.get('height')
        peso = datos.get('weight')
        mano_dominante = datos.get('dominantHand')
        exp_previa = datos.get('experience')
        crud_atleta.usuario_atleta_service(username, email,password,nombre, apellido, tipo_documento, n_documento, 
                                           fecha_nacimiento, genero, direccion, telefono, contacto_emergencia, 
                                           telef_emergencia,tipo_sangre,alergias,condiciones,medicamentos,categoria,posicion,dorsal,fecha_ingreso,estatura,peso, mano_dominante, exp_previa )
        

        return make_response(jsonify({"Prueba":"PRUEBA"}))
    


@api.route('/obtener_atletas')
class ObtenerAtletas(Resource):
    def get(self):

        return make_response(jsonify(atleta_get.ver_atletas()))