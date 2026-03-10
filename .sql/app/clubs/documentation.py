from flask_restx import fields, Namespace

api = Namespace('Clubes', description='Gestión de clubes', path='/club')

# Payload esperado para registrar un club
payload_club = api.model('RegistroClub', {
    "nombre_de_club": fields.String(required=True, description="Nombre del club"),
    "nombre_administrador": fields.String(required=True, description="Nombre del administrador"),
    "email_club": fields.String(required=True, description="Correo electrónico del club"),
    "telefono_club": fields.String(required=True, description="Teléfono del club"),
    "username": fields.String(required=True, description="Usuario administrador del club"),
    "password": fields.String(required=True, description="Contraseña del usuario administrador")
})

# Respuestas
respuesta_success = api.model('RespuestaRegistroClubSuccess', {
    "Succes": fields.String(description="Mensaje de éxito")
})

respuesta_error = api.model('RespuestaRegistroClubError', {
    "Error": fields.String(description="Mensaje de error")
})


#/////////////////////////
# Payload esperado para el formulario dinámico
payload_formulario = api.model('Formulario', {
    'id_club': fields.Integer(required=True, description='ID del club al que pertenece el formulario'),
    'formulario': fields.Raw(required=True, description='Diccionario dinámico con pares clave:valor del formulario')
})

# Respuesta exitosa al crear formulario
respuesta_formulario_success = api.model('FormularioSuccess', {
    'Response': fields.String(description='Mensaje de éxito')
})

# Respuesta de error
respuesta_formulario_error = api.model('ErrorResponse', {
    'Error': fields.String(description='Mensaje de error')
})



atleta_model = api.model('Atleta', {
    'id_atleta': fields.Integer(required=True, description='ID del atleta'),
    'nombre_atleta': fields.String(required=True, description='Nombre completo del atleta'),
    'correo': fields.String(required=True, description='Correo electrónico del atleta')
})

# Modelo de la respuesta que envuelve la lista
atletas_response_model = api.model('AtletasResponse', {
    'atletas': fields.List(fields.Nested(atleta_model), description='Lista de atletas')
})



link_response_model = api.model('LinkResponse', {
    'Link': fields.String(
        required=True, 
        description='URL de inscripción generada con token JWT'
    )
})

# Modelo de error
error_response_model = api.model('ErrorResponse', {
    'Error': fields.String(description='Mensaje de error')
})




# Modelo del formulario dinámico (ejemplo)
formulario_fields = api.model('FormularioFields', {
    'edad': fields.String(description='Campo edad (tipo int)'),
    'activo': fields.String(description='Campo activo (tipo bool)'),
    'cedula': fields.String(description='Campo cédula (tipo int)'),
    'correo': fields.String(description='Campo correo (tipo str)'),
    'nombre': fields.String(description='Campo nombre (tipo str)'),
    'direccion': fields.String(description='Campo dirección (tipo str)')
})

# Modelo de la respuesta exitosa
formulario_response_model = api.model('FormularioResponse', {
    'formulario': fields.List(fields.Nested(api.model('FormularioWrapper', {
        'formulario': fields.Nested(formulario_fields)
    }))),
    'id_club': fields.String(description='ID del club asociado al formulario')
})

# Modelo de error
error_response_model = api.model('ErrorResponse', {
    'error': fields.String(description='Mensaje de error')
})