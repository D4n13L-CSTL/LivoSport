from modelClass.BaseDAO import WriteDAO, BaseDAO

class RegistroPagos(WriteDAO):
    def insert_pago(self,id_atleta, id_club, monto, fecha_pago, referencia, metodo, comprobante_url, estado, fecha_reporte):
        query = """
        insert into pagos (id_atleta, id_club, monto, fecha_pago, referencia, metodo, comprobante_url, estado, fecha_reporte)
         VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id
        """
        return self.insert_and_return_id(query, (id_atleta, id_club, monto, fecha_pago, referencia, metodo, comprobante_url, estado, fecha_reporte))

    
    def historial(self, id_pago, estado, comentario):
        query = """
            insert into pagos_historial (id_pago, estado, comentario) VALUES (%s,%s,%)
                """

        return self.execute(query ,(id_pago, estado, comentario))