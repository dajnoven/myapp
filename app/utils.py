import pandas as pd
import os

from app import app


def read_excel(sheet_name):
    """Чтение данных из указанного листа Excel."""
    try:
        data = pd.read_excel(app.config['EXCEL_FILE'], sheet_name=sheet_name, engine='openpyxl')
        return data.to_dict(orient="records")
    except Exception as e:
        print(f"Ошибка при чтении файла Excel: {e}")
        return []


def save_user_to_excel(username, email, password):
    user_data = {'username': username, 'email': email, 'password': password}
    df = pd.DataFrame([user_data])
    file_exists = os.path.isfile('app/data/users.xlsx')
    if file_exists:
        existing_df = pd.read_excel('app/data/users.xlsx', engine='openpyxl')
        df = pd.concat([existing_df, df], ignore_index=True)
    with pd.ExcelWriter('data/users.xlsx', engine='openpyxl', mode='w') as writer:
        df.to_excel(writer, index=False, header=True)


def user_exists(username):
    try:
        users = pd.read_excel('app/data/users.xlsx', engine='openpyxl').to_dict(orient='records')
        return any(user['username'] == username for user in users)
    except Exception as e:
        print(f"Ошибка при чтении файла Excel: {e}")
        return False



