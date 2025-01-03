import sqlite3

DATABASE = 'relatório.db'

def create_tables():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    # Criar a tabela cpf_real
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS cpf_real (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cpf TEXT NOT NULL
    )
    ''')

    # Criar a tabela cpf_restricao
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS cpf_restricao (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cpf TEXT NOT NULL
    )
    ''')

    # Criar a tabela cnpj_real
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS cnpj_real (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cnpj TEXT NOT NULL
    )
    ''')

    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_tables()
    print("Tabelas criadas com sucesso.")