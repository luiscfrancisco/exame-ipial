
// Renderização da Tabela Admin

function renderTable() {
    const tbody = document.querySelector('#tabelaCandidatos tbody');
    const filtroNome = document.getElementById('filtroNome').value.toLowerCase();
    const filtroCurso = document.getElementById('filtroCurso').value;

    tbody.innerHTML = '';

    const filtrados = candidatos.filter(c => {
        return (c.nome.toLowerCase().includes(filtroNome) || c.bi.toLowerCase().includes(filtroNome)) &&
        (filtroCurso === "" || c.curso === filtroCurso);
    });

    filtrados.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `

        <td>
            <strong>${c.nome}</strong><br><small style="color:#888">${c.contacto}</small></td>
            <td>${c.bi}</td>
            <td><span style="font-size: 0.8rem; font-weight: 600;">${c.curso}</span>
        </td>

        <td>
            <input type="number" min="0" max="20" value="${c.pontuacao}" 
            onchange="updateScore(${c.id}, this.value)" 
            style="width: 60px; padding: 5px; border-radius: 4px; border: 1px solid #ddd; text-align: center; font-weight: bold; color: #000;">
        </td>

        <td>
            <span class="badge ${c.status.toLowerCase()}">${c.status}</span>
        </td>

        <td class="no-print">
            <div class="action-btns">
                <button class="action-btn" style="background: green; cursor: pointer;" onclick="updateStatus(${c.id}, 'Aprovado')" title="Aprovar"><i class="fas fa-check"></i>
                </button>

                <button class="action-btn" style="background: red;" onclick="updateStatus(${c.id}, 'Reprovado')" title="Reprovar"><i class="fas fa-times"></i>
                </button>

                <button class="action-btn" style="background: #000; color: #fff;" onclick="removerCandidato(${c.id})" title="Remover"><i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
        `;
        tbody.appendChild(tr);
    });
}

function updateStats() {
    document.getElementById('statTotal').innerText = candidatos.length;
    document.getElementById('statAprovados').innerText = candidatos.filter(c => c.status === 'Aprovado').length;
    document.getElementById('statReprovados').innerText = candidatos.filter(c => c.status === 'Reprovado').length;
}

// Ações do Dashboard

function updateScore(id, val) {
    const cnd = candidatos.findIndex(c => c.id === id);
    if(cnd !== -1) {
        candidatos[cnd].pontuacao = parseInt(val) || 0;
        saveDB();
        updateStats();
    }
}

function updateStatus(id, status) {
    const cand = candidatos.findIndex(c => c.id === id);
    if(cand !== -1) {
        candidatos[cand].status = status;
        saveDB();
        renderTable();
        updateStats();
    }
}

function removerCandidato(id) {
    if(confirm("Deseja eliminar este candidato da base de dados do IPIAL?")) {
        candidatos = candidatos.filter(c => c.id !== id);
        saveDB();
        renderTable();
        updateStats();
    }
}

// Geração de Relatório

function exportarRelatorio() {
    window.print();
}