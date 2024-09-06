// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

//const { eventListeners } = require("@popperjs/core");
//const { each } = require("jquery");
class Produto{
    constructor(id, nome, unMedida, precoUn) {
        this.id = id;
        this.nome = nome;
        this.unMedida = unMedida;
        this.precoUn = precoUn;
    }
}
class Venda {
    constructor(id, produtos, cupom, mtdPagto, entrega, userLogin, clCpf, dtVenda, subtotal, frete, desconto, total) {
        this.id = id;        
        this.cupom = cupom;
        this.mtdPagto = mtdPagto;
        this.entrega = entrega;
        this.userLogin = userLogin;
        this.clCpf = clCpf;
        this.dtVenda = dtVenda;
        this.subtotal = subtotal;
        this.frete = frete;
        this.desconto = desconto;
        this.total = total;
    }

    addItem() {
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
        spanItem.className = 'd-flex flex-row item-span mt-1 produto-span bg-white';
        spanItem.id = 'produto-' + Nomeid;
        console.log("Criou span: " + spanItem);

        // Cria o input checkbox
        var checkbox = document.createElement('input');
        checkbox.className = 'check-item centralizar';
        checkbox.style.marginLeft = '1rem';
        checkbox.style.marginRight = '0.5rem';
        checkbox.type = 'checkbox';
        spanItem.appendChild(checkbox);
        console.log("Criou checkbox: " + checkbox);

        // Cria o select para o nome do item
        var selectNome = document.createElement('select');
        selectNome.className = 'produto-select centralizar';
        //selectNome.className = 'centralizar';
       // selectNome.onchange = selecionaProduto;
        selectNome.style.marginRight = '5%';
        selectNome.style.borderRadius = '5px';
        selectNome.style.height = '80%';
        selectNome.style.width = '45%';
        //class="centralizar" style="height: 80%; width:45%; border-radius:5px; margin-right: 5%;

        console.log("Criou select nome: " + selectNome);
        var option = document.createElement('option');
        option.innerText = "-Selecione um produto-";
        selectNome.appendChild(option);
        let i = 0;
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
        console.log("Criou label preço un: " + labelPreco);

        // Cria o input para o preço unitário
        var inputPreco = document.createElement('input');
        inputPreco.placeholder = '0,00';
        inputPreco.type = 'number';
        inputPreco.disabled = true;
        inputPreco.className = 'precoUn-input centralizar campos-itens';
        spanItem.appendChild(inputPreco);
        console.log("criou input preço un: " + inputPreco);

        // Cria o label para a quantidade
        var labelQuantidade = document.createElement('label');
        labelQuantidade.className = 'quant-label centralizar texto-itens';
        labelQuantidade.textContent = 'Quantidade';

        spanItem.appendChild(labelQuantidade);
        console.log("criou label quant: " + labelQuantidade);

        // Cria o input para a quantidade
        var inputQuantidade = document.createElement('input');
        inputQuantidade.type = 'number';
        inputQuantidade.min = '0';
        inputQuantidade.placeholder = '0,00';
        //inputQuantidade.onchange = calcTotalSpan;
        //inputQuantidade.disabled = true;

        inputQuantidade.className = 'quant-input centralizar campos-itens';
        spanItem.appendChild(inputQuantidade);
        console.log("Criou input quant: " + inputQuantidade);

        // Cria o label para o total
        var labelTotal = document.createElement('label');
        labelTotal.className = 'total-label centralizar texto-itens';
        labelTotal.textContent = 'Total';
        spanItem.appendChild(labelTotal);
        console.log("Criou label total: " + labelTotal);

        // Cria o input para o total
        var inputTotal = document.createElement('input');
        inputTotal.type = 'number';
        inputTotal.disabled = true;

        inputTotal.className = 'total-input centralizar campos-itens';
        spanItem.appendChild(inputTotal);
        console.log("Criou input total:" + inputTotal);

        // Adiciona o item à lista (substitua "idDaLista" pelo ID do elemento onde os itens devem ser adicionados)
        console.log("Span item completo: " + spanItem);
        document.getElementById('lista-itens').appendChild(spanItem);
        console.log("Adicionou a lista item");

    }
    deleteItem() {
        let nodeList = document.querySelectorAll(".check-item");
        Array.from(nodeList).forEach(function (el) {
            if (el.checked == true) {
                console.log("Marcado: " + el)
                el.parentElement.remove();

            } else {
                console.log("Desmarcado: " + el)
            }
        });
        calcSubtotal();
    }
    selecionaProduto(span) {
        //remover essa parte daqui
        const prod = new Produto(1, "Alface", "Kg", 3.50);
        const prod2 = new Produto(2, "Tomate", "Kg", 5.59);
        const prod3 = new Produto(3, "Berinjela", "Un", 8.00);
        let listaProdutos = [prod, prod2, prod3];
        //

        //let span = this.parentElement;
        console.log("Span: "+span.id)
        let select = document.querySelector("#" + CSS.escape(span.id) + "> select");
        var value = select.value;
        var produtoNome = select.options[select.selectedIndex].text;
        //let produtoNome = select.innerText;
        console.log("Span ID: " + span.id + "Select: " + select.className + "Produto: " + produtoNome)

        const pos = listaProdutos.map(e => e.nome).indexOf(produtoNome);
        console.log("Position: " + pos)
        console.log("ID: " + listaProdutos[pos].id + " Nome: " + listaProdutos[pos].nome + " Unidade: " + listaProdutos[pos].unMedida + " PreçoUn: " + listaProdutos[pos].precoUn)

        let precoUn = document.querySelector("#" + CSS.escape(span.id) + "> .precoUn-input");
        console.log("Elemento: " + precoUn.innerHTML);
        precoUn.value = listaProdutos[pos].precoUn;

        let quantLbl = document.querySelector("#" + CSS.escape(span.id) + "> .quant-label");
        console.log("Elemento: " + quantLbl.innerHTML);
        quantLbl.innerHTML = "Quantidade " + listaProdutos[pos].unMedida;

        let quantInput = document.querySelector("#" + CSS.escape(span.id) + "> .quant-input");
        quantInput.value = 0;
        if (listaProdutos[pos].unMedida == "Un") {
            quantInput.step = '0';
        } else {
            quantInput.step = '.10';
        }
    }
    calcTotalSpan(span) {
        //let span = this.parentElement;
        let precoUn = document.querySelector("#" + CSS.escape(span.id) + "> .precoUn-input");
        let quant = document.querySelector("#" + CSS.escape(span.id) + "> .quant-input");
        let totalInput = document.querySelector("#" + CSS.escape(span.id) + "> .total-input");
        let valor = quant.value * precoUn.value;
        totalInput.value = valor.toFixed(2);
        console.log("Valor total: " + totalInput.value);
        venda.calcSubtotal();
    }

