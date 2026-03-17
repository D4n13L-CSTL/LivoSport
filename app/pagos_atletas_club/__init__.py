from conexiones.cursores import get_cursor
from .db import RegistroPagos, VerPagos
from .services import ServiceRegistrarPago

daoRegistro = RegistroPagos(get_cursor)
daoGetPagos = VerPagos(get_cursor)

service_pago = ServiceRegistrarPago(daoRegistro, daoGetPagos)

