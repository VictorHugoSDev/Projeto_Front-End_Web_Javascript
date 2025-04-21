const url = "https://wilton-filho.github.io/PFJS-GitHub/bases/alunos.json";

let alunos = [];

function renderizar(resultado) {
    const div = document.getElementById("resultado");

    if (Array.isArray(resultado)) {
        if (resultado.length === 0) {
            div.innerHTML = `<p>Nenhum aluno encontrado.</p>`;
        } else {
            div.innerHTML = resultado.map(aluno => {
                const total = aluno.notaBim1 + aluno.notaBim2;
                return `<p>${aluno.nome}: ${aluno.notaBim1} (bimestre 1) e ${aluno.notaBim2} (bimestre 2) = ${total}</p>`;
            }).join("");
        }
    } else {
        div.innerHTML = `<p>${resultado}</p>`;
    }
}

const filtrarAlunos = (tipo) => {
    switch (tipo) {
        case "todos":
            renderizar(alunos);
            break;
        case "homens":
            renderizar(alunos.filter(a => a.sexo === "M"));
            break;
        case "mulheres":
            renderizar(alunos.filter(a => a.sexo === "F"));
            break;
        case "aprovados":
            renderizar(alunos.filter(a => (a.notaBim1 + a.notaBim2) >= 60));
            break;
        case "reprovados":
            renderizar(alunos.filter(a => (a.notaBim1 + a.notaBim2) < 60));
            break;
        case "todos_aprovados":
            const todosAprovados = alunos.every(a => (a.notaBim1 + a.notaBim2) >= 60);
            renderizar(todosAprovados ? "Sim" : "Não");
            break;
        case "nota_media":
            const somaNotas = alunos.reduce((acc, aluno) => acc + aluno.notaBim1 + aluno.notaBim2, 0);
            const mediaTurma = somaNotas / alunos.length;
            renderizar(`Nota média = ${mediaTurma.toFixed(2)}`);
            break;
        default:
            renderizar("");
    }
};

const carregarAlunos = async () => {
    try {
        const resp = await fetch(url);
        alunos = await resp.json();
    } catch (err) {
        console.error("Erro ao carregar alunos:", err);
        renderizar("Erro ao buscar os dados.");
    }
};

export default {
    carregarAlunos,
    filtrarAlunos
};