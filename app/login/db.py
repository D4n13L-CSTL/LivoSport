from modelClass.BaseDAO import WriteDAO, BaseDAO

class loginUser(BaseDAO):

    def login_user(self,username):
        query = """
            select * from usuarios where username = %s
                """

        return self.fetch_all(query, (username,))