    confirmaVenda() {

        venda.id = 0;
        venda.cupom = document.querySelector("#cupom").value;
        venda.mtdPagto = document.querySelector("#select-pagto").options[document.querySelector("#select-pagto").selectedIndex].text;
        venda.entrega = document.querySelector("#select-frete").options[document.querySelector("#select-frete").selectedIndex].text;
        venda.userLogin = document.querySelector("#usuario").text;
        venda.clCpf = document.querySelector("#select-cliente").options[document.querySelector("#select-cliente").selectedIndex].text;
        venda.dtVenda = Date.now();
        venda.subtotal = document.querySelector("#subtotal").value;
        venda.frete = document.querySelector("#frete").value;
        venda.desconto = document.querySelector("#desconto").value;
        venda.total = document.querySelector("#total").value;

        console.log("Venda" + venda);

        const url = '/Vender/Criar';
        // Faz a requisição POST usando fetch
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(venda) // Envia o objeto venda como JSON
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Se a resposta for OK, converte para JSON
                } else {
                    throw new Error('Erro ao enviar a venda.');
                }
            })
            .then(data => {
                console.log('Venda criada com sucesso:', data);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }
    
    calcSubtotal() {
        let subtotal = document.querySelector("#subtotal");
        var nodeList = document.querySelectorAll(".total-input");

        let soma = 0;
        Array.from(nodeList).forEach(function (el) {
            console.log(el);
            let value = parseFloat(el.value);
            soma += value;
        });

        // ENCONTRAR O ERRO DAQUI, NÃO CONSEGUE ACESSAR ITENS[I].VALUE
        subtotal.value = soma.toFixed(2);
        venda.atualizaTotal();
    }
    calcFrete() {
        let select = document.querySelector("#select-frete");
        let selecionado = select.options[select.selectedIndex].text;
        console.log("Selecionado: " + selecionado);
        let frete;
        if (selecionado == "Entrega") {
            frete = 25.00;
        } else {
            frete = 0;
        }
        document.querySelector("#frete").value = frete.toFixed(2);
        venda.atualizaTotal();
    }
    validaCupom(elem) {
        if (event.key === 'Enter') {
           console.log("Com enter");
            let cupom = document.querySelector("#cupom").value;
            let desconto = document.querySelector("#desconto");
            if (cupom == "Sexta20") {
                let valor = 20.00;
                desconto.value = valor.toFixed(2);
                //console.log("Desconto: " + desconto);
            } else {
               alert("Cupom invalido");
            }
        } else {
            //console.log("Fora do enter");
        }
        venda.atualizaTotal();
    }
    atualizaTotal() {

        let subtotal = document.querySelector("#subtotal").value;
        let desconto = document.querySelector("#desconto").value;
        let frete = document.querySelector("#frete").value;
        let total = document.querySelector("#total");
        let subValue = parseFloat(subtotal);
        let descontoValue = parseFloat(desconto);
        let freteValue = parseFloat(frete);

        console.log("Subtotal " + subtotal + "Desconto: " + desconto + "frete" + frete)
        let calc = (subValue + freteValue) - descontoValue;
        console.log("Calculo: " + calc);
        total.value = calc.toFixed(2);

    }
}

let venda = new Venda();
window.addEventListener("load", function () {
    document.querySelector("#btnIncluir").addEventListener('click', function () {
        console.log('addItem chamado');
        venda.addItem();  // Chama o método da instância venda
    });
    document.querySelector(".excluir").addEventListener('click', function () {
        console.log('addItem chamado');
        venda.deleteItem();  // Chama o método da instância venda
    });
    document.querySelector("#lista-itens").addEventListener("change", (event) => {
        if (event.target && event.target.matches(".produto-select")) {
            console.log("Seleciona produto chamado");
            venda.selecionaProduto(event.target.parentElement);  
        }
    });
    document.querySelector("#lista-itens").addEventListener("change", (event) => {
        if (event.target && event.target.matches(".quant-input")) {
            console.log("Seleciona quantidade chamado");
            venda.calcTotalSpan(event.target.parentElement);  
        }
    });
    document.querySelector("#select-frete").addEventListener("change", (event) => {       
            console.log("Seleciona frete chamado");
            venda.calcFrete();          
    });    
    document.querySelector("#cupom").addEventListener("keydown", (event) => {        
            //console.log("Seleciona cupom chamado");
            venda.validaCupom(event.target);        
    });    
    document.querySelector(".confirmar").addEventListener('click', function () {
        console.log('Confirmar chamado');
        venda.confirmaVenda();  // Chama o método da instância venda
    });
})    