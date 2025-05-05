import buscarFilmes from './getMovies.js';
import atualizarPaginacao from './pagination.js';

const containerFilmes = document.getElementById('filmes');
let paginaAtual = 1;
let totalPaginasLocal = 1;
let carregando = false;

// Exibe os filmes
const exibirFilmes = async (pagina) => {
    if (carregando) return;

    carregando = true;
    alternarBotoesPaginacao(true);

    const { movies, totalPages } = await buscarFilmes(pagina);
    paginaAtual = pagina;
    totalPaginasLocal = totalPages;

    containerFilmes.innerHTML = '';
    movies.forEach(filme => {
        const div = document.createElement('div');
        div.classList.add('filme');
        div.innerHTML = `
            <h2>${filme.title}</h2>
            <img src="https://image.tmdb.org/t/p/w200${filme.poster_path}" alt="${filme.title}">
            <p><strong>Gêneros:</strong> ${filme.genres}</p>
            <p><strong>Sinopse:</strong> ${filme.overview || 'Sinopse não disponível'}</p>
            <p><strong>Nota:</strong> ${filme.vote_average}</p>
        `;
        containerFilmes.appendChild(div);
    });

    atualizarPaginacao(paginaAtual, totalPaginasLocal, exibirFilmes);
    carregando = false;
    alternarBotoesPaginacao(false);
};

// Ativa/desativa botões de navegação
const alternarBotoesPaginacao = (desabilitar) => {
    const botaoPrimeira = document.getElementById('botao-primeira');
    const botaoUltima = document.getElementById('botao-ultima');

    if (botaoPrimeira && botaoUltima) {
        botaoPrimeira.disabled = desabilitar;
        botaoUltima.disabled = desabilitar;
    }
};

// Inicia a exibição
exibirFilmes(paginaAtual);