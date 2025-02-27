import sqlite3
from flask_mail import Message
from app import mail

DB_PATH = "identifier.sqlite"

def get_db_connection():

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # Позволяет обращаться к полям как к словарю
    return conn

def user_exists(email):

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT 1 FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()
    return user is not None

def save_user_to_db(fullname, email, phone, hashed_password):

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO users (fullname, email, phone, password_hash) VALUES (?, ?, ?, ?)",
        (fullname, email, phone, hashed_password),
    )
    conn.commit()
    conn.close()

def get_user_by_email(email):
    """Получает пользователя по email."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()
    return user


def send_registration_email(to_email, fullname):

    subject = "Реєстрація успішна!"
    body = f"Привіт, {fullname}!\n\nВи успішно зареєструвалися на сайті. Нажаль, всьо ваше бабло вже у нас^^"

    msg = Message(subject, recipients=[to_email], body=body)

    try:
        mail.send(msg)
        print(f"📧 Письмо отправлено на {to_email}")
    except Exception as e:
        print(f"❌ Ошибка при отправке email: {e}")

def get_products_by_variant(variant):

    conn = get_db_connection()
    cursor = conn.cursor()

    if variant == 1:
        cursor.execute("SELECT * FROM products WHERE id <= 7")
    elif variant == 2:
        cursor.execute("SELECT * FROM products WHERE id > 7")
    else:
        conn.close()
        return []

    products = cursor.fetchall()
    conn.close()
    return [{"id": row[0], "name": row[1], "price": row[2]} for row in products]
