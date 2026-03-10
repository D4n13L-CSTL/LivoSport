from flask import Blueprint, make_response, request, jsonify
from flask_restx import Resource
from .documentation import * 
from . import creacion_de_eventos, obtener_eventos
from flask_jwt_extended import jwt_required


@api.route('')
class GestionarEventos(Resource):
    @api.doc('crear_evento')
    @api.expect(evento_payload, validate=True)
    @api.response(200, 'Evento creado exitosamente', evento_response)
    @api.response(500, 'Error interno del servidor', error_response)
    @jwt_required()
    def post(self):
        """
        Crea un nuevo evento dentro del club.
        
        Requiere los datos básicos del evento: nombre, descripción, fecha, hora e id_tipo.
        """ 
        try:
            data = api.payload
            nombre = data['nombre'] 
            descripcion = data['descripcion'] 
            fecha = data['fecha'] 
            hora = data['hora'] 
            id_tipo = data['id_tipo']
            id_de_evento = creacion_de_eventos.servicio_de_creacion(nombre, descripcion, fecha, hora, id_tipo)
            creacion_de_eventos.servicio_relacion_evento_club(id_de_evento)

            return {'Success':"Evento Registrado Exitosamente"}
        except Exception as e:
            return {"Error":str(e)} , 500
        
    @api.doc('listar_eventos')
    @api.marshal_list_with(evento_model)
    @api.response(500, 'Error interno del servidor', error_response)
    @jwt_required()
    def get(self):
        """
        Retorna la lista de eventos asignados por un club.
        """
        try:
            evento = obtener_eventos.readEventos()
            return make_response(jsonify(evento)) , 200
        except Exception as e:
            return {"Error":str(e)} , 500