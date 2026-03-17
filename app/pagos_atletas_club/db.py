from modelClass.BaseDAO import WriteDAO, BaseDAO

class RegistroPagos(WriteDAO):
    def insert_pago(self, datos):
        query = """
            INSERT INTO pagos (
                id_atleta, id_club, monto, fecha_pago, referencia, 
                metodo, comprobante_url, estado, concepto
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) 
            RETURNING id
        """
        params = (
            datos.get('id_atleta'),
            datos.get('id_club'),
            datos.get('monto'),
            datos.get('fecha_pago'),
            datos.get('referencia'),
            datos.get('metodo'),
            datos.get('comprobante_url'),
            datos.get('estado'),
            datos.get('concepto')
        )
        return self.insert_and_return_id(query, params)

    def historial(self, id_pago, estado, comentario):
        query = """
            INSERT INTO pagos_historial (id_pago, estado, comentario) 
            VALUES (%s, %s, %s)
        """
        return self.execute(query, (id_pago, estado, comentario))



    def update_estado_pago(self):
        pass






class VerPagos(BaseDAO):

    def pagos_registrados(self, id_atleta):
        query = """
                select p.id ,ph.comentario, p.fecha_pago , p.monto, p.metodo, p.estado, p.concepto, p.referencia from pagos p 
                join pagos_historial ph on ph.id_pago = p.id
                where p.id_atleta = %s
                """
        return self.fetch_all(query, (id_atleta,))
    

    def pagos_generales(self):
        query = """
                select a.nombre,a.apellido,p.id ,ph.comentario, p.fecha_pago , p.monto, p.metodo, p.estado, p.concepto , p.referencia from pagos p 
                join pagos_historial ph on ph.id_pago = p.id
                join atletas a on a.id = p.id_atleta
                """
        return self.fetch_all(query)