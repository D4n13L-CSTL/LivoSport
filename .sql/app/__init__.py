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
    
jwt = JWTManager()



@api.errorhandler(ExpiredSignatureError)
def handle_expired_error(e):
        return {"Error": "Token expirado"}, 401

@api.errorhandler(InvalidTokenError)
def handle_invalid_token_error(e):
        return {"Error": f"Token inválido: {e}"}, 422
    
@api.errorhandler(NoAuthorizationError)
def handle_no_authorization_error(e):
    return {"error": "Token de autenticación faltante"}, 401

def create_app():

    app = Flask(__name__, template_folder='../front/plantillas', static_folder='../front/static')
    app.config['SESSION_COOKIE_NAME'] = 'session'
    app.config['SECRET_KEY'] = settings.SECRET_KEY
    app.config['DEBUG'] = settings.DEBUG
    app.config["JWT_SECRET_KEY"] = settings.JWT_SECRET_KEY
    app.config["JWT_TOKEN_LOCATION"] = settings.JWT_TOKEN_LOCATION
    app.config["JWT_COOKIE_SECURE"] = settings.JWT_COOKIE_SECURE
    app.config["JWT_COOKIE_HTTPONLY"] = settings.JWT_COOKIE_HTTPONLY
    app.config["JWT_COOKIE_SAMESITE"] =  settings.JWT_COOKIE_SAMESITE
    app.config["JWT_COOKIE_CSRF_PROTECT"] =  settings.JWT_COOKIE_CSRF_PROTECT

    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=10)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
    
    app.register_blueprint(app_render)
    
    jwt.init_app(app)
    api.init_app(app)
 
    
    CORS(app, supports_credentials=True, origins=["http://localhost:5173", "http://localhost:3000", "http://172.0.0.1:5173" , "http://172.0.0.1:3000","http://127.0.0.1:5500","http://localhost:5500","https://bright-clocks-raise.loca.lt"])
    
    api.add_namespace(api_auth)
    api.add_namespace(api_atleta)
    api.add_namespace(api_club)
    api.add_namespace(api_login)
    api.add_namespace(api_gestion_eventos)
    api.add_namespace(api_gestion_pago_atletas)
    api.add_namespace(api_asistencias)
    

    return app
