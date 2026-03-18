from flask import Blueprint, render_template, request, make_response, session,redirect,url_for
from utils import club_utils



app_render = Blueprint('Renders', __name__, url_prefix='') 


@app_render.route("/")
def render_login():
    print(session)
    if "usuario" in session:
        return redirect(url_for('Renders.render_index'))
    return make_response(render_template('index.html'), 200) 





@app_render.route("/index" , methods=['GET'])
def render_index():
    if "usuario" not in session:
        return redirect(url_for('Renders.render_login'))
    print(session['tipo_user'])
    return make_response(render_template('dashboard.html'), 200)






@app_render.route("/pagos", methods=["GET"])
def render_pagos():
    tipo_user = session['tipo_user']
    username = session['usuario']
    cedula = session.get('cedula')
    id_club = session.get('id_club')
    print(cedula)

    if tipo_user == 'atleta':
        club_perteneciente = club_utils.club_perte(cedula)
        
        return make_response(render_template('user/pago_user_atleta.html', username = username, club =club_perteneciente[0]), 200)
    else:
        return make_response(render_template('pages/pagos.html'), 200)





@app_render.route("calendario", methods=["GET"])
def render_calendario():
   
    return make_response(render_template('pages/calendario.html'), 200)






@app_render.route("atletas", methods=["GET"])
def render_atletas():
   
    return make_response(render_template('pages/atletas.html'), 200)





@app_render.route("entrenadores", methods=["GET"])
def render_entrenadores():
   
    return make_response(render_template('pages/entrenadores.html'), 200)

@app_render.route("asistencia", methods=["GET"])
def render_asistencia():
   
    return make_response(render_template('pages/asistencias.html'), 200)
