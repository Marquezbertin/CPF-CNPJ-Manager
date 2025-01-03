# Base de Dados para Cadastro de CPF e CNPJ

Este projeto é uma aplicação web para cadastro, consulta, edição e exclusão de registros de CPF e CNPJ. A aplicação foi desenvolvida utilizando Flask para o backend e HTML, CSS e JavaScript para o frontend. O objetivo é fornecer uma interface amigável e responsiva para gerenciar uma base de dados de CPFs e CNPJs.

## Funcionalidades

### 1. Consulta de Registros
- **Busca por Tipo**: Permite buscar registros por tipo (CPF Real, CPF com Restrição, CNPJ Real).
- **Busca por Termo**: Permite buscar registros por nome ou CPF/CNPJ.
- **Resultados**: Exibe os resultados da busca em uma lista, com opções para editar ou excluir cada registro.

### 2. Adição de Novos Registros
- **Formulário de Adição**: Permite adicionar novos registros de CPF ou CNPJ.
- **Validação**: Valida os campos de entrada para garantir que o nome contenha apenas letras e espaços, e que o CPF/CNPJ contenha apenas números e pontuações permitidas.
- **Prevenção de Duplicatas**: Verifica se o nome ou CPF/CNPJ já existe antes de adicionar um novo registro.
- **Limpeza de Campos**: Limpa os campos de entrada após a adição de um novo registro.

### 3. Edição de Registros
- **Edição In-line**: Permite editar o nome e o CPF/CNPJ diretamente na lista de resultados.
- **Validação**: Aplica as mesmas regras de validação dos campos de entrada durante a edição.

### 4. Exclusão de Registros
- **Exclusão In-line**: Permite excluir registros diretamente na lista de resultados.
- **Confirmação**: Solicita confirmação antes de excluir um registro.

## Como Rodar o Projeto

### Pré-requisitos
- Python 3.12 ou superior
- Pip (gerenciador de pacotes do Python)
- SQLite (banco de dados)

### Passo a Passo

1. **Clone o Repositório**
   ```sh
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio ```
   
2. ## Crie um Ambiente Virtual
```sh
python -m venv venv
```  

3. ## Ative o Ambiente Virtual
* No Windows:
```sh
venv\Scripts\activate
```  
* No Linux/Mac:
```sh
source venv/bin/activate
```  
4. ## Instale as Dependências
```sh
pip install -r requirements.txt
```
5. ## Crie o Banco de Dados  
```sh
python create_tables.py
```
6. ## Inicie o Servidor Flask
```sh
python app.py
```
7. ## Acesse a Aplicação Abra o navegador e acesse
* Link: http://127.0.0.1:5000/

# Estrutura do projeto 

Base de dados para teste
├── static
│   ├── css
│   │   └── style.css
│   └── js
│       └── script.js
├── templates
│   └── index.html
├── app.py
├── create_tables.py
├── requirements.txt
└── README.md
# Detalhes dos Arquivos
* app.py: Arquivo principal do servidor Flask, contendo as rotas e a lógica de backend.
* create_tables.py: Script para criar as tabelas no banco de dados SQLite.
* static/css/style.css: Arquivo de estilos CSS para a aplicação.
* static/js/script.js: Arquivo JavaScript contendo a lógica de frontend.
* templates/index.html: Arquivo HTML principal da aplicação.
* requirements.txt: Arquivo contendo as dependências do projeto.

# Contribuição 
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias e correções.

# Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.

# Desenvolvido por Bruno Bertin







