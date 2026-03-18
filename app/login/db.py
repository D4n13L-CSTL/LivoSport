from modelClass.BaseDAO import WriteDAO, BaseDAO

class loginUser(BaseDAO):

    def login_user(self,username):
        query = """
                select usuarios.*, tipo_de_user.nombre, atletas.n_documento, clubes.id as id_club from usuarios 
                join tipo_de_user on usuarios.tipo_de_user_id = tipo_de_user.id
                left join atletas on atletas.id_usuario = usuarios.id
                left join clubes on clubes.id_usuario = usuarios.id
                where username = %s
                
                """

        return self.fetch_all(query, (username,))
