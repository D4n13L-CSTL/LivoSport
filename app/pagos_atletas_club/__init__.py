from .db import ReportarPago, VerPagos, UpdateReportePago, GuardarHistorial
from conexiones.cursores import get_cursor
from .services import ReportePagoAtleta, VerPagosServices, UpdatePagoServices, HistoriaDePagoServices


pago_atleta  = ReportarPago(get_cursor)
visualizacion_de_pagos = VerPagos(get_cursor)
cambio_status = UpdateReportePago(get_cursor)
historial = GuardarHistorial(get_cursor)


realizar_pago  = ReportePagoAtleta(pago_atleta)
visualizacion_de_pagos_services = VerPagosServices(visualizacion_de_pagos)
cambio_de_estatus_services = UpdatePagoServices(cambio_status)
historial_services = HistoriaDePagoServices(historial)