from conexiones.cursores import get_cursor
from .db import WriteAleta, VerEventosAsignados
from .services import Atletas, ServicesEventos

atleta = WriteAleta(get_cursor)
register_atletas = Atletas(atleta)

eventos = VerEventosAsignados(get_cursor)
services_eventos = ServicesEventos(eventos)