from flask_restx import Resource
from .documentation import *
from flask import make_response, jsonify
from flask_jwt_extended import jwt_required
from . import service_pago

#ARMAR EL ENDPOINT PARA HACER LA PETICION

pago_model = api.model('Pago', {
    'id_atleta': fields.Integer(required=True, description='ID del atleta'),
    'id_club': fields.Integer(required=True, description='ID del club'),
    'monto': fields.Float(required=True, description='Monto del pago'),
    'fecha_pago': fields.String(required=True, description='Fecha del pago (YYYY-MM-DD)'),
    'referencia': fields.String(required=True, description='Número de referencia bancaria'),
    'metodo': fields.String(required=True, description='Método de pago (Transferencia, Efectivo, etc.)'),
    'comprobante_url': fields.String(description='URL del comprobante subido'),
    'estado': fields.String(default='pendiente', description='Estado del pago'),
    'comentario': fields.String(description='Observaciones adicionales'),
    'concepto': fields.String(description='Concepto')
})

@api.route('/registrar_pago')
class RoutePagos(Resource):
    @api.expect(pago_model)
    def post(self):
        datos = api.payload
        service_pago.service_register_pago(datos)

        return {
            "mensaje": "Pago registrado con éxito",
            "data": datos
        },

    def get(self):

        pagos = service_pago.ver_pagos()
        return make_response(jsonify(pagos))