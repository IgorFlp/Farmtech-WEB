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
class Cliente {
    constructor(cpf, nome, telefone, email, dataNasc, genero) {
        this.cpf = cpf;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.dataNasc = dataNasc;
        this.genero = genero;
    }
}
class VendaProdutos {
    constructor(ven_id, produtosVenda, quantidadesProd) {
        this.ven_id = ven_id;
        this.produtosVenda = produtosVenda || [];
        this.quantidadesProd = quantidadesProd || [];;
    }
}
class Cupom {
    constructor(nome, dtValid,valor) {
        this.nome = nome;
        this.dtValid = dtValid;
        this.valor = valor;
    }
}
class Venda {
    
    constructor(id, produtos, cupom, mtdPagto, entrega, userLogin, clCpf, dtVenda, subtotal, frete, desconto, total,listaClientesDB, listaProdutosDB) {
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

        this.listaClientesDB = listaClientesDB || [];
        this.listaProdutosDB = listaProdutosDB || [];
        
    }
   

    async addItem() {       

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
        /*
        if (!selectNome) {
            console.error('Elemento selectNome não encontrado');
        } else {
            var listaProdutosDB = this.consultarProdutos();

            listaProdutosDB.then((listaProdutosDB) => {
                // Verifique se listaProdutosDB é um array
                if (Array.isArray(listaProdutosDB)) {
                    console.log("Lista produtos length: " + listaProdutosDB.length);

                    for (let i = 0; i < listaProdutosDB.length; i++) {
                        const produto = listaProdutosDB[i];
                        const option = document.createElement('option');
                        option.innerText = produto.nome;
                        option.value = produto.id;
                        selectNome.appendChild(option);
                        console.log("Criou option para:", produto.nome);
                    }
                } else {
                    console.error('Lista de produtos não é um array ou está indefinida.');
                }
            }).catch((error) => {
                console.error('Erro ao consultar produtos:', error);
            });
        }*/
        
        /*var listaProdutosDB = this.consultarProdutos()
            listaProdutosDB.then((listaProdutosDB) => {
            */
            console.log("Lista produtos length: " + this.listaProdutosDB.length)
            for (i = 0; i < this.listaProdutosDB.length; i++) {
                var option = document.createElement('option');
                option.innerText = this.listaProdutosDB[i].nome;
                option.value = this.listaProdutosDB[i].id;
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
        
        //

        //let span = this.parentElement;
        console.log("Span: "+span.id)
        let select = document.querySelector("#" + CSS.escape(span.id) + "> select");
        var value = select.value;
        var produtoNome = select.options[select.selectedIndex].text;
        //let produtoNome = select.innerText;
        console.log("Span ID: " + span.id + "Select: " + select.className + "Produto: " + produtoNome)

        const pos = this.listaProdutosDB.map(e => e.nome).indexOf(produtoNome);
        console.log("Position: " + pos)
        console.log("ID: " + this.listaProdutosDB[pos].id + " Nome: " + this.listaProdutosDB[pos].nome + " Unidade: " + this.listaProdutosDB[pos].unMedida + " PreçoUn: " + this.listaProdutosDB[pos].precoUn)

        let precoUn = document.querySelector("#" + CSS.escape(span.id) + "> .precoUn-input");
        console.log("Elemento: " + precoUn.innerHTML);
        precoUn.value = this.listaProdutosDB[pos].precoUn;

        let quantLbl = document.querySelector("#" + CSS.escape(span.id) + "> .quant-label");
        console.log("Elemento: " + quantLbl.innerHTML);
        quantLbl.innerHTML = "Quantidade " + this.listaProdutosDB[pos].unMedida;

        let quantInput = document.querySelector("#" + CSS.escape(span.id) + "> .quant-input");
        quantInput.value = 0;
        if (this.listaProdutosDB[pos].unMedida == "Un") {
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

        //venda.id = 0;
        venda.cupom = document.querySelector("#cupom").value;
        venda.mtdPagto = document.querySelector("#select-pagto").options[document.querySelector("#select-pagto").selectedIndex].text;
        venda.entrega = document.querySelector("#select-frete").options[document.querySelector("#select-frete").selectedIndex].text;
        venda.userLogin = document.querySelector("#usuario").text;

        var cpf;
        var clienteNome = document.querySelector("#select-cliente").options[document.querySelector("#select-cliente").selectedIndex].text;
        if (this.listaClientesDB && Array.isArray(this.listaClientesDB)) {
            // Mapeia os nomes para buscar a posição
            const pos = this.listaClientesDB.map(e => e.nome).indexOf(clienteNome);

            if (pos !== -1) { // Verifica se o cliente foi encontrado
                cpf = this.listaClientesDB[pos].cpf;
                console.log("CPF: " + cpf);
            } else {
                console.error("Cliente não encontrado na lista.");
            }
        } else {
            console.error("listaClientesDB não está definida ou não é um array.");
        }
        
        venda.clCpf = cpf;
        venda.dtVenda = Date.now();
        venda.dtVenda = new Date(venda.dtVenda).toISOString().split('T')[0]
        venda.subtotal = document.querySelector("#subtotal").value;
        venda.frete = document.querySelector("#frete").value;
        venda.desconto = document.querySelector("#desconto").value;
        venda.total = document.querySelector("#total").value;
        venda.userLogin = 5;
        //                                                                                                           _/\_    _/\_
        // FAZER FOR PRA PEGAR OS SPANS, PEGAR OS VALUES SELECIONADOS E DEFINIR, PEGAR OS VALUES DE QUANT E DEFINIR (/^-^)/\(^-^\) 
        
        
        //console.log(JSON.stringify(venda));
        

        const url = '/Vender/Criar';
        // Faz a requisição POST usando fetch
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(venda) // Envia o objeto venda como JSON
             // Verifica os dados que estão sendo enviados

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
                const vendaId = data.id;
                if (vendaId) {
                    // Agora chama o método para criar os itens na tabela VendaProdutos
                    vendaProdutos.ven_id = vendaId;

                    let spans = document.querySelectorAll(".produto-span");
                    let listaVendaProdutos = []; // Inicializa uma lista para armazenar os objetos VendaProdutos

                    for (let i = 0; i < spans.length; i++) {
                        // Cria um objeto VendaProdutos para cada produto selecionado
                        let vendaProduto = {
                            ven_id: vendaId,
                            pdt_id: parseInt(document.querySelector("#" + CSS.escape(spans[i].id) + " > .produto-select").options[document.querySelector("#" + CSS.escape(spans[i].id) + " > .produto-select").selectedIndex].value),
                            quant: parseFloat(document.querySelector("#" + CSS.escape(spans[i].id) + " > .quant-input").value)
                        };

                        // Adiciona o objeto criado à lista de vendaProdutos
                        listaVendaProdutos.push(vendaProduto);
                    }
                    console.log("Venda Produtos Stringfy: " + JSON.stringify(listaVendaProdutos));
                    this.criarProdutosVenda(listaVendaProdutos);
                } else {
                    console.error('ID da venda não retornado.');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }
    criarProdutosVenda(listaVendaProdutos) {
        const url = '/Vender/AddProdutosVenda';
        console.log(JSON.stringify(listaVendaProdutos));
        // Faz a requisição POST usando fetch
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(listaVendaProdutos) // Envia o objeto venda como JSON
            // Verifica os dados que estão sendo enviados

        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Se a resposta for OK, converte para JSON
                } else {
                    throw new Error('Erro ao cadastrar produtos venda a venda.');
                }
            })
            .then(data => {
                console.log('Produtos da venda adicionados:', data);
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
                throw error;
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
            let cupomNome = document.querySelector("#cupom").value;
            const url = '/Vender/ConsultarCupom?nome='+ encodeURIComponent(cupomNome);
            // Faz a requisição POST usando fetch
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {                  
                        
                         
                        return response.json();                       
                        
                        } else {
                            alert("Cupom invalido");
                        }            
                    
                })
                .then(data => {
                    console.log('Consulta realisada com sucesso:', data); 
                    let desconto = document.querySelector("#desconto");
                    venda.cupom = data.nome;
                    desconto.value = data.valor.toFixed(2);
                    venda.atualizaTotal()
                    return data;
                })
                .catch(error => {
                    console.error('Erro:', error);
                });            
        } else {
            //console.log("Fora do enter");
        }
        
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
    consultarClientes() {
        const url = '/Cliente/Consultar';
        // Faz a requisição POST usando fetch
        return fetch(url, {
            method: 'GET',
            headers: {  
                'Content-Type': 'application/json'         
            }          
        })
            .then(response => {
                if (response.ok) {                    
                    return response.json(); // Se a resposta for OK, converte para JSON
                    
                } else {
                    throw new Error('Erro ao Consultar clientes.');
                }
            })
            .then(data => {
                console.log('Consulta realisada com sucesso:', data);
                data.forEach(item => {
                    this.addClientes(item); // Chama a função addClientes para cada cliente
                });
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }
    addClientes(item) {           
        
            var optionCliente = document.createElement('option');
            optionCliente.value = item.nome;
            optionCliente.textContent = item.nome;
            document.querySelector("#select-cliente").appendChild(optionCliente);
            console.log("Criou a option total: " + optionCliente.text);             
    
    }
    consultarProdutos() {
        const url = '/Produto/Consultar';
        // Faz a requisição POST usando fetch
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Se a resposta for OK, converte para JSON

                } else {
                    throw new Error('Erro ao Consultar clientes.');
                }
            })
            .then(data => {
                console.log('Consulta de produtos realisada com sucesso:', data);                
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }  
}

let venda = new Venda();
let vendaProdutos = {
    produtosVenda: [],
    quantidadesProd: []
};
let cupom = new Cupom();
window.addEventListener("load", async function () {
    venda.listaClientesDB = await venda.consultarClientes();   
    venda.listaProdutosDB = await venda.consultarProdutos();
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
        console.log("Seleciona frete quantidade chamado");
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
    
    //calcSubtotal();
})