
// Registro de Novos Alunos

function registrarCandidato() {
    const nome = document.getElementById('nome').value;
    const bi = document.getElementById('bi').value.toUpperCase();
    const idade = document.getElementById('idade').value;
    const contacto = document.getElementById('contacto').value;
    const curso = document.getElementById('curso').value;

    // Validação de Duplicados

    if (candidatos.some(c => c.bi === bi)) {
        alert("Já existe um candidato registado com este número de BI.");
        return;
    }

    const novoCandidato = {
        id: Date.now(),
        nome,
        bi,
        idade,
        contacto,
        curso,
        pontuacao: 0,
        status: 'Pendente',
        dataRegisto: new Date().toLocaleDateString('pt-AO')
    };

    candidatos.push(novoCandidato);
    saveDB();
    
    alert("Inscrição feita com sucesso no sistema IPIAL!");

    document.getElementById('formInscricao').reset();
    setTimeout(() => {
    window.location.href = "consulta.html";
  }, 1000);
}
