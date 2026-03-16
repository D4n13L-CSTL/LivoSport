from conexiones.cursores import get_cursor
from .db import RegistroPagos
from .services import ServiceRegistrarPago

daoRegistro = RegistroPagos(get_cursor)

service = ServiceRegistrarPago(daoRegistro)

