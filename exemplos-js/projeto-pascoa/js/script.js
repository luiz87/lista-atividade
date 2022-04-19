lista = [];
function buscarListaProduto() {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "js/produtos.json");
    ajax.send();
    ajax.onload = function () {
        lista = JSON.parse(this.response);
        replicar();
    }
}

function replicar() {
    let i = 0;
    for (const p of lista) {
        let id = i;
        let produto = document.querySelector(".produto").cloneNode(true);
        produto.querySelector(".titulo").innerHTML = p.nome.toUpperCase();
        produto.querySelector("img").src = `img/${p.img}`;
        produto.querySelector(".valor").innerHTML = `R$ ${p.valor}`;
        produto.querySelector(".descricao").innerHTML = p.descricao;
        produto.querySelector(".qt").innerHTML = p.qt;

        produto.querySelector(".menos").addEventListener("click", function () { alterarQt(id, -1) });
        produto.querySelector(".mais").addEventListener("click", function () { alterarQt(id, 1) });

        document.querySelector(".lista").append(produto);
        i++;
    }
    document.querySelector(".produto").remove();
}

function alterarQt(id, qt) {
    let p = lista[id];
    p.qt += qt;
    if (p.qt < 0) p.qt = 0;
    document.getElementsByClassName("qt")[id].innerHTML = p.qt;
}
let msgModal = "";
function mostrarPedido() {
    msgModal = "";
    let subTotal = 0;
    let total = 0;
    for (const produto of lista) {
        if (produto.qt > 0) {
            subTotal = (produto.valor * produto.qt).toFixed(2);
            total += +subTotal;
            msgModal += `<p>${produto.nome.toUpperCase()} (R$ ${produto.valor} x ${produto.qt}) = ${subTotal}</p>`;
        }
    }
    if (msgModal == "") {
        msgModal = "<p>Nenhum produto selecionado.</p>";
        document.querySelector("#btEnviar").disabled = "disabled";
    } else {
        msgModal += `<b>Total ${total.toFixed(2)}</b>`
        document.querySelector("#btEnviar").disabled = "";
    }
    document.querySelector(".modal-body").innerHTML = msgModal;
}

function enviar() {
    let fone = '';
    msgModal = msgModal.replaceAll("<p>", "").replaceAll("</p>", "\n");
    msgModal = msgModal.replaceAll("<b>", "*").replaceAll("</b>", "*");
    let nome = document.querySelector("#nome").value;
    let endereco = document.querySelector("#endereco").value;
    msgModal += `\nNome: *${nome}*`;
    msgModal += `\nEnderço: *${endereco}*`;
    msgModal = encodeURI(msgModal);

    link = `https://api.whatsapp.com/send?phone=${fone}&text=${msgModal}`;
    window.open(link, '_blanck')
}

buscarListaProduto();