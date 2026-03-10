from flask import Flask, jsonify, make_response
from config import settings
from flask_cors import CORS
from flask_restx import Api
from flask_jwt_extended import JWTManager
from flask_jwt_extended.exceptions import NoAuthorizationError

from jwt.exceptions import ExpiredSignatureError, InvalidTokenError

from app.auth.routers import  api as api_auth
from app.atletas.routers import   api as api_atleta
from app.clubs.routers import  api as api_club
from app.login.routers import  api as api_login
from app.gestion_eventos.routers import  api as api_gestion_eventos
from app.pagos_atletas_club.routers import  api as api_gestion_pago_atletas
from app.asistencias.routers import api as api_asistencias
from datetime import timedelta
from front.renders.render import app_render
api = Api(  
    doc='/docs',
    title='Livo Flask',
    version='1.0',
    description='API para Livo Sport',
    prefix='/api/v1'
              )
    




def create_app():

    app = Flask(__name__, template_folder='../front/plantillas', static_folder='../front/static')
    app.config['SESSION_COOKIE_NAME'] = 'session'
    app.config['SECRET_KEY'] = settings.SECRET_KEY
    app.config['DEBUG'] = settings.DEBUG



    
    app.register_blueprint(app_render)
    
    api.init_app(app)
 
    
    CORS(app, supports_credentials=True, origins=["*"])
    
    api.add_namespace(api_auth)
    api.add_namespace(api_atleta)
    api.add_namespace(api_club)
    api.add_namespace(api_login)
    api.add_namespace(api_gestion_eventos)
    api.add_namespace(api_gestion_pago_atletas)
    api.add_namespace(api_asistencias)
    

    return app
