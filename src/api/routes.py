"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.models import db, User
from api.utils import generate_sitemap, APIException
import datetime #
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import traceback

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['GET'])
def handle_user():

    response_body = {
        "msg": "Hello, this is your GET /user response "
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['PUT'])
def login():
    try:
        body = request.get_json()
        user = User.query.filter_by(email=body['email']).first()
        if user is None:
            return jsonify({"mensaje": "el usuario no existe, registrese"}), 404
        else:
            if user.password != body["password"]:
                return jsonify({"mensaje": "error en contraseña"}), 404
            else:
                expiracion = datetime.timedelta(minutes=1)
                token = create_access_token(identity=user.email, expires_delta=expiracion)
                return jsonify({
                    "mensaje": "ok",
                    "token": token,
                    "tiempo": expiracion.total_seconds(),
                    "data": user.serialize()
                }), 200
    except Exception as e:
        print(f"Error: {e}")
        traceback.print_exc()
        return jsonify({"error": "Se produjo un error interno en el servidor"}), 500

@api.route("/check", methods=["GET"])
@jwt_required()
def check_user():
    identidad = get_jwt_identity()
    return jsonify ({
        "logeado": True,
        "identidad": identidad
    })

@api.route('/signup', methods=['PUT'])
def handle_signup():
    # obtiene los datos JSON de la solicitud
    data = request.get_json()
    
    # verifica si el correo electrónico ya existe en la base de datos
    if User.query.filter_by(email=data['email']).first():
        # devuelve un error 409 si el correo electrónico ya existe
        return jsonify({"error": "el correo usuario ya existe"}), 409
    
    # crea un nuevo objeto User con los datos de la solicitud
    new_user = User(
        email=data['email'],
        password=data['password'],
        is_active=True
    )

    # agrega el nuevo objeto User a la base de datos
    db.session.add(new_user)
    db.session.commit()

    # devuelve una respuesta JSON indicando que el usuario se creó correctamente
    return jsonify({"mensaje": "usuario creado exitosamente"}), 201
