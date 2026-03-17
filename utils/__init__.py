from conexiones.cursores import get_cursor

from .ver_club_pert import ClubUtils

from .update_table import UpdateTableUtils

club_utils = ClubUtils(get_cursor)


update_tables_utils = UpdateTableUtils(get_cursor)