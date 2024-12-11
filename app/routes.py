from flask import render_template, request, redirect, url_for, session, jsonify
from app import app
from app.utils import read_excel, save_user_to_excel, user_exists
from werkzeug.security import generate_password_hash, check_password_hash
import pandas as pd
import os

@app.route('/')
def index():
    if 'username' in session:
        return redirect(url_for('order_form'))
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        fullname = request.form['fullname']
        email = request.form['email']
        password = request.form['password']
        if user_exists(fullname):
            return 'Пользователь уже существует. Попробуйте другое имя.'
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        save_user_to_excel(fullname, email, hashed_password)
        return redirect(url_for('login'))
    return redirect(url_for('index'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        try:
            users = pd.read_excel('app/data/users.xlsx', engine='openpyxl').to_dict(orient='records')
            user = next((user for user in users if user['username'] == username), None)
            if user and check_password_hash(user['password'], password):
                session['username'] = user['username']
                return redirect(url_for('order_form'))
        except Exception as e:
            print(f"Ошибка при чтении файла Excel: {e}")
        return 'Неправильное имя пользователя или пароль.'
    return redirect(url_for('index'))

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

@app.route('/order_form', methods=['GET', 'POST'])
def order_form():
    if 'username' not in session:
        return redirect(url_for('index'))
    variant1_data = read_excel("Вариант1")
    variant2_data = read_excel("Вариант2")
    return render_template("order_form.html", variant1_data=variant1_data, variant2_data=variant2_data)

@app.route('/load_products', methods=['POST'])
def load_products():
    variant = request.form.get('variant')
    if variant == 'variant1':
        products = read_excel("Вариант1")
    elif variant == 'variant2':
        products = read_excel("Вариант2")
    else:
        products = []
    return jsonify({'products': products})

@app.route('/save_user_data', methods=['POST'])
def save_user_data():
    user_data = request.form.to_dict()
    df = pd.DataFrame([user_data])
    file_exists = os.path.isfile('user_data.xlsx')
    if file_exists:
        existing_df = pd.read_excel('user_data.xlsx', engine='openpyxl')
        df = pd.concat([existing_df, df], ignore_index=True)
    with pd.ExcelWriter('user_data.xlsx', engine='openpyxl', mode='w') as writer:
        df.to_excel(writer, index=False, header=True)
    return jsonify({'message': 'Дані збережено!'})