import os
from dotenv import load_dotenv

load_dotenv('key.env')

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'fallback_secret_key')
    SECRET_PASS = os.getenv('SECRET_PASS', 'fallback_secret_pass')

    # Настройки почты для Gmail
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'dajnoven@gmail.com'
    MAIL_PASSWORD = SECRET_PASS
    MAIL_DEFAULT_SENDER = 'dajnoven@gmail.com'
