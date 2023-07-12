async function listaProdutos(){
    const conexao = await fetch("http://localhost:3000/produtos")
    const conexaoConvertida = await conexao.json()
    
    return conexaoConvertida
}

async function buscaProduto(termoDePesquisa){
    const conexao = await fetch(`http://localhost:3000/produtos?q=${termoDePesquisa}`);
    const conexaoConvertida = await conexao.json()

    return conexaoConvertida
}

export const conectaApi = {
    listaProdutos,
    buscaProduto
}