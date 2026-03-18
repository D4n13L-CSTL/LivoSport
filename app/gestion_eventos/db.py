from modelClass.BaseDAO import WriteDAO, BaseDAO


class Eventos(WriteDAO, BaseDAO):

    def crear_un_evento(self, datos):

        query  = """
                insert into eventos (titulo, tipo, fecha, ubicacion, equipo, descripcion, hora_ini, hora_fin, id_club) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s)
                """
        
        parametros = (datos.get('titulo'),
                      datos.get('tipo'),
                      datos.get('fecha'),
                      datos.get('ubicacion'),
                      datos.get('equipo'),
                      datos.get('descripcion'),
                      datos.get('hora_ini'),
                      datos.get('hora_fin'),
                      datos.get('id_club'),
                      )

        return self.execute(query, parametros)
    

    def obtener_eventos(self, id_club):
        query  = """
                select * from eventos
                 where id_club = %s

                """
        return self.fetch_all(query,(id_club,))