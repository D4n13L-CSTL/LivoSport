from flask_restx import fields, Namespace

api = Namespace('Gestion de Pagos', description='Gestión de Pagos', path='/pagos')


# Modelo para reportar un pago (entrada)
pago_input = api.model("PagoInput", {
    "id_club": fields.Integer(required=True, description="ID del club"),
    "monto": fields.Float(required=True, description="Monto del pago"),
    "fecha_pago": fields.String(required=True, description="Fecha del pago (YYYY-MM-DD)"),
    "referencia": fields.String(required=True, description="Referencia de la transacción"),
    "id_metodo": fields.Integer(required=True, description="ID del método de pago"),
    "comentario": fields.String(required=False, description="Comentario adicional del pago")
})

# Modelo de respuesta genérica (para reportar/actualizar)
pago_response = api.model("PagoResponse", {
    "Sucess": fields.String(description="Mensaje de confirmación")
})

# Modelo de visualización de pagos (ejemplo simplificado)
pago_item = api.model("PagoItem", {
    "id_pago": fields.Integer(description="ID del pago"),
    "id_club": fields.Integer(description="ID del club"),
    "monto": fields.Float(description="Monto del pago"),
    "fecha_pago": fields.String(description="Fecha del pago"),
    "referencia": fields.String(description="Referencia de la transacción"),
    "estado": fields.String(description="Estado actual del pago"),
})

# Respuesta de lista de pagos
pago_list_response = api.model("PagoListResponse", {
    "pagos": fields.List(fields.Nested(pago_item), description="Lista de pagos pendientes")
})

# Modelo para actualizar estado de un pago
pago_update_input = api.model("PagoUpdateInput", {
    "estado": fields.String(required=True, description="Nuevo estado del pago (ej. 'APROBADO', 'RECHAZADO')"),
    "id_de_pago": fields.Integer(required=True, description="ID del pago a actualizar"),
    "comentario": fields.String(required=False, description="Comentario del cambio de estado")
})