from conexiones.cursores import get_cursor

from .ver_club_pert import ClubUtils

from .update_table import UpdateTableUtils
from .add_mensualidad_club import Mensualidad

club_utils = ClubUtils(get_cursor)


update_tables_utils = UpdateTableUtils(get_cursor)

mensualidades = Mensualidad(get_cursor)