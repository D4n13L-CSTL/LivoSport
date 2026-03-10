import bcrypt


class LoginAuth:
    def __init__(self, login_user_dao):
        self.login_user_dao = login_user_dao

    def login_user_service(self, username: str, password: str):
        user = self.login_user_dao.login_user(username)
        if not user:
            return {"Auth": "Usuario No encontrado"}

        stored_password = user[0]['password'].encode('utf-8')

        if bcrypt.checkpw(password.encode('utf-8'), stored_password):
        
            resp = {"Auth": True}
            
            return resp
        else:
            return {"Auth": "Contraseña Incorrecta"}
        
    