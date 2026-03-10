from flask_restx import fields, Namespace

api = Namespace('Asistencias', description='Gestion de Asistencia', path='/asistencias')


asistencia_model = api.model("AsistenciaInput", {
    "id_atleta": fields.Integer(required=True, description="ID del atleta"),
    "fecha": fields.String(required=True, description="Fecha de la asistencia en formato YYYY-MM-DD"),
    "presente": fields.Boolean(required=True, description="Indica si el atleta estuvo presente"),
    "observaciones": fields.String(required=False, description="Observaciones adicionales")
})

# Modelo de salida (lo que respondes)
asistencia_response = api.model("AsistenciaResponse", {
    "Response": fields.String(description="Mensaje de confirmación")
})