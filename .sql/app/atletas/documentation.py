from flask_restx import fields, Namespace

api = Namespace('Atletas', description='Gestion de atletas', path='/atletas')

# Modelo de payload esperado (lo que se envía en el body del POST)
# Modelo de respuestas dinámicas del formulario
respuestas_model = api.model('RespuestasFormulario', {
    'campo1': fields.String(description='Valor de un campo dinámico definido por el club'),
    'campo2': fields.String(description='Otro campo dinámico definido por el club')
    # ⚠️ Nota: Esto es ilustrativo, en producción los campos pueden variar
})

# Modelo del payload de registro
registro_payload = api.model('RegistroAtletaPayload', {
    'nombres': fields.String(required=True, description='Nombres del atleta'),
    'apellidos': fields.String(required=True, description='Apellidos del atleta'),
    'cedula': fields.String(required=True, description='Número de cédula del atleta'),
    'fecha_nacimiento': fields.String(required=True, description='Fecha de nacimiento (YYYY-MM-DD)'),
    'direccion': fields.String(required=True, description='Dirección del atleta'),
    'telefono': fields.String(required=True, description='Teléfono del atleta'),
    'email': fields.String(required=True, description='Correo electrónico'),
    'username': fields.String(required=True, description='Usuario para login'),
    'password': fields.String(required=True, description='Contraseña'),
    'respuestas': fields.Nested(respuestas_model, description='Respuestas dinámicas del formulario', required=False)
})

# Modelo de respuesta exitosa
registro_response = api.model('RegistroResponse', {
    'success': fields.String(description='Mensaje de éxito'),
    'id_atleta': fields.Integer(description='ID del atleta creado'),
    'id_club': fields.String(description='ID del club asociado')
})

# Modelo de error
error_response_model = api.model('ErrorResponse', {
    'error': fields.String(description='Mensaje de error')
})





evento_model = api.model('Evento', {
    'nombre': fields.String(required=True, description='Nombre del evento'),
    'descripcion': fields.String(required=True, description='Descripción del evento'),
    'fecha': fields.String(required=True, description='Fecha del evento en formato YYYY-MM-DD'),
    'hora': fields.String(required=True, description='Hora del evento en formato HH:MM:SS'),
    'tipo_evento': fields.String(required=True, description='Tipo de evento')
})