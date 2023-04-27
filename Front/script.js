document.getElementById('tipo-usuario').addEventListener('change', function () {
    var tipoUsuario = this.value;
    mostrarCamposDeInput(tipoUsuario);
});

function mostrarCamposDeInput(tipoUsuario) {
    if (tipoUsuario === 'admin') {
        document.getElementById('campos-admin').style.display = 'block';
        document.getElementById('campos-aluno').style.display = 'none';
        document.getElementById('campos-professor').style.display = 'none';
    }
    else if (tipoUsuario === 'aluno') {
        document.getElementById('campos-admin').style.display = 'none';
        document.getElementById('campos-aluno').style.display = 'block';
        document.getElementById('campos-professor').style.display = 'none';
    }
    else if (tipoUsuario === 'professor') {
        document.getElementById('campos-admin').style.display = 'none';
        document.getElementById('campos-aluno').style.display = 'none';
        document.getElementById('campos-professor').style.display = 'block';
    }
}