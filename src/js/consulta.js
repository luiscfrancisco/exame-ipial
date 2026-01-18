
// Busca de Candidato (Portal do Aluno)

function buscarCandidato() {
    const bi = document.getElementById('searchBI').value.toUpperCase();
    const resultDiv = document.getElementById('resultadoConsulta');
    
    const c = candidatos.find(cand => cand.bi === bi);

    if(!c) {
        alert("Candidato não encontrado no sistema.");
        resultDiv.classList.add('hidden');
        return;
    }

    const statusIcon = c.status === 'Aprovado' ? 'fa-check-circle' : c.status === 'Reprovado' ? 'fa-times-circle' : 'fa-clock';
    const statusColor = c.status === 'Aprovado' ? 'var(--success)' : c.status === 'Reprovado' ? 'var(--danger)' : 'var(--warning)';

    resultDiv.innerHTML = `

        <i class="fas fa-clock" style="color: green; margin-bottom: 1rem; font-size: 4rem"></i>

        <h3 style="color: black; font-size: 1.5rem; margin-bottom: 1rem;" >${c.nome}</h3>

        <p style="margin-bottom: 15px; color: #000;">
        <strong>Curso:</strong> ${c.curso}
        </p>

        <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px;">
        <div>
                
        <span style="display: block; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: #000; ">Estado:</span>
        
        <span class="badge ${c.status.toLowerCase()}">
        ${c.status}
        </span>

        <p style="font-size: 0.8rem; color: #888; margin-top: 20px;">Inscrito em: ${c.dataRegisto}</p>
    `;
    resultDiv.classList.remove('hidden');
}
