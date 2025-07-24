document.body.onload = function(){
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

function gerarRelatorio() {
    const antiga = document.querySelector("#tabelaCandidatos");
    if (antiga) {
        antiga.remove();
    }
    
    const tabela = document.createElement("table");
    tabela.classList.add("tabela-candidatos");
    tabela.id = "tabelaCandidatos";

    const cabecalho = document.createElement("tr");

    for (let i = 0; i < titulos.length; i++) {
        const th = document.createElement("th");
        th.innerHTML = titulos[i];
        cabecalho.appendChild(th);
    }

    tabela.appendChild(cabecalho);
    for (let i = 0; i < vetCandidatos.length; i++) {

        const linha = document.createElement("tr");

        const tdNome = document.createElement("td");
        tdNome.innerHTML = vetCandidatos[i];

        const tdCpf = document.createElement("td");
        tdCpf.innerHTML = vetCPF[i];

        const tdNascimento = document.createElement("td");
        tdNascimento.innerHTML = vetNascimento[i];

        const tdPontuacao = document.createElement("td");
        tdPontuacao.innerHTML = vetPontuacao[i];

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

function filtrarPorNome() {}