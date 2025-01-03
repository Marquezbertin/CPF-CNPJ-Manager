document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const addForm = document.getElementById('add-form');
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result';
    searchForm.appendChild(resultDiv);
    const alertDiv = document.getElementById('alert');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(searchForm);

        fetch('/search', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                resultDiv.innerHTML = data.map(item => `
                    <div>
                        ${item.name} - ${item.cpf || item.cnpj}
                        <button onclick="editRecord(${item.id}, '${item.name}', '${item.cpf || item.cnpj}', '${searchForm.search_type.value}')">Editar</button>
                        <button onclick="deleteRecord(${item.id}, '${searchForm.search_type.value}')">Excluir</button>
                    </div>
                `).join('');
            } else {
                resultDiv.textContent = 'Nenhum resultado encontrado.';
            }
        });
    });

    document.getElementById('clear-search').addEventListener('click', function() {
        searchForm.reset();
        resultDiv.textContent = '';
    });

    document.getElementById('refresh-page').addEventListener('click', function() {
        location.reload();
    });

    addForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(addForm);

        fetch('/add', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(({ status, body }) => {
            showAlert(body.message, status === 201 ? 'success' : 'error');
            if (status === 201) {
                addForm.reset();
            }
        });
    });

    document.getElementById('toggle-add-form').addEventListener('click', function() {
        addForm.classList.toggle('hidden');
        addForm.classList.toggle('show');
    });

    document.getElementById('clear-add-form').addEventListener('click', function() {
        addForm.reset();
    });

    function showAlert(message, type) {
        alertDiv.textContent = message;
        alertDiv.className = `alert alert-${type} show`;
        setTimeout(() => {
            alertDiv.className = 'alert hidden';
        }, 3000);
    }

    // Validação dos campos de entrada
    document.getElementById('add_name').addEventListener('input', function(event) {
        const value = event.target.value;
        event.target.value = value.replace(/[^a-zA-Z\s]/g, '');
    });

    document.getElementById('add_term').addEventListener('input', function(event) {
        const value = event.target.value;
        event.target.value = value.replace(/[^0-9.-]/g, '');
    });
});

function editRecord(id, name, term, type) {
    let newName = prompt("Editar Nome:", name);
    let newTerm = prompt("Editar CPF/CNPJ:", term);

    // Validação dos campos de entrada
    if (newName) {
        newName = newName.replace(/[^a-zA-Z\s]/g, '');
    }
    if (newTerm) {
        newTerm = newTerm.replace(/[^0-9.-]/g, '');
    }

    if (newName && newTerm) {
        const formData = new FormData();
        formData.append('edit_id', id);
        formData.append('edit_name', newName);
        formData.append('edit_term', newTerm);
        formData.append('edit_type', type);

        fetch('/edit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            showAlert(data.message, 'success');
            location.reload();
        });
    }
}

function deleteRecord(id, type) {
    if (confirm("Tem certeza que deseja excluir este registro?")) {
        const formData = new FormData();
        formData.append('delete_id', id);
        formData.append('delete_type', type);

        fetch('/delete', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            showAlert(data.message, 'success');
            location.reload();
        });
    }
}