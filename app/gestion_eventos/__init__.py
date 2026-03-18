from conexiones.cursores import get_cursor
from . db import Eventos
from .services import EventosServicesWrite

model_db_base  = Eventos(get_cursor)




creacion_de_eventos = EventosServicesWrite(model_db_base)
