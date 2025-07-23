document.body.onload = gerarRelatorio;
const sltFiltros = document.getElementById("sltFiltros");

function gerarRelatorio() {
    const tabela = document.createElement("table");
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
        tdPontuacao.innerHTML = vetNascimento[i];
        linha.appendChild(tdNome);
        linha.appendChild(tdCpf);
        linha.appendChild(tdNascimento);
        linha.appendChild(tdPontuacao);
        tabela.appendChild(linha);
    }
    document.getElementById("container").appendChild(tabela);
}

sltFiltros.addEventListener("change", filtrarRelatorio);

function filtrarRelatorio() {
}
