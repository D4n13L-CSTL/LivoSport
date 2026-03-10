from contextlib import contextmanager
from conexiones.adaptadores import conexion_db



@contextmanager
def get_cursor():
    conex = conexion_db()
    cursor = conex.cursor()
    try:
        yield cursor
        conex.commit()
    except:
        conex.rollback()
        raise
    finally:
        cursor.close()
        conex.close()
