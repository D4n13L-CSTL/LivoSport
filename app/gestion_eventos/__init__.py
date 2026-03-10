from conexiones.cursores import get_cursor
from . db import WriteEventos, ReadEventos
from .services import EventosServicesWrite, EventosServicesRead

model_db_base  = WriteEventos(get_cursor)
model_db_base_read  = ReadEventos(get_cursor)




creacion_de_eventos = EventosServicesWrite(model_db_base)
obtener_eventos = EventosServicesRead(model_db_base_read)