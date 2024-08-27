// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
function addItem() {
    console.log("Entrou na função");

    var spanItem = document.createElement('span');
    spanItem.className = 'd-flex flex-row item-span mt-1';
    console.log("Criou span: "+spanItem);

    // Cria o input checkbox
    var checkbox = document.createElement('input');
    checkbox.className = 'check-item centralizar';
    checkbox.style.marginLeft = '1rem';
    checkbox.style.marginRight = '0.5rem';
    checkbox.type = 'checkbox';
    spanItem.appendChild(checkbox);
    console.log("Criou checkbox: "+checkbox);

    // Cria o label para o nome do item
    var labelNome = document.createElement('label');
    labelNome.className = 'centralizar';
    labelNome.style.marginLeft = '1%';
    labelNome.style.width = '48%';
    labelNome.textContent = 'Nome do item';
    spanItem.appendChild(labelNome);
    console.log("Criou Label nome: "+labelNome);

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
    inputPreco.value = 'R$ 4,98';
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
    inputQuantidade.value = 'Kg 2,50';
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
    inputTotal.value = 'R$ 30,00';
    inputTotal.className = 'centralizar campos-itens';
    spanItem.appendChild(inputTotal);
    console.log("Criou input total:"+inputTotal);

    // Adiciona o item à lista (substitua "idDaLista" pelo ID do elemento onde os itens devem ser adicionados)
    console.log("Span item completo: "+spanItem);
    document.getElementById('lista-itens').appendChild(spanItem);
    console.log("Adicionou a lista item");
}

