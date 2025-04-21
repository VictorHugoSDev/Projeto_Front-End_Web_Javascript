import ajax from './ajax.js';

window.addEventListener("DOMContentLoaded", () => {
    ajax.carregarAlunos();

    const select = document.getElementById("filtroEstudantes");
    select.addEventListener("change", (e) => {
        ajax.filtrarAlunos(e.target.value);
    });
});
