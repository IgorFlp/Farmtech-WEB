class Produto {
    constructor(id, nome, unMedida, precoUn) {
        this.id = id;
        this.nome = nome;
        this.unMedida = unMedida;
        this.precoUn = precoUn;
    }
}
class ProducaoProdutos {
    constructor(ven_id, produtosVenda, quantidadesProd) {
        this.ven_id = ven_id;
        this.produtosVenda = produtosVenda || [];
        this.quantidadesProd = quantidadesProd || [];;
    }
}
class Producao {
    constructor(id, dataProd, listaProdutosDB) {
        this.id = id;
        this.dataProd = dataProd;
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
        console.log("Lista produtos length: " + this.listaProdutosDB.length)
        for (i = 0; i < this.listaProdutosDB.length; i++) {
            var option = document.createElement('option');
            option.innerText = this.listaProdutosDB[i].nome;
            option.value = this.listaProdutosDB[i].id;
            selectNome.appendChild(option);
            console.log("Tentou criar option");
        }
        spanItem.appendChild(selectNome);        

        // Cria o label para a quantidade
        var labelQuantidade = document.createElement('label');
        labelQuantidade.className = 'quant-label centralizar texto-itens';
        labelQuantidade.style = 'margin-left:30%'
        labelQuantidade.textContent = 'Quantidade';

        spanItem.appendChild(labelQuantidade);
        console.log("criou label quant: " + labelQuantidade);

        // Cria o input para a quantidade
        var inputQuantidade = document.createElement('input');
        inputQuantidade.type = 'number';       
        inputQuantidade.style = 'margin-right: 5%';
        inputQuantidade.min = '0';
        inputQuantidade.placeholder = '0,00';
        //inputQuantidade.onchange = calcTotalSpan;
        //inputQuantidade.disabled = true;

        inputQuantidade.className = 'quant-input centralizar campos-itens';
        spanItem.appendChild(inputQuantidade);
        console.log("Criou input quant: " + inputQuantidade);        

        // Adiciona o item à lista (substitua "idDaLista" pelo ID do elemento onde os itens devem ser adicionados)
        console.log("Span item completo: " + spanItem);
        document.getElementById('lista-itens').appendChild(spanItem);
        console.log("Adicionou a lista item");

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
    }
    selecionaProduto(span) {
        
        console.log("Span: " + span.id)
        let select = document.querySelector("#" + CSS.escape(span.id) + "> select");
        var value = select.value;
        var produtoNome = select.options[select.selectedIndex].text;
        //let produtoNome = select.innerText;
        console.log("Span ID: " + span.id + "Select: " + select.className + "Produto: " + produtoNome)

        const pos = this.listaProdutosDB.map(e => e.nome).indexOf(produtoNome);
        console.log("Position: " + pos)
        console.log("ID: " + this.listaProdutosDB[pos].id + " Nome: " + this.listaProdutosDB[pos].nome + " Unidade: " + this.listaProdutosDB[pos].unMedida + " PreçoUn: " + this.listaProdutosDB[pos].precoUn)

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
    confirmaProducao() {
        
        let data = new Date().toJSON().slice(0, 10);
        console.log("Data: " + data);
        producao.dataProd = data;
        const url = "http://localhost:5147/api/Producao";
        // Faz a requisição POST usando fetch
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(producao) // Envia o objeto venda como JSON
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
                console.log('Producao criada com sucesso:', data);
                const producaoId = data.id;
                if (producaoId) {
                    // Agora chama o método para criar os itens na tabela VendaProdutos
                    producaoProdutos.pdc_id = producaoId;

                    let spans = document.querySelectorAll(".produto-span");
                    let listaProducaoProdutos = []; // Inicializa uma lista para armazenar os objetos VendaProdutos

                    for (let i = 0; i < spans.length; i++) {
                        // Cria um objeto VendaProdutos para cada produto selecionado
                        let producaoProduto = {
                            pdc_id: producaoId,
                            pdt_id: parseInt(document.querySelector("#" + CSS.escape(spans[i].id) + " > .produto-select").options[document.querySelector("#" + CSS.escape(spans[i].id) + " > .produto-select").selectedIndex].value),
                            quant: parseFloat(document.querySelector("#" + CSS.escape(spans[i].id) + " > .quant-input").value)
                        };

                        // Adiciona o objeto criado à lista de vendaProdutos
                        listaProducaoProdutos.push(producaoProduto);
                    }
                    console.log("Producao Produtos Stringfy: " + JSON.stringify(listaProducaoProdutos));
                    this.criarProdutosProducao(listaProducaoProdutos);
                } else {
                    console.error('ID da producao não retornado.');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });


    }
    criarProdutosProducao(listaProducaoProdutos) {
        let spans = document.querySelectorAll(".produto-span");
        //let listaVendaProdutos = []; 
        console.log("length: "+listaProducaoProdutos.length)
        console.log(listaProducaoProdutos);        
        for (let i = 0; i < listaProducaoProdutos.length; i++) {
            const url = "http://localhost:5147/api/ProducaoProdutos";
            console.log(JSON.stringify(listaProducaoProdutos[i]));
            // Faz a requisição POST usando fetch
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
                },
                body: JSON.stringify(listaProducaoProdutos[i]) // Envia o objeto venda como JSON
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
                    //for (let i = 0; i < listaProducaoProdutos.length; i++) {
                        console.log('Produtos da producao adicionados:', data);
                        const url = "http://localhost:5147/api/Estoque/Adicionar/" + listaProducaoProdutos[i].pdt_id + "?quantidade=" + listaProducaoProdutos[i].quant;

                        // Faz a requisição PUT usando fetch
                        fetch(url, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
                            }
                            // O corpo da requisição pode ser removido, pois o `quantidade` é passado pela URL
                        })
                            .then(response => {
                                if (response.ok) {
                                    return response.text().then(text => {
                                        if (text) {
                                            return JSON.parse(text);
                                        } else {
                                            return {};
                                        }
                                    });
                                } else {
                                    throw new Error('Erro ao subtrair estoque.');
                                }
                            })
                            .then(data => {
                                console.log('Estoque atualizado:', data);
                                //location.reload();
                                return data;
                            })
                            .catch(error => {
                                console.error('Erro:', error);
                                throw error;
                            });
                    //}
                })
        }
    }

        
        
}
let producao = new Producao();
let producaoProdutos = {
    produtosProducao: [],
    quantidadesProd: []
};
window.addEventListener("load", async function () {    
    producao.listaProdutosDB = await producao.consultarProdutos();
    let userNome = localStorage.getItem("usrNome");
    let userId = localStorage.getItem("usrId");
    document.querySelector("#usuario").innerText = userNome;
    document.querySelector("#usuario").className = "userId-" + userId;

    document.querySelector("#btnIncluir").addEventListener('click', function () {
        console.log('addItem chamado');
        producao.addItem();  
    });
    document.querySelector(".excluir").addEventListener('click', function () {
        console.log('DeleteItem chamado');
        producao.deleteItem();  
    });
    document.querySelector("#lista-itens").addEventListener("change", (event) => {
        if (event.target && event.target.matches(".produto-select")) {
            console.log("Seleciona produto chamado");
            producao.selecionaProduto(event.target.parentElement);
        }
    });     
    
    document.querySelector(".confirmar").addEventListener('click', function () {
        console.log('Confirmar chamado');
        producao.confirmaProducao();  // Chama o método da instância venda
    });

    //calcSubtotal();
})