# Configuración o modelos del módulo
from modelClass.BaseDAO import BaseDAO, WriteDAO
import bcrypt

class User(WriteDAO):

    def user_create(self, username, email, password ):
        password_hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        query  = 'INSERT INTO usuarios (username, email, password) VALUES (%s,%s,%s) RETURNING id;'
        return self.insert_and_return_id(query, (username, email, password_hashed))