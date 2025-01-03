const express = require('express');
const bodyParser = require('body-parser');
const { searchByCpf, searchByCnpj } = require('./database');
const { isValidCpf, isValidCnpj } = require('./utils/validate');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/search', (req, res) => {
    const { type, value } = req.body;

    if (type === 'cpf') {
        if (!isValidCpf(value)) {
            return res.status(400).json({ error: 'Invalid CPF format' });
        }
        const result = searchByCpf(value);
        return res.json(result);
    } else if (type === 'cnpj') {
        if (!isValidCnpj(value)) {
            return res.status(400).json({ error: 'Invalid CNPJ format' });
        }
        const result = searchByCnpj(value);
        return res.json(result);
    } else {
        return res.status(400).json({ error: 'Invalid search type. Use "cpf" or "cnpj".' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});