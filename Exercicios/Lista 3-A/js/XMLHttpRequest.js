export const funcaoXMLHttpRequest = () => {

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            console.log(xhttp.responseText);
        }
    }

    xhttp.open("GET", "https://raw.githubusercontent.com/VictorHugoSDev/Projeto_Front-End_Web_Javascript/refs/heads/main/Exercicios/Lista%203-A/usuario.json")
    xhttp.send();

};