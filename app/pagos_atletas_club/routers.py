from flask_restx import Resource
from .documentation import *
from flask import make_response, jsonify
from flask_jwt_extended import jwt_required
from . import services

#ARMAR EL ENDPOINT PARA HACER LA PETICION


