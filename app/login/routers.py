from flask import Blueprint, url_for, redirect, make_response, jsonify, session
from .documentation import *
from . import  login_iniar



@api.route('/auth/login')
class Login(Resource):
    @api.expect(payload_login)
    @api.response(200, description='Respuesta Succes', model=respuesta_success)
    @api.response(401, 'Contraseña incorrecta', respuesta_error)
    @api.response(404, 'Usuario no encontrado', respuesta_error)
    @api.response(500, 'Error interno', respuesta_error)
    def post(self):
            """Api para login"""
            try:
                data = api.payload
                username = data['username'].upper()
                password = data['password']
                if username and password:
                    validar  = login_iniar.login_user_service(username, password)
                    if validar.get('Auth') == True:

                        session['usuario'] = username
                        
                        res = {
                                "success": True, 
                                "message": "Login exitoso", 
                                "redirect_url": url_for('Renders.render_index') 
                            }, 200
                        
                        
                        return res
                    else:
                        return make_response(jsonify(validar))
                else:
                     return {"Error":"Falta datos a enviar"} 
            except Exception as e:
                 return {"Error":str(e)} , 500



@api.route('/auth/logout')
class Logout(Resource):
     def post(self):
        try:
             
            session.pop('usuario')
            print(session)
            res = {
                "success": True, 
                "message": "logout exitoso", 
                "redirect_url": url_for('Renders.render_login') 
            }, 200
            return res
        except:
            pass