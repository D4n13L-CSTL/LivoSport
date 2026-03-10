from conexiones.cursores import get_cursor
from .db import PasarAsistencia
from .services import AsistenciaService

db_asistencia = PasarAsistencia(get_cursor)


services_asistencia = AsistenciaService(db_asistencia)