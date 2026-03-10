from flask_restx import Resource
from .documentation import *
from . import realizar_pago, visualizacion_de_pagos_services, cambio_de_estatus_services, historial_services
from flask import make_response, jsonify
from flask_jwt_extended import jwt_required

@api.route('/reportar_pago')
class  GestionPago(Resource):
    @api.expect(pago_input)
    @api.marshal_with(pago_response, code=200, description="Pago reportado correctamente")
    @jwt_required()
    def post(self):
        """Reportar un pago desde el atleta"""
        data = api.payload
        id_club = data.get('id_club')
        monto = data.get('monto')
        fecha_pago = data.get('fecha_pago')
        referencia = data.get('referencia')
        id_metodo = data.get('id_metodo')
        comentario = data.get('comentario')
        pago  = realizar_pago.reporte_de_pago(id_club, monto, fecha_pago, referencia,id_metodo)
        historial_services.guardar_historial(pago, 'REPORTADO' ,comentario )
        return {"Sucess":"Pago Reportado"}


@api.route('/ver_pagos')
class VisualizacionDePago(Resource):
    @api.marshal_with(pago_list_response, code=200, description="Lista de pagos pendientes")
    @jwt_required()
    def get(self):
        """ Ver pagos pendientes """
        pagos_pendientes  = visualizacion_de_pagos_services.pagos_pendientes()
        return make_response(jsonify(pagos_pendientes))
        
    
    
@api.route('/update_status')
class CambioDeStatusRoutes(Resource):
    @api.expect(pago_update_input)
    @api.marshal_with(pago_response, code=200, description="Estado del pago actualizado correctamente")
    @jwt_required()
    def put(self):
        """Cambiar estado del pago reportado"""
        data = api.payload
        estado  = data.get('estado')
        id_de_pago = data.get('id_de_pago')
        comentario = data.get('comentario')
        pago = cambio_de_estatus_services.cambiarde_estatus_el_pago(estado, id_de_pago)
        historial_services.guardar_historial(pago, 'ACTUALIZADO' ,comentario )
        return {"Sucess":"Pago Actualizado"}