from flask import Flask
from config import Config

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 24 * 1024 * 1024  # Увеличение максимального размера запроса до 16 МБ
app.config.from_object(Config)

from app import routes
