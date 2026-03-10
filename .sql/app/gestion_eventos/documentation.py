from flask_restx import fields, Namespace

api = Namespace('Eventos', description='Gestión de Eventos', path='/eventos')


# Modelo de payload para crear evento
evento_payload = api.model('EventoPayload', {
    'nombre': fields.String(required=True, description='Nombre del evento'),
    'descripcion': fields.String(required=True, description='Descripción del evento'),
    'fecha': fields.String(required=True, description='Fecha del evento (YYYY-MM-DD)'),
    'hora': fields.String(required=True, description='Hora del evento (HH:MM)'),
    'id_tipo': fields.Integer(required=True, description='ID del tipo de evento')
})

# Modelo de respuesta exitosa
evento_response = api.model('EventoResponse', {
    'Success': fields.String(description='Mensaje de confirmación')
})

# Modelo de error
error_response = api.model('ErrorResponse', {
    'Error': fields.String(description='Mensaje de error')
})


evento_model = api.model('Evento', {
    'nombre': fields.String(required=True, description='Nombre del evento'),
    'descripcion': fields.String(required=True, description='Descripción del evento'),
    'fecha': fields.String(required=True, description='Fecha del evento en formato YYYY-MM-DD'),
    'hora': fields.String(required=True, description='Hora del evento en formato HH:MM:SS'),
    'tipo_evento': fields.String(required=True, description='Tipo de evento')
})