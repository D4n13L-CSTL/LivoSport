from flask import Blueprint
from flask_restx import fields, Namespace, Resource
from . import auth_user



api = Namespace('Gestion de Usuario', description='Gestion de Usuario', path='/gestion_user')

@api.route('')
class Auth(Resource):
    def post(self):
        try:        
            data = api.payload
            username = data['username']
            email = data['email']
            password  = data['password']
            usuario = auth_user.user_create( username, email, password )
            return {'Id': usuario}
        except ValueError as e:
            return {'Error':str(e)} , 400
        except Exception as e:
            return {'Error':str(e)} , 500