const CHAVE_API = 'b89caa5bb1896accd4c7372822ae1903';

const buscarFilmes = async (pagina = 1) => {
    try {
        const paginaApi = Math.ceil(pagina / 2);
        const indiceInicial = (pagina % 2 === 1) ? 0 : 10;

        const respostaGeneros = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${CHAVE_API}&language=pt-BR`);
        const dadosGeneros = await respostaGeneros.json();
        const mapaGeneros = {};
        dadosGeneros.genres.forEach(g => mapaGeneros[g.id] = g.name);

        const urlBase = `https://api.themoviedb.org/3/movie/popular?api_key=${CHAVE_API}&language=pt-BR&page=${paginaApi}`;

        const respostaFilmes = await fetch(urlBase);
        const dadosFilmes = await respostaFilmes.json();

        const selecionados = dadosFilmes.results.slice(indiceInicial, indiceInicial + 10);

        const filmes = selecionados.map(f => ({
            title: f.title,
            poster_path: f.poster_path,
            genres: (f.genre_ids || []).map(id => mapaGeneros[id]).join(', '),
            overview: f.overview || 'Sinopse não disponível.',
            vote_average: f.vote_average
        }));

        const totalPaginas = Math.min(dadosFilmes.total_pages * 2, 1000);
        return { movies: filmes, totalPages: totalPaginas };
    } catch (erro) {
        console.error('Erro ao buscar filmes:', erro);
        return { movies: [], totalPages: 1 };
    }
};

export default buscarFilmes;