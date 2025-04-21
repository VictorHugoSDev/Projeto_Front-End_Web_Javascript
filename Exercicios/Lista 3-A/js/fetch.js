export const funcaoFetch = () => {
    
    fetch("https://raw.githubusercontent.com/VictorHugoSDev/Projeto_Front-End_Web_Javascript/refs/heads/main/Exercicios/Lista%203-A/usuario.json")
        .then(response => response.json())
        .then(usuario => {
            const {nome, idade } = usuario;
            console.log({nome, idade});
        })
};