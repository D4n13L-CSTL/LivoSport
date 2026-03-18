from flask import Blueprint, make_response, request, jsonify, session
from flask_restx import Resource
from .documentation import * 
from . import creacion_de_eventos
from flask_jwt_extended import jwt_required

evento_model = api.model('Evento', {
    'titulo': fields.String(required=True, description='Título del evento'),
    'tipo': fields.String(required=True, description='Categoría del evento'),
    'fecha': fields.Date(required=True, description='Fecha (YYYY-MM-DD)'),
    'ubicacion': fields.String(required=True, description='Lugar del encuentro'),
    'equipo': fields.String(description='Equipo participante'),
    'descripcion': fields.String(description='Detalles adicionales'),
    'hora_ini': fields.DateTime(required=True, description='Hora de inicio (HH:MM)'),
    'hora_fin': fields.DateTime(required=True, description='Hora de finalización (HH:MM)'),
    'id_club': fields.Integer(required=True, description='ID único del club')
})

@api.route('/')
class EventoList(Resource):
    @api.expect(evento_model)
    def post(self):
        data = api.payload
        creacion_de_eventos.servicio_de_creacion(data)
        print(f"Recibido: {data['titulo']} para el club {data['id_club']}")
        
        return {"message": "Evento guardado", "data": data}, 201




@api.route('/ver/')

class EventoList(Resource):
    def get(self):
        id_club = session.get('id_club')
        eventos = creacion_de_eventos.ver_eventos(id_club)
        print(eventos)
        print(id_club)
        return eventos