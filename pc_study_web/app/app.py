from flask import Flask
from flask_cors import *

app = Flask(__name__)


# CORS(app,support_credentials=True)
# cors = CORS(app, resources={r"*": {"origins": ["http://localhost:63343","http://localhost:63342"]}})
cors = CORS(app, resources={r"*": {"origins":"*"}})