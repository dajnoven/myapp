import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key'
    EXCEL_FILE = "app/data/products.xlsx"