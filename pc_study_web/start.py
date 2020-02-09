from app.config import config
from app.route import *

if __name__ == '__main__':
    app.run(host=config["host"],port=config["port"],debug=config["debug"])