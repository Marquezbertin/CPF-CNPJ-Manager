from flask import Flask, request, jsonify, render_template
import sqlite3

app = Flask(__name__)

DATABASE = 'relatório.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    search_type = request.form['search_type']
    search_term = request.form['search_term'].lower()
    results = []

    conn = get_db()
    cursor = conn.cursor()
    
    if search_type in ['cpf_real', 'cpf_restricao']:
        query = f"SELECT * FROM {search_type} WHERE LOWER(name) LIKE ? OR cpf LIKE ?"
        cursor.execute(query, (f'%{search_term}%', f'%{search_term}%'))
    elif search_type == 'cnpj_real':
        query = f"SELECT * FROM {search_type} WHERE LOWER(name) LIKE ? OR cnpj LIKE ?"
        cursor.execute(query, (f'%{search_term}%', f'%{search_term}%'))
    
    results = cursor.fetchall()
    
    conn.close()

    return jsonify([dict(row) for row in results])

@app.route('/add', methods=['POST'])
def add():
    add_type = request.form['add_type']
    add_name = request.form['add_name']
    add_term = request.form['add_term']

    conn = get_db()
    cursor = conn.cursor()

    # Verificar se o nome já existe
    query = f"SELECT * FROM {add_type} WHERE LOWER(name) = ?"
    cursor.execute(query, (add_name.lower(),))
    if cursor.fetchone():
        return jsonify({'message': 'Nome já existe!'}), 400

    # Verificar se o CPF/CNPJ já existe
    if 'cpf' in add_type:
        query = f"SELECT * FROM {add_type} WHERE cpf = ?"
    else:
        query = f"SELECT * FROM {add_type} WHERE cnpj = ?"
    cursor.execute(query, (add_term,))
    if cursor.fetchone():
        return jsonify({'message': 'CPF/CNPJ já existe!'}), 400
    
    # Inserir novo registro
    if 'cpf' in add_type:
        query = f"INSERT INTO {add_type} (name, cpf) VALUES (?, ?)"
        cursor.execute(query, (add_name, add_term))
    else:
        query = f"INSERT INTO {add_type} (name, cnpj) VALUES (?, ?)"
        cursor.execute(query, (add_name, add_term))
    
    conn.commit()
    conn.close()

    return jsonify({'message': 'Adicionado com sucesso!'}), 201

@app.route('/edit', methods=['POST'])
def edit():
    edit_type = request.form['edit_type']
    edit_id = request.form['edit_id']
    edit_name = request.form['edit_name']
    edit_term = request.form['edit_term']

    conn = get_db()
    cursor = conn.cursor()
    
    if 'cpf' in edit_type:
        query = f"UPDATE {edit_type} SET name = ?, cpf = ? WHERE id = ?"
        cursor.execute(query, (edit_name, edit_term, edit_id))
    else:
        query = f"UPDATE {edit_type} SET name = ?, cnpj = ? WHERE id = ?"
        cursor.execute(query, (edit_name, edit_term, edit_id))
    
    conn.commit()
    conn.close()

    return jsonify({'message': 'Editado com sucesso!'})

@app.route('/delete', methods=['POST'])
def delete():
    delete_type = request.form['delete_type']
    delete_id = request.form['delete_id']

    conn = get_db()
    cursor = conn.cursor()
    
    query = f"DELETE FROM {delete_type} WHERE id = ?"
    cursor.execute(query, (delete_id,))
    
    conn.commit()
    conn.close()

    return jsonify({'message': 'Excluído com sucesso!'})

if __name__ == '__main__':
    app.run(debug=True)