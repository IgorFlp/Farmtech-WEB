// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

const { eventListeners } = require("@popperjs/core");

function Produto(id, nome, unMedida, precoUn) {
    this.id = id;
    this.nome = nome;
    this.unMedida = unMedida;
    this.precoUn = precoUn;
}

function selecionaProduto() {
    let produtoId = 
    let spanId = this.parentElement.id;
    console.log("ID: "+spanId)
}

function addItem() {
    //remover essa parte daqui
    const prod = new Produto(1, "Alface", "Kg", 3.50);
    const prod2 = new Produto(2, "Tomate", "Kg", 5.59);
    const prod3 = new Produto(3, "Berinjela", "Un", 8.00);
    let listaProdutos = [prod, prod2, prod3];
    //
    
    console.log("Entrou na função");
    let contagem = document.querySelectorAll(".produto-span");
    let Nomeid = contagem.length + 1;
    console.log("Contagem: " + contagem + "ID: " + Nomeid);
    var spanItem = document.createElement('span');
    spanItem.className = 'd-flex flex-row item-span mt-1 produto-span';
    spanItem.id = 'produto-' + Nomeid;
    console.log("Criou span: "+spanItem);

    // Cria o input checkbox
    var checkbox = document.createElement('input');
    checkbox.className = 'check-item centralizar';
    checkbox.style.marginLeft = '1rem';
    checkbox.style.marginRight = '0.5rem';
    checkbox.type = 'checkbox';
    spanItem.appendChild(checkbox);
    console.log("Criou checkbox: "+checkbox);

    // Cria o select para o nome do item
    var selectNome = document.createElement('select');
    selectNome.className = 'produto-select';
    selectNome.className = 'centralizar';
    selectNome.onchange = selecionaProduto;
    selectNome.style.marginRight = '5%';
    selectNome.style.borderRadius = '5px';
    selectNome.style.height = '80%';
    selectNome.style.width = '45%';
    //class="centralizar" style="height: 80%; width:45%; border-radius:5px; margin-right: 5%;
    
    console.log("Criou select nome: " + selectNome);
    var option = document.createElement('option');
    option.innerText = "-Selecione um produto-";    
    selectNome.appendChild(option);

    for (i = 0; i < listaProdutos.length; i++) {
        var option = document.createElement('option');
        option.innerText = listaProdutos[i].nome;
        option.value = listaProdutos[i].id;
        selectNome.appendChild(option);
        console.log("Tentou criar option");
    }
    spanItem.appendChild(selectNome);

    // Cria o label para o preço unitário
    var labelPreco = document.createElement('label');
    labelPreco.className = 'centralizar texto-itens';
    labelPreco.textContent = 'Preço Un';
    spanItem.appendChild(labelPreco);
    console.log("Criou label preço un: "+labelPreco);

    // Cria o input para o preço unitário
    var inputPreco = document.createElement('input');
    inputPreco.type = 'text';
    inputPreco.disabled = true;
   
    inputPreco.className = 'centralizar campos-itens';
    spanItem.appendChild(inputPreco);
    console.log("criou input preço un: "+inputPreco);

    // Cria o label para a quantidade
    var labelQuantidade = document.createElement('label');
    labelQuantidade.className = 'centralizar texto-itens';
    labelQuantidade.textContent = 'Quant.';
    spanItem.appendChild(labelQuantidade);
    console.log("criou label quant: "+labelQuantidade);

    // Cria o input para a quantidade
    var inputQuantidade = document.createElement('input');
    inputQuantidade.type = 'text';
    inputQuantidade.disabled = true;
    
    inputQuantidade.className = 'centralizar campos-itens';
    spanItem.appendChild(inputQuantidade);
    console.log("Criou input quant: "+inputQuantidade);

    // Cria o label para o total
    var labelTotal = document.createElement('label');
    labelTotal.className = 'centralizar texto-itens';
    labelTotal.textContent = 'Total';
    spanItem.appendChild(labelTotal);
    console.log("Criou label total: "+labelTotal);

    // Cria o input para o total
    var inputTotal = document.createElement('input');
    inputTotal.type = 'text';
    inputTotal.disabled = true;
    
    inputTotal.className = 'centralizar campos-itens';
    spanItem.appendChild(inputTotal);
    console.log("Criou input total:"+inputTotal);

    // Adiciona o item à lista (substitua "idDaLista" pelo ID do elemento onde os itens devem ser adicionados)
    console.log("Span item completo: "+spanItem);
    document.getElementById('lista-itens').appendChild(spanItem);
    console.log("Adicionou a lista item");
}

