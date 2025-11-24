let cardsContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("#campo-busca");
let dados = [];

// Adiciona um "ouvinte" que aguarda um evento no campo de busca.
// Neste caso, o evento é 'keydown', que significa "quando uma tecla for pressionada".
campoBusca.addEventListener('keydown', (event) => {
    // Verifica se a tecla pressionada foi a 'Enter'.
    if (event.key === 'Enter') {
        iniciarBusca(); // Se for 'Enter', executa a função de busca.
    }
});

async function iniciarBusca() {
    // Se os dados ainda não foram carregados, busca do JSON.
    if (dados.length === 0) {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
    }

    const termoBusca = campoBusca.value.toLowerCase();

    const dadosFiltrados = dados.filter(dado => {
        // Busca no nome e na descrição da linguagem
        return dado.nome.toLowerCase().includes(termoBusca) ||
               dado.descricao.toLowerCase().includes(termoBusca);
    });

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardsContainer.innerHTML = ""; // Limpa os cards antigos antes de renderizar os novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.ano}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `
        cardsContainer.appendChild(article);
    }
}