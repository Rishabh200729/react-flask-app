from flask import Flask, request, redirect, json, jsonify,  Blueprint
import flask_praetorian
import jsonpickle
from . import guard, db, cors, User, Hackathon

views = Blueprint("views",__name__)

@views.route("/api/sign-up", methods=["POST"])
def add_user():
    json.loads(request.data)
    data = json.loads(request.data)

    username = data["username"]
    email = data["email"]
    password1 = data["password"]
    password2 = data["password2"]

    role = data["role"]

    email_exists = User.query.filter_by(email=email).first()
    username_exists = User.query.filter_by(username=username).first()

    #check if email and username exists
    if(email_exists is not None):
        return {"error":"email is aldready in use"}, 400
    if username_exists is not None:
        return {"error":"username is aldready in use"} ,400
    if password1 != password2:
        return {"error":"passwords do not match"}, 400

    new_user = User(username=username,email = email,password=guard.hash_password(password1), roles=f'{role},developer')

    db.session.add(new_user)
    db.session.commit()
    print("new user added")

    # authenticate user using jwt token
    user = guard.authenticate(email, password1)
    ret = {'access_token': guard.encode_jwt_token(user)}
    return ret, 201


@views.route("/api/login", methods=["POST"])
def login():
    data = json.loads(request.data)
    email = data["email"]
    password = data["password"]

    user = User.query.filter_by(email=email).first()
    
    #check if user account exists IN DB
    if user is not None:
        print(user)
        user = guard.authenticate(email, password)
        ret = {'access_token': guard.encode_jwt_token(user)}
        return ret,201
    else:
        return {"error":"no user found"}, 404

@views.route("/api/get-all-hackathons")
@flask_praetorian.auth_required
def get_all_hackathons():
    all_hackathons = Hackathon.query.all()
    result = json.dumps(all_hackathons, default=encode_stuff, indent=4)
    return result, 200
    
@views.route("/api/create-hackathon", methods=["POST"])
@flask_praetorian.auth_required
@flask_praetorian.roles_required("manager")
def create_hackathon():
    data = json.loads(request.data)
    name = data["name"]
    desc = data["desc"]

    # create a new hackathon which is related to the user 
    new_hackathon = Hackathon(
            name = name,
            manager=flask_praetorian.current_user().username,
            desc = desc,
            user = flask_praetorian.current_user()
        )
    print(new_hackathon)
    db.session.add(new_hackathon)
    db.session.commit()
    
    return  json.dumps(new_hackathon, default=encode_stuff, indent=4) , 201

@views.route("/api/get-one-hackathon", methods=["POST"])
@flask_praetorian.auth_required
def get_one_hackathon():
    data = json.loads(request.data)
    hackathon_in_db = Hackathon.query.filter_by(name= data["name"], manager=data["manager"]).first()
    result = json.dumps(hackathon_in_db, default=encode_stuff, indent=4)
    return result, 200

@views.route('/api/refresh', methods=['POST'])
def refresh():
    """
    Refreshes an existing JWT by creating a new one that is a copy of the old
    except that it has a refrehsed access expiration.
    .. example::
       $ curl http://localhost:5000/api/refresh -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    print("refresh request")
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200

def encode_stuff(hackathon):
    return {
        'name':hackathon.name,
        'manager':hackathon.manager,
        'created_on':str(hackathon.created_on.date()),
        'desc':hackathon.desc
    }
