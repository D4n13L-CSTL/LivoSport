import psycopg2

class BaseDAO:
    def __init__(self, connection_factory):

        self.connection_factory = connection_factory

    def fetch_all(self, query: str, params: tuple = None) -> list[dict]:
        with self.connection_factory() as cursor:
            cursor.execute(query, params or ())
            columns = [col[0] for col in cursor.description]
            rows = cursor.fetchall()
            return [dict(zip(columns, row)) for row in rows]



class WriteDAO:
    def __init__(self, connection_factory):
        self.connection_factory = connection_factory

    def execute(self, query, params=None):
        try:
            with self.connection_factory() as cursor:
                cursor.execute(query, params or ())
        except psycopg2.errors.UniqueViolation:
            raise ValueError("Registro duplicado")

    def insert_and_return_id(self, query, params=None):
        try:
            with self.connection_factory() as cursor:
                cursor.execute(query, params or ())
                return cursor.fetchone()[0]
        except psycopg2.errors.UniqueViolation: 
            raise ValueError("Registro duplicado")