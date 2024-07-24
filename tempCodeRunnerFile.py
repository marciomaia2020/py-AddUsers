from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy


"""
Explicação do Código
Backend

A aplicação Flask é configurada com uma URI de banco de dados SQLite (sqlite:///database.db).
A classe User define um modelo de tabela com colunas para id, name e email.
A rota / renderiza uma lista de usuários armazenados no banco de dados.
A rota /add permite adicionar novos usuários ao banco de dados via formulário.
"""



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<User {self.name}>'


@app.route('/')
def index():
    users = User.query.all()
    return render_template('index.html', users=users)



@app.route('/add', methods=['POST'])
def add_user():
    name = request.form.get('name')
    email = request.form.get('email')
    new_user = User(name=name, email=email)
    db.session.add(new_user)
    db.session.commit()
    return redirect(url_for('index'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)


