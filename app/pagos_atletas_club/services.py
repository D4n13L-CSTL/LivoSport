

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
    
    def ver_pagos(self):

        return self.get_pagos_dao.pagos_registrados()