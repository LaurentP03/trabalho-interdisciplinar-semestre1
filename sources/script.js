document.body.onload = function () {
    gerarRelatorio();
    escolherFiltro();
}

const inNome = document.getElementById("inNome");
const inAnoNascimento = document.getElementById("inAnoNascimento");
const inPontuacao = document.getElementById("inPontuacao");
const sltFiltros = document.getElementById("sltFiltros");

inNome.addEventListener("input", gerarRelatorio);
inAnoNascimento.addEventListener("input", gerarRelatorio);
inPontuacao.addEventListener("input", gerarRelatorio);
sltFiltros.addEventListener("change", escolherFiltro);

var candidatosFiltrados = [];

function gerarRelatorio() {
    const antiga = document.querySelector("#tabelaCandidatos");
    if (antiga) {
        antiga.remove();
    }

    const tabela = document.createElement("table");
    tabela.classList.add("tabela-candidatos");
    tabela.id = "tabelaCandidatos";

    const cabecalho = document.createElement("tr");
    
    const titulos = ["Nome do Candidato", "CPF", "Nascimento", "Pontuação"];

    for (let i = 0; i < titulos.length; i++) {
        const th = document.createElement("th");
        th.innerHTML = titulos[i];
        cabecalho.appendChild(th);
    }

    tabela.appendChild(cabecalho);
    filtrarCandidatos();
    for (let i = 0; i < candidatosFiltrados.length; i++) {

        const linha = document.createElement("tr");

        const tdNome = document.createElement("td");
        tdNome.innerHTML = vetCandidatos[candidatosFiltrados[i]];

        const tdCpf = document.createElement("td");
        tdCpf.innerHTML = vetCPF[candidatosFiltrados[i]];

        const tdNascimento = document.createElement("td");
        tdNascimento.innerHTML = vetNascimento[candidatosFiltrados[i]];

        const tdPontuacao = document.createElement("td");
        tdPontuacao.innerHTML = vetPontuacao[candidatosFiltrados[i]];

        linha.appendChild(tdNome);
        linha.appendChild(tdCpf);
        linha.appendChild(tdNascimento);
        linha.appendChild(tdPontuacao);

        tabela.appendChild(linha);
    }
    document.getElementById("container").appendChild(tabela);
}

function escolherFiltro() {
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
function filtrarCandidatos() {

    candidatosFiltrados = [];

    for (let i = 0; i < vetCandidatos.length; i++) {
        candidatosFiltrados.push(i);
    
    }
    if (inNome.value) {
        filtrarPorNome();
    }
    if (inAnoNascimento.value) {
        filtrarPorAno();
    }
    if (inPontuacao.value) {
        filtrarPorPontuacao();
    }
}
function filtrarPorNome() {

    var filtroNome = inNome.value.toUpperCase();
    var novosCandidatos = [];

    for (let i = 0; i < candidatosFiltrados.length; i++){

        var indice = candidatosFiltrados[i];

        if (vetCandidatos[indice].toUpperCase().includes(filtroNome)) {
            novosCandidatos.push(indice);
        }
    }

    candidatosFiltrados = novosCandidatos;


    }