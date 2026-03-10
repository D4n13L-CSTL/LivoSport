from modelClass.BaseDAO import WriteDAO, BaseDAO


class GuardarHistorial(WriteDAO):
    def guardar_historial(self,id_pago, estado,comentario,id_usuario):
        query = "insert into pagos_historial(id_pago, estado,comentario,id_usuario) VALUES (%s,%s,%s,%s)"
        return self.execute(query,(id_pago, estado,comentario,id_usuario))



class ReportarPago(WriteDAO):
    def reportar_pago(self,id_atleta,id_club, monto,fecha_pago,referencia,id_metodo):
        query = """
            insert into pagos (id_atleta,id_club, monto,fecha_pago,referencia,id_metodo) VALUES (%s,%s,%s,%s,%s,%s) RETURNING id;
        """
        insertar = self.insert_and_return_id(query,(id_atleta,id_club, monto,fecha_pago,referencia,id_metodo))
        
        return insertar
    

    
    
class VerPagos(BaseDAO):
    
    def ver_pagos_pendientes_for_club(self, id_club):
        query = """
            select atletas.id, atletas.nombres, atletas.email,pagos.monto,pagos.fecha_pago,pagos.estado
            from pagos
            join clubes on clubes.id = pagos.id_club
            join atletas ON atletas.id = pagos.id_atleta
            where clubes.id = %s
                """
        return self.fetch_all(query, (id_club,))
    
    
class UpdateReportePago(WriteDAO):
    
    def cambiar_status_pago(self, estado,id_de_pago):
        query  = """
                update pagos set estado = %s where id = %s RETURNING id;
                """    
        return self.insert_and_return_id(query ,(estado,id_de_pago))
    
    
