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


def user_exists(username):
    if not os.path.exists('app/data/users.xlsx'):
        return False
    users = pd.read_excel('app/data/users.xlsx', engine='openpyxl').to_dict(orient='records')
    return any(user['username'].lower() == username.lower() for user in users)


def save_user_to_excel(fullname, email, username, hashed_password):
    user_data = {
        'fullname': fullname,
        'email': email,
        'username': username,
        'password': hashed_password
    }
    df = pd.DataFrame([user_data])
    file_exists = os.path.isfile('app/data/users.xlsx')
    if file_exists:
        existing_df = pd.read_excel('app/data/users.xlsx', engine='openpyxl')
        df = pd.concat([existing_df, df], ignore_index=True)
    with pd.ExcelWriter('app/data/users.xlsx', engine='openpyxl', mode='a' if file_exists else 'w') as writer:
        df.to_excel(writer, index=False, header=not file_exists)
