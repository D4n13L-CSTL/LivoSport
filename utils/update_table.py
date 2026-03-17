from modelClass.BaseDAO import BaseDAO, WriteDAO



class UpdateTableUtils(WriteDAO):
        
        def update_usuario(self, tabla,parametro, datos):
            columnas = [f"{key} = %s" for key in datos.keys()]
            print(columnas)
            set_query = ", ".join(columnas)
            valores = list(datos.values())
            valores.append(parametro)
            sql = f"UPDATE {tabla} SET {set_query} WHERE id = %s"
            print(sql)
            print(valores)
            self.execute(sql, tuple(valores))
