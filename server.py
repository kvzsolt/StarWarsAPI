from flask import Flask, render_template, request, redirect, session, url_for
import requests
import bcrypt
import data_handler

app = Flask(__name__)
app.secret_key = 'secretkey'


@app.route('/')
def base_page():
    return render_template('base.html', isIndex=True)


@app.route('/planets', methods=['GET', 'POST'])
def planet_list():
    if request.method == 'POST':
        source = request.form.get('nextbutton') or request.form.get('prevbutton')
        if source:
            data = requests.get(source).json()
            return render_template('planets.html', data=data)

    data = requests.get('https://swapi.dev/api/planets/').json()
    return render_template('planets.html', data=data)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')

    username = request.form.get('username')
    password = request.form.get('password')

    if not username or not password:
        return redirect(url_for('register'))

    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    if data_handler.get_users_for_login(username):
        return render_template('register.html', taken=True)

    data_handler.add_user(username, hashed_pw)
    session['username'] = username
    return redirect(url_for('planet_list'))


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('base_page'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')

    username = request.form.get('username')
    password = request.form.get('password')

    if not username or not password:
        return redirect(url_for('login'))

    user = data_handler.get_users_for_login(username)
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return redirect(url_for('login'))

    session['username'] = username
    session['password'] = password
    return redirect(url_for('planet_list'))


if __name__ == "__main__":
    app.run()