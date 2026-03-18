from utils import update_tables_utils



class ServiceRegistrarPago:
    def __init__(self, pagos_dao,get_pagos):
        self.pagos_dao = pagos_dao
        self.get_pagos_dao = get_pagos

    def service_register_pago(self, datos):

        id_pago = self.pagos_dao.insert_pago(datos)

        self.pagos_dao.historial(
            id_pago, 
            datos.get('estado', 'pendiente'), 
            datos.get('comentario', '')
        )

        return {"success": True, "id_pago": id_pago}
    
    def ver_pagos(self,id_atleta):

        return self.get_pagos_dao.pagos_registrados(id_atleta)
    

    
    def pagos_genarales(self,id_club):
        return self.get_pagos_dao.pagos_generales(id_club)
    



    def update_pago(self,parametro,datos):
        tabla = 'pagos'
        return update_tables_utils.update_usuario(tabla, parametro, datos)