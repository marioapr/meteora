import {conectaApi} from "./conectaApi.js";

const novidades = document.querySelector('[data-novidades]');
const botoesCategoria = document.querySelectorAll(".categoria");
const botaoPesquisaDesktop = document.querySelector("[data-botao-pesquisaD]")

function criaCard(imagemMobile,imagemTablet, imagemDesktop, nome, descricao, preco, id) {
    const produto = document.createElement('div');
    produto.className = "novidades__card";

    produto.innerHTML = `
    <div class="card__imagem--mobile">
                    <img src="${imagemMobile}" alt="Um homem ao centro dando destaque para camiserta conforto laranja que ese esta usando">
                </div>
                <div class="card__imagem--tablet">
                    <img src="${imagemTablet}" alt="Um homem ao centro dando destaque para camiserta conforto laranja que ese esta usando">
                </div>
                <div class="card__imagem--desktop">
                    <img src="${imagemDesktop}" alt="Um homem ao centro dando destaque para camiserta conforto laranja que ese esta usando">
                </div>
                <div class="card__informacoes">
                    <h3 class="card__titulo">${nome}</h3>
                    <p class="card__descricao">${descricao}</p>
                    <p class="card__preco">R$ ${preco}</p>
                    <button class="card__botao" id="${id}">Ver mais</button>
                </div>`

    return produto
}


async function listaProduto() {
    const lista = await conectaApi.listaProdutos();
    lista.forEach(elemento => {
        if(elemento.novidade == true){
            novidades.appendChild(criaCard(elemento.imagemMobile,elemento.imagemTablet, elemento.imagemDesktop, elemento.nome, elemento.descricao, elemento.preco, elemento.id))
        }
    });
}

listaProduto()

// FILTRO DE PRODUTOS

botoesCategoria.forEach(botao => {
    botao.addEventListener('click', filtraProduto)
})

async function filtraProduto() {
    const elementoBotao = document.getElementById(this.id)
    const categoria = elementoBotao.value;
    const lista = await conectaApi.listaProdutos();
     const produtosFiltrados = lista.filter(produto => produto.categoria == categoria)

     novidades.innerHTML = "";
     produtosFiltrados.forEach(elemento => {
            novidades.appendChild(criaCard(elemento.imagemMobile,elemento.imagemTablet, elemento.imagemDesktop, elemento.nome, elemento.descricao, elemento.preco, elemento.id))
    })
}

// BUSCA DE PRODUTO

async function buscaProduto(evento) {
    evento.preventDefault()
    const termoDePesquisa = document.querySelector('[data-pesquisa-desktop]').value;
    const busca = await conectaApi.buscaProduto(termoDePesquisa);

    while(novidades.firstChild){
        novidades.removeChild(novidades.firstChild)
    }

    busca.forEach(elemento => {
        novidades.appendChild(criaCard(elemento.imagemMobile,elemento.imagemTablet, elemento.imagemDesktop, elemento.nome, elemento.descricao, elemento.preco, elemento.id))
    })
};

botaoPesquisaDesktop.addEventListener('click', evento => buscaProduto(evento));

// MODAL

const botaoModal = document.querySelector(".card__botao");
const sectionModal = document.getElementById("section__modal")

async function chamaModal(){
    const elementoBotao = document.getElementById(this.id)
    const id = elementoBotao.id;
    const lista = await conectaApi.listaProdutos();
     const produtosFiltrados = lista.filter(produto => produto.id == id)

     sectionModal.innerHTML = ''
     produtosFiltrados.forEach(elemento => {
            sectionModal.appendChild(criaModal(elemento.imagemMobile, elemento.imagemDesktop, elemento.nome, elemento.descricao, elemento.preco).showModal())
        })


}


botaoModal.addEventListener('click', chamaModal);

console.log(botaoModal);

function criaModal(imagemMobile, imagemDesktop, nome, descricao, preco) {
    const produto = document.createElement('div');
    produto.className = "novidades__card";

    produto.innerHTML = `<dialog class="modal__produto">
    <div class="modal__contato--preto">
        <img src="./assets/Mobile/Ícones/check-circle.svg" alt="">
        <p>Confira detalhes sobre o produto</p>
        <button class="modal__contato--fechar"></button>
    </div>
    <div class="modal__produto--conteudo">
    <div>
        <img src="${imagemMobile}" alt="" class="modal__imagem--mobile">
        <img src="${imagemDesktop}" alt="" class="modal__imagem--dekstop">
    </div>
    <div class="modal__informacoes">
        <h3  class="modal__produto--nome">${nome}</h3>
        <p  class="modal__produto--descricao">${descricao}</p>
        
        <div class="modal__produto--linha"></div>
        <p  class="modal__produto--preco">R$ ${preco}</p>
        <p  class="modal__produto--loja">Vendido e entregue por Riachuelo</p>

        <hr>
        <P class="modal__produto--legenda">Cores:</P>
        <form class="modal__produto--formulario">
            <div>
                <input type="radio" name="azul-claro" id="">
                <label for="azul-claro">Azul claro</label>
            </div>
            <div>
                <input type="radio" name="offwhite" id="">
                <label for="offwhite">Offwhite</label>
            </div>
            <div>
                <input type="radio" name="preto" id="">
                <label for="preto">Preto</label>
            </div>
        </form>

        <hr>
         <P class="modal__produto--legenda">Tamanho:</P>
        <form action=""  class="modal__produto--formulario">

            <div>
                <input type="radio" name="pp" id="">
                <label for="pp">PP</label>
            </div>

            <div>
                <input type="radio" name="p" id="">
                <label for="p">P</label>
            </div>

            <div>
                <input type="radio" name="m" id="">
                <label for="m">M</label>
            </div>

            <div>
                <input type="radio" name="g" id="">
                <label for="g">G</label>
            </div>

            <div>
                <input type="radio" name="gg" id="">
                <label for="gg">GG</label>
            </div>
        </form>
        <button class="modal__produto--botao">Adicionar à sacola</button>
    </div>
</div>
</dialog>
`

    return produto
}
