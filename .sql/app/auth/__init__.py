from conexiones.cursores import get_cursor
from .db import User

auth_user = User(get_cursor)

