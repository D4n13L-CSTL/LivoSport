from .documentation import *
from flask_restx import Resource
from . import services_asistencia

@api.route('')
class AsistenciasClass(Resource):
    @api.expect(asistencia_model)  # Documenta el body esperado
    @api.marshal_with(asistencia_response, code=200, description="Asistencia registrada")
    def post(self):
        """
        Registra la asistencia de un atleta
        """
        data = api.payload
        id_atleta = data.get('id_atleta')
        fecha = data.get('fecha')
        presente = data.get('presente')
        observaciones = data.get('observaciones')
        services_asistencia.pasar_asistencia_services(id_atleta,fecha,presente, observaciones)
        return {'Response':"Registrado correctamente"}
    
