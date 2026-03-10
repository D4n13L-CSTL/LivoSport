from modelClass.BaseDAO import WriteDAO, BaseDAO


class WriteEventos(WriteDAO):

    def crear_un_evento(self, nombre, descripcion, fecha, hora, id_tipo):

        query  = """
                insert into eventos (nombre, descripcion, fecha, hora, id_tipo) VALUES(%s,%s,%s,%s,%s) RETURNING id_evento
                """

        return self.insert_and_return_id(query, ( nombre, descripcion, fecha, hora, id_tipo))
    
    
    def relacion_evento_club(self, id_club,id_evento):

        query  = """
                insert into eventos_club (id_club, id_evento) VALUES (%s,%s)
                """

        return self.execute(query, (id_club,id_evento))


class ReadEventos(BaseDAO):

    def obtener_eventos(self, id_club):
        query  = """
                select eventos.nombre, eventos.descripcion, eventos.fecha, eventos.hora ,tipo_eventos.nombre  from eventos
                join eventos_club on eventos.id_evento  = eventos_club.id_evento
                join tipo_eventos on tipo_eventos.id_tipo = eventos.id_tipo
                join clubes on clubes.id = eventos_club.id_club
                where clubes.id = %s
                """
        return self.fetch_all(query,(id_club,))