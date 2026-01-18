// Banco de dados simulado no LocalStorage
let candidatos = JSON.parse(localStorage.getItem('ipial_db')) || [];

// Credenciais Admin Simulado
const user = "Luis_Dev";
const pass = "010101";

// Inicialização
document.addEventListener('DOMContentLoaded', () => {

    // Form de Inscrição
    
    document.getElementById('formInscricao').addEventListener('submit', function(e) {
        e.preventDefault();
        registrarCandidato();
    });

    // Form de Login
    
    document.getElementById('formLogin').addEventListener('submit', function(e) {
        e.preventDefault();
        loginAdmin();
    });
});

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
    const index = candidatos.findIndex(c => c.id === id);
    if(index !== -1) {
        candidatos[index].pontuacao = parseInt(val) || 0;
        saveDB();
        updateStats();
    }
}

function updateStatus(id, status) {
    const index = candidatos.findIndex(c => c.id === id);
    if(index !== -1) {
        candidatos[index].status = status;
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

// Persistência

function saveDB() {
    localStorage.setItem('ipial_db', JSON.stringify(candidatos));
}

// Geração de Relatório
function exportarRelatorio() {
    window.print();
}

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-menu");
  menu.classList.toggle ("open");
  icon.classList.toggle ("open");
}

