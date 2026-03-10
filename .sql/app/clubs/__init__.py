from conexiones.cursores import get_cursor
from .db import Clubes, VerFormularios, ListaAtletas
from .services import Clubs, ObtenerFormulario, InvitacionService, LogicAtletas


club_auth = Clubes(get_cursor)

formularios_de_inscripciones = VerFormularios(get_cursor)
obtener_lista_atletas = ListaAtletas(get_cursor)


gestion_club = Clubs(club_auth)

formularios_registrados = ObtenerFormulario(formularios_de_inscripciones)


link_generate_inscripcion = InvitacionService(formularios_registrados)

atletas_logic = LogicAtletas(obtener_lista_atletas)