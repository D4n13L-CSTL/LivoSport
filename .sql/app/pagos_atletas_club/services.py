from flask import request


class BasePago:
    def __init__(self, pagos):
        self.pagos = pagos
        
class ReportePagoAtleta(BasePago):
    def __init__(self, pagos):
        super().__init__(pagos)
    
    def reporte_de_pago(self,id_club, monto,fecha_pago,referencia,id_metodo):
        id_atleta_cookie  = request.cookies.get('id_atleta')        
        
        return self.pagos.reportar_pago(id_atleta_cookie,id_club, monto,fecha_pago,referencia,id_metodo)


class VerPagosServices(BasePago):
    def __init__(self, pagos):
        super().__init__(pagos)
    
    def pagos_pendientes(self):
        id_club = request.cookies.get('id_club_cookie')
        id_atleta = request.args.get('id_atleta')
        estado_de_pago = request.args.get('status')
        pagos_pendientes = self.pagos.ver_pagos_pendientes_for_club(id_club)
        
       
        if id_atleta:
            lista = []
            id_atleta_int = int(id_atleta)
            for i in pagos_pendientes:
                if id_atleta_int == i.get('id'):
                    lista.append(i)
            return lista
        
        if estado_de_pago:
            lista_estado = []
            for i in pagos_pendientes:
                if estado_de_pago.upper() == i.get('estado'):
                    lista_estado.append(i)
            return lista_estado
        
        return pagos_pendientes
       
       
 
class UpdatePagoServices(BasePago):
    def __init__(self, pagos):
        super().__init__(pagos)
    
    def cambiarde_estatus_el_pago(self,estado,id_de_pago):
        
        return self.pagos.cambiar_status_pago(estado,id_de_pago)
    

class HistoriaDePagoServices(BasePago):
    def __init__(self, pagos):
        super().__init__(pagos)
    
    def guardar_historial(self,id_pago, estado,comentario):
        
        id_usuario = request.cookies.get('id_usuario')
        return self.pagos.guardar_historial(id_pago, estado,comentario,id_usuario)