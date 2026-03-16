


class ServiceRegistrarPago:
    def __init__(self, pagos):
        self.pagos = pagos

    def service_register_pago(self,id_atleta, id_club, monto, fecha_pago, referencia, metodo, comprobante_url, estado, fecha_reporte, comentario):
        
        pago_registro = self.pagos.insert_pago(id_atleta, id_club, monto, fecha_pago, referencia, metodo, comprobante_url, estado, fecha_reporte)

        historial = self.pagos.historial(pago_registro,estado ,comentario)

        return {"True":True}