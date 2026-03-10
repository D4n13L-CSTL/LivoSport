from conexiones.cursores import get_cursor
from .db import WriteAleta, VerEventosAsignados, RegistraAtleta, ObtenerAtletas
from .services import Atletas, ServicesEventos,ServiceRegistrarAtletas, ServicesObtenerAtletas
from utils.register_user import User

atleta = WriteAleta(get_cursor)
register_atletas = Atletas(atleta)

get_atleta_dbo = ObtenerAtletas(get_cursor)



atletadbo = RegistraAtleta(get_cursor)
registroDBO = User(get_cursor)


eventos = VerEventosAsignados(get_cursor)
services_eventos = ServicesEventos(eventos)




crud_atleta = ServiceRegistrarAtletas(atletadbo, registroDBO)

atleta_get= ServicesObtenerAtletas(get_atleta_dbo)