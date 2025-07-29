//INICIALIZANDO 2 FUNÇÕES QUANDO O ARQUIVO É CARREGADO
document.body.onload = function () {
    gerarRelatorio(); //Gera a tabela
    escolherFiltro(); //Oculta os inputs da tela
}

//Acessando os campos da tela
const inNome = document.getElementById("inNome");
const inAnoNascimento = document.getElementById("inAnoNascimento");
const inPontuacao = document.getElementById("inPontuacao");
const sltFiltros = document.getElementById("sltFiltros");

//Acionam funções de acordo com a instruções
inNome.addEventListener("input", gerarRelatorio);
inAnoNascimento.addEventListener("input", gerarRelatorio);
inPontuacao.addEventListener("input", gerarRelatorio);
sltFiltros.addEventListener("change", escolherFiltro);

var candidatosFiltrados = [];

//Gera a tabela
function gerarRelatorio() {
    //Selecionando o elemento da tela
    const ultimaTabela = document.querySelector("#tabelaCandidatos");
    //Apaga a ultimaTabela
    if (ultimaTabela) {
        ultimaTabela.remove();
    }
    //Criando o elemento no html <table></table>
    const tabela = document.createElement("table");
    //Adicionando uma class à <table></table>
    tabela.classList.add("tabela-candidatos");
    //Adicionando um id à <table></table>
    tabela.id = "tabelaCandidatos";
    //Criando a primeira linha da tabela que contém os títulos
    const cabecalho = document.createElement("thead");
    //Olha no vetor titulos
    for (let i = 0; i < titulos.length; i++) {
        //Cria uma coluna para cada posição do vetor
        const th = document.createElement("th");
        //Põe em cada coluna criada seu respectivo título
        th.innerHTML = titulos[i];
        //Tornando th filho de thead
        //Inserindo th em cabecalho
        cabecalho.appendChild(th);
    }
    //Tornando cabecalho filho de table
    //Inserindo cabecalho em tabela
    tabela.appendChild(cabecalho);

    //Salvar as posições dos candidatos no vetor de acordo com o filtro
    filtrarCandidatos();

    //Percorre candidatosFiltrados
    for (let i = 0; i < candidatosFiltrados.length; i++) {
        //Cria linha para cada candidato
        const linha = document.createElement("tr");

        //Cria as colunas com informações para cada linha
        const tdNome = document.createElement("td");
        tdNome.innerHTML = vetCandidatos[candidatosFiltrados[i]];

        const tdCpf = document.createElement("td");
        tdCpf.innerHTML = vetCPF[candidatosFiltrados[i]];

        const tdNascimento = document.createElement("td");
        tdNascimento.innerHTML = vetNascimento[candidatosFiltrados[i]];

        const tdPontuacao = document.createElement("td");
        tdPontuacao.innerHTML = vetPontuacao[candidatosFiltrados[i]];

        //Anexa as colunas como filhas de linha
        linha.appendChild(tdNome);
        linha.appendChild(tdCpf);
        linha.appendChild(tdNascimento);
        linha.appendChild(tdPontuacao);

        //Anexa as linhas como filhas de tabela
        tabela.appendChild(linha);
    }

    //Anexa tabela como filho de container no DOM
    document.getElementById("container").appendChild(tabela);
}

//Oculta os inputs da tela
function escolherFiltro() {
    //Recebe o value do option selecionado dentro do select no html
    const filtro = sltFiltros.value;

    switch (filtro) {
        case "nome":
            inNome.style.display = "block";
            inAnoNascimento.style.display = "none";
            inPontuacao.style.display = "none";
            break;
        case "dataNascimento":
            inNome.style.display = "none";
            inAnoNascimento.style.display = "block";
            inPontuacao.style.display = "none";
            break;
        case "pontuacao":
            inNome.style.display = "none";
            inAnoNascimento.style.display = "none";
            inPontuacao.style.display = "block";
            break;
        default:
            inNome.style.display = "none";
            inAnoNascimento.style.display = "none";
            inPontuacao.style.display = "none";
            break;
    }
}

//Salvar as posições dos candidatos no vetor de acordo com o filtro
function filtrarCandidatos() {
    //Apaga as posições salvas dos candidatos filtrados
    candidatosFiltrados = [];

    //Salva as posições de vetCandidatos
    for (let i = 0; i < vetCandidatos.length; i++) {
        candidatosFiltrados.push(i);
    }
    //Checa se o campo inNome tem value ou não
    if (inNome.value) {
        //Chama a função
        filtrarPorNome();
    }
    //Checa se o campo inAnoNascimento tem value ou não
    if (inAnoNascimento.value) {
        //Chama a função
        filtrarPorAnoNascimento();
    }
    //Checa se o campo inPontuacao tem value ou não
    if (inPontuacao.value) {
        //Chama a função
        filtrarPorPontuacao();
    }

}

function filtrarPorPontuacao() {

    var pontuacao = inPontuacao.value;
    var novosCandidatos = [];

    for (let i = 0; i < candidatosFiltrados.length; i++) {
        
        var indice = candidatosFiltrados[i];

        if ((vetPontuacao[indice]) >= pontuacao) {
            novosCandidatos.push(indice);
        }
    }
    candidatosFiltrados = novosCandidatos;
}

//Filtra o vetor por nome
function filtrarPorNome() {

    //Recebe nome
    var filtroNome = inNome.value.toUpperCase();
    //Onde os candidatos filtrados são armazenados
    var novosCandidatos = [];

    //Percorre vetCandidatos
    for (let i = 0; i < vetCandidatos.length; i++) {

        //Armazena o índice do candidato filtrado
        var indice = candidatosFiltrados[i];

        //Se o candidato na posição indice incluir o nome do filtro
        if (vetCandidatos[indice].toUpperCase().includes(filtroNome)) {
            //Adiciona o candidato a novosCandidatos
            novosCandidatos.push(indice);
        }
    }

    //Recolhe todos os novosCandidatos para serem utilizados em gerarRelatorio
    candidatosFiltrados = novosCandidatos;

}