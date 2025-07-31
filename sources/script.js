//INICIALIZANDO 2 FUNÇÕES QUANDO O ARQUIVO É CARREGADO
document.body.onload = function () {
    gerarRelatorio(); //Gera a tabela principal
    escolherFiltro(); //Oculta os inputs da tela
    relatorioTop10(); //Gera a tabela do top 10
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

        const tdAprovacao = document.createElement("td");

        if (vetPontuacao[candidatosFiltrados[i]] >= 900) {
            tdAprovacao.innerHTML = "Classificado";
        } else {
            tdAprovacao.innerHTML = "Desclassificado";
        }

        //Anexa as colunas como filhas de linha
        linha.appendChild(tdNome);
        linha.appendChild(tdCpf);
        linha.appendChild(tdNascimento);
        linha.appendChild(tdPontuacao);
        linha.appendChild(tdAprovacao);

        //Anexa as linhas como filhas de tabela
        tabela.appendChild(linha);
    }

    //Anexa tabela como filho de tabelaMain no DOM
    document.getElementById("tabelaMain").appendChild(tabela);
}

//Oculta os inputs da tela
function escolherFiltro() {
    //Recebe o value do option selecionado dentro do select no html
    const filtro = sltFiltros.value;
    candidatosFiltrados = [];
    switch (filtro) {
        case "nome":
            inNome.style.display = "block";
            inAnoNascimento.style.display = "none";
            inPontuacao.style.display = "none";
            inAnoNascimento.value = "";
            inPontuacao.value = "";
            break;
        case "dataNascimento":
            inNome.style.display = "none";
            inAnoNascimento.style.display = "block";
            inPontuacao.style.display = "none";
            inNome.value = "";
            inPontuacao.value = "";
            break;
        case "pontuacao":
            inNome.style.display = "none";
            inAnoNascimento.style.display = "none";
            inPontuacao.style.display = "block";
            inNome.value = "";
            inAnoNascimento.value = "";
            break;
        default:
            inNome.style.display = "none";
            inAnoNascimento.style.display = "none";
            inPontuacao.style.display = "none";
            inNome.value = "";
            inPontuacao.value = "";
            inAnoNascimento.value = "";
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
    else if (inAnoNascimento.value) {
        //Chama a função
        filtrarPorAnoNascimento();
    }
    //Checa se o campo inPontuacao tem value ou não
    else if (inPontuacao.value) {
        //Chama a função
        filtrarPorPontuacao();
    }

}

//Filtra o vetor por pontuação
function filtrarPorPontuacao() {

    //Recebe pontuação
    var pontuacao = inPontuacao.value;
    //Onde os candidatos filtrados são armazenados
    var novosCandidatos = [];

    //Percorre candidatosFiltrados
    for (let i = 0; i < candidatosFiltrados.length; i++) {

        //armazena o índice do candidato na posição i
        var indice = candidatosFiltrados[i];

        //Checa se vetPontuacao na posicao indice é maior ou igual a pontuação recebida pelo
        //se for verdade
        //Adiciona a novosCandidatos
        if (vetPontuacao[indice] >= Number(pontuacao)) {
            novosCandidatos.push(indice);
        }
    }
    //Recolhe todos os novosCandidatos para serem utilizados em gerarRelatorio
    candidatosFiltrados = novosCandidatos;
}

//Filtra o vetor por ano de nascimento
function filtrarPorAnoNascimento() {

    //Recebe nome
    var filtroAno = Number(inAnoNascimento.value);
    //Onde os candidatos filtrados são armazenados
    var novosCandidatos = [];

    //Percorre candidatosFiltrados
    for (let i = 0; i < candidatosFiltrados.length; i++) {
        //armazena o índice do candidato na posição i
        var indice = candidatosFiltrados[i];
        //recebe a data na posição i
        var dataCompleta = vetNascimento[indice];
        //separa somente o ano da data
        var anoNascimento = Number(dataCompleta.split("/")[2]);

        //checa se a data é maior que o filtro
        //se for verdade
        //adiciona a novosCandidatos
        if (anoNascimento >= filtroAno) {
            novosCandidatos.push(indice)
        }
    }
    //Recolhe todos os novosCandidatos para serem utilizados em gerarRelatorio
    candidatosFiltrados = novosCandidatos;
}

//Filtra o vetor por nome
function filtrarPorNome() {

    //Recebe nome
    var filtroNome = inNome.value.toUpperCase();
    //Onde os candidatos filtrados são armazenados
    var novosCandidatos = [];

    //Percorre candidatosFiltrados
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

//Filtra os 10 candidatos com melhores notas
function filtrarTop10() {
    //Inicialmente percorre a primeira posição do vetor
    for (let i = 0; i < vetPontuacao.length - 1; i++) { //O "-1" garante que o for não percorra a última posição do vetor
        //Inicialmente percorre a segunda posição do vetor
        for (let j = i; j < vetPontuacao.length; j++) {
            //Checa inicialmente se a primeira posição do vetor [i] é menor que a segunda posição do vetor [j] 
            if (vetPontuacaoDecrescente[i] < vetPontuacaoDecrescente[j]) {
                //Caso verdadeiro troca ambos de lugar em todos os vetores decrescentes (cópias dos vetores originais);
                [vetPontuacaoDecrescente[i], vetPontuacaoDecrescente[j]] = [vetPontuacaoDecrescente[j], vetPontuacaoDecrescente[i]];
                [vetCandidatosDescrescente[i], vetCandidatosDescrescente[j]] = [vetCandidatosDescrescente[j], vetCandidatosDescrescente[i]];
                [vetNascimentoDescrescente[i], vetNascimentoDescrescente[j]] = [vetNascimentoDescrescente[j], vetNascimentoDescrescente[i]];
                [vetCPFDecrescente[i], vetCPFDecrescente[j]] = [vetCPFDecrescente[j], vetCPFDecrescente[i]];
            }
        }
    }
}

function relatorioTop10() {

    //Selecionando o elemento da tela
    const ultimaTabelaTop10 = document.querySelector("#tabelaTop10");
    //Apaga a ultimaTabela
    if (ultimaTabelaTop10) {
        ultimaTabelaTop10.remove();
    }
    //Criando o elemento no html <table></table>
    const tabela = document.createElement("table");
    //Adicionando uma class à <table></table>
    tabela.classList.add("tabela-Top10");
    //Adicionando um id à <table></table>
    tabela.id = "tabelaTop10";
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
    filtrarTop10();

    //Percorre candidatosFiltrados
    for (let i = 0; i < 10; i++) {
        //Cria linha para cada candidato
        const linha = document.createElement("tr");

        //Cria as colunas com informações para cada linha
        const tdNome = document.createElement("td");
        tdNome.innerHTML = vetCandidatosDescrescente[i];

        const tdCpf = document.createElement("td");
        tdCpf.innerHTML = vetCPFDecrescente[i];

        const tdNascimento = document.createElement("td");
        tdNascimento.innerHTML = vetNascimentoDescrescente[i];

        const tdPontuacao = document.createElement("td");
        tdPontuacao.innerHTML = vetPontuacaoDecrescente[i];

        const tdAprovacao = document.createElement("td");

        if (vetPontuacaoDecrescente[i] >= 900) {
            tdAprovacao.innerHTML = "Classificado";
        } else {
            tdAprovacao.innerHTML = "Desclassificado";
        }

        //Anexa as colunas como filhas de linha
        linha.appendChild(tdNome);
        linha.appendChild(tdCpf);
        linha.appendChild(tdNascimento);
        linha.appendChild(tdPontuacao);
        linha.appendChild(tdAprovacao);

        //Anexa as linhas como filhas de tabela
        tabela.appendChild(linha);
    }

    //Anexa tabela como filho de tabelaMain no DOM
    document.getElementById("tabelaSecundaria").appendChild(tabela);
}