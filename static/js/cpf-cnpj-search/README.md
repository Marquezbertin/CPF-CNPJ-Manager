# CPF/CNPJ Search Application

This project is a simple application that allows users to search for information based on CPF (Cadastro de Pessoas Físicas) or CNPJ (Cadastro Nacional da Pessoa Jurídica) numbers. It connects to a database to retrieve relevant data and includes validation for the input formats.

## Project Structure

```
cpf-cnpj-search
├── src
│   ├── index.js          # Entry point of the application
│   ├── database.js       # Database connection and queries
│   └── utils
│       └── validate.js   # Utility functions for input validation
├── package.json          # npm configuration file
└── README.md             # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/cpf-cnpj-search.git
   ```

2. Navigate to the project directory:
   ```
   cd cpf-cnpj-search
   ```

3. Install the required dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run the following command:
```
node src/index.js
```

You will be prompted to enter a CPF or CNPJ number. The application will validate the input and search the database for the corresponding information.

## Functionality

- **Search by CPF**: The application allows users to input a CPF number, which is validated before querying the database.
- **Search by CNPJ**: Similarly, users can input a CNPJ number, which is also validated before performing the search.
- **Input Validation**: The application includes utility functions to ensure that the CPF and CNPJ formats are correct before any database operations are executed.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.