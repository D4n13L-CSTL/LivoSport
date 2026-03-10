from conexiones.cursores import get_cursor
from .db import loginUser
from .services import LoginAuth

login_auth = loginUser(get_cursor)

login_iniar  = LoginAuth(login_auth)