const atualizarPaginacao = (paginaAtual, totalPaginas, exibirFilmes) => {
    const containerPaginacao = document.getElementById('paginacao');
    containerPaginacao.innerHTML = '';

    // Botão "Primeira"
    const botaoPrimeira = document.createElement('button');
    botaoPrimeira.id = 'botao-primeira';
    botaoPrimeira.textContent = 'Primeira';
    botaoPrimeira.disabled = paginaAtual === 1;
    botaoPrimeira.addEventListener('click', () => {
        if (paginaAtual > 1) {
            exibirFilmes(1);
        }
    });
    containerPaginacao.appendChild(botaoPrimeira);

    // Botão "<<"
    const botaoAnterior = document.createElement('button');
    botaoAnterior.textContent = '<<';
    botaoAnterior.disabled = paginaAtual === 1;
    botaoAnterior.addEventListener('click', () => {
        if (paginaAtual > 1) {
            exibirFilmes(paginaAtual - 1);
        }
    });
    containerPaginacao.appendChild(botaoAnterior);

    // Botões das páginas
    const maximoPaginasVisiveis = 10;
    const paginaInicial = Math.max(1, paginaAtual - Math.floor(maximoPaginasVisiveis / 2));
    const paginaFinal = Math.min(totalPaginas, paginaInicial + maximoPaginasVisiveis - 1);

    for (let i = paginaInicial; i <= paginaFinal; i++) {
        const botaoPagina = document.createElement('button');
        botaoPagina.textContent = i;
        if (i === paginaAtual) botaoPagina.classList.add('active-page');
        botaoPagina.addEventListener('click', () => exibirFilmes(i));
        containerPaginacao.appendChild(botaoPagina);
    }

    // Botão ">>"
    const botaoProxima = document.createElement('button');
    botaoProxima.textContent = '>>';
    botaoProxima.disabled = paginaAtual === totalPaginas;
    botaoProxima.addEventListener('click', () => {
        if (paginaAtual < totalPaginas) {
            exibirFilmes(paginaAtual + 1);
        }
    });
    containerPaginacao.appendChild(botaoProxima);

    // Botão "Última"
    const botaoUltima = document.createElement('button');
    botaoUltima.id = 'botao-ultima';
    botaoUltima.textContent = 'Última';
    botaoUltima.disabled = paginaAtual === totalPaginas;
    botaoUltima.addEventListener('click', () => {
        exibirFilmes(totalPaginas);
    });
    containerPaginacao.appendChild(botaoUltima);
};

export default atualizarPaginacao;