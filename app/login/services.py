import bcrypt


class LoginAuth:
    def __init__(self, login_user_dao):
        self.login_user_dao = login_user_dao

    def login_user_service(self, username: str, password: str):
        user = self.login_user_dao.login_user(username)
        if not user:
            return {"Auth": "Usuario No encontrado"}
        print(user)
        tipo_user = [i.get('nombre') for i in user]
        cedula = [i.get('n_documento') for i in user]
        id_club = [i.get('id_club') for i in user]
        print(tipo_user)
        stored_password = user[0]['password'].encode('utf-8')

        if bcrypt.checkpw(password.encode('utf-8'), stored_password):
        
            resp = {"Auth": True, "tipo_user":tipo_user[0], "cedula":cedula[0], "id_club":id_club[0]}
            
            return resp
        
        else:

            return {"Auth": "Contraseña Incorrecta"}
        
    