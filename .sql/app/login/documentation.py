from flask_restx import fields, Namespace

api = Namespace('Login', description='Login', path='/')

payload_login = api.model('Login', {
    "username": fields.String(required=True, description="Nombre de usuario"),
    "password": fields.String(required=True, description="Contraseña del usuario")
})

respuesta_success = api.model('RespuestaSuccess', {
    "Success": fields.Boolean(description="Estado de autenticación")
})

respuesta_error = api.model('RespuestaError', {
    "Auth": fields.String(description="Mensaje de error")
})
