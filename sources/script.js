document.body.onload = gerarRelatorio;
const sltFiltros = document.getElementById("sltFiltros");

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

sltFiltros.addEventListener("change", escolherFiltro);

function escolherFiltro() {
    const filtro = sltFiltros.value;
    

    switch (filtro) {
        case "nome":
            filtrarNome();
            break;
        case "dataNascimento":
            filtrarDataDeNascimento();

            break;
        case "pontuacao":
            filtrarPontuacao();

            break;

        default:
            gerarRelatorio();
            break;
    }
}

function filtrarNome() {
    const n = vetCandidatos.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = i; j < n; j++) {

            if (vetCandidatos[i].localeCompare(vetCandidatos[j]) > 0) {
                [vetCandidatos[i], vetCandidatos[j]] = [vetCandidatos[j], vetCandidatos[i]];
                [vetCPF[i], vetCPF[j]] = [vetCPF[j], vetCPF[i]];
                [vetNascimento[i], vetNascimento[j]] = [vetNascimento[j], vetNascimento[i]];
                [vetPontuacao[i], vetPontuacao[j]] = [vetPontuacao[j], vetPontuacao[i]];

                


            }

        }

    }
    gerarRelatorio();
}
