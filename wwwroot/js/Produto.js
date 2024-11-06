class Produto {
    constructor(nome, unMedida, precoUn, id) {
        this.nome = nome;
        this.unMedida = unMedida;
        this.precoUn = precoUn;        
        this.id = id;
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
                    return response.json();

                } else {
                    throw new Error('Erro ao consultar Produtos.');
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
    criarProduto(tipo,idProd) {
        const produto = new Produto();
        produto.unMedida = document.querySelector("#slcUnidade").value;
        produto.precoUn = document.querySelector("#txtPreco").value;
        produto.nome = document.querySelector("#txtNome").value;        
        
        if (tipo == "Novo") {
            console.log("tipo: " + tipo);
            const url = '/Produto/Criar';
            
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produto)
                

            })
                .then(response => {
                    if (response.ok) {
                        return response.json(); 
                    } else {
                        throw new Error('Erro ao cadastrar produto.');
                    }
                })
                .then(data => {
                    
                    console.log('Produto cadastrado adicionados:', data);
                    const url = 'http://localhost:5147/api/Estoque';
                    let estoque = {
                        pdt_id: data.id,
                        quant: 100
                    }
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(estoque)
                    })
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                throw new Error('Erro ao cadastrar estoque.');
                            }
                        })
                        .then(data => {
                            console.log('Estoque cadastrado adicionados:', data);
                            location.reload();
                            return data;
                        })
                        .catch(error => {
                            console.error('Erro:', error);
                            throw error;
                        });
                    return data;
                })
                .catch(error => {
                    console.error('Erro:', error);
                    throw error;
                });
        } else if (tipo == "Alterar") { 
            produto.id = idProd;
            console.log("tipo: " + tipo);
            console.log("Produto: "+JSON.stringify(produto));
            const url = 'http://localhost:5147/api/Produto/' + idProd;
            

            return fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produto),

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
                        throw new Error('Erro ao cadastrar cliente.');
                    }
                })
                .then(data => {
                    console.log('Produto alterado com sucesso:', data);
                    location.reload();
                    return data;
                })
                .catch(error => {
                    console.error('Erro:', error);
                    throw error;
                });
        }
    }    
    alterarProduto() {        
        
        let nodeList = document.querySelectorAll(".check-produto");
        Array.from(nodeList).forEach(async function (el) {
            if (el.checked == true) {
                
                let linha = el.parentElement.parentElement;
               
                let idBusca = document.querySelector("#" + CSS.escape(linha.id) + " .labelId").innerText
                produto.id = idBusca;
                console.log("Id produto: " + produto.id);    
                
                habilitaCampos();

                let pos = produtos.findIndex((p) => p.id.toString() === idBusca); 
                
                console.log("POS: "+pos+JSON.stringify(produtos[pos]));
                document.querySelector("#txtNome").value = produtos[pos].nome;
                let slcUnidade = document.querySelector("#slcUnidade");
                slcUnidade.value = produtos[pos].unMedida;
                            
                document.querySelector("#txtPreco").value = produtos[pos].precoUn;        
               
            }
        }
        )
    }
    async excluirProduto() {
        let nodeList = document.querySelectorAll(".check-produto");
        Array.from(nodeList).forEach(async function (el) {
            if (el.checked == true) {
                console.log("Marcado: " + el.id)
                let linha = el.parentElement.parentElement;
                console.log("Linha: " + linha.id)
                let idBusca = document.querySelector("#" + CSS.escape(linha.id) + " .labelId").innerText
                console.log("ID: " + idBusca);                
                produto.id = idBusca;
                //Excluir produto

                const url = 'http://localhost:5147/api/Estoque/'+produto.id;
                // Faz a requisição POST usando fetch
                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }                    
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
                            throw new Error('Erro ao excluir cliente.');
                        }
                    })
                    .then(data => {
                        console.log('Estoque excluido:', data);
                        const url = 'http://localhost:5147/api/Produto/' + produto.id;
                        // Faz a requisição POST usando fetch
                        fetch(url, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },                            
                        })
                            .then(response => {
                                if (response.ok) {
                                    return response.text().then(text => {
                                        if (text) {
                                            return JSON.parse(text);
                                        } else {
                                            return {};
                                        }
                                    }); // Se a resposta for OK, converte para JSON
                                } else {
                                    throw new Error('Erro ao excluir cliente.');
                                }
                            })
                            .then(data => {
                                console.log('Produto excluido:', data);
                                location.reload();
                                return data;
                            })
                            .catch(error => {
                                console.error('Erro:', error);
                                throw error;
                            });                        
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                        throw error;
                    });
                
            }

        });


    }
}
let produto = new Produto();
let produtos = [];
function montarTabela() {
    let tabela = document.querySelector("#produtoTabela > tbody");
    let i = 0;    

    produtos.forEach((p) => {
        let linha = document.createElement("tr");
        linha.id = "linha-" + i;

        let checkbox = document.createElement("input");
        checkbox.id = "cb-" + i;
        checkbox.type = "checkbox";
        checkbox.className = "text-center check-produto";
        let tdCheckbox = document.createElement("td");
        tdCheckbox.appendChild(checkbox);
        linha.appendChild(tdCheckbox);

        let lblId = document.createElement("label");
        lblId.id = "Id-" + i;
        lblId.className = "labelId";
        lblId.innerText = p.id;
        let tdId = document.createElement("td");
        tdId.appendChild(lblId);
        linha.appendChild(tdId);

        let lblNome = document.createElement("label");
        lblNome.id = "nome-" + i;
        lblNome.className = "labelNome";
        lblNome.innerText = p.nome;
        let tdNome = document.createElement("td");
        tdNome.appendChild(lblNome);
        linha.appendChild(tdNome);

        let lblMedida = document.createElement("label");
        lblMedida.id = "unMedida-" + i;
        lblMedida.className = "labelunMedida";
        lblMedida.innerText = p.unMedida;
        let tdMedida = document.createElement("td");
        tdMedida.appendChild(lblMedida);
        linha.appendChild(tdMedida);

        let lblPreco = document.createElement("label");
        lblPreco.id = "preco-" + i;
        lblPreco.className = "labelPreco";
        lblPreco.innerText = p.precoUn;
        let tdPreco = document.createElement("td");
        tdPreco.appendChild(lblPreco);
        linha.appendChild(tdPreco);
        

        tabela.appendChild(linha);
        i++;
    });
    i = 0;
}
function habilitaCampos() {
    const nome = document.querySelector("#txtNome");
    const unidade = document.querySelector("#slcUnidade");
    const preco = document.querySelector("#txtPreco");    
    const btnSalvar = document.querySelector("#btnSalvar");
    
    nome.disabled = false;
    unidade.disabled = false;
    preco.disabled = false;
    btnSalvar.disabled = false;
}

window.addEventListener("load", async () => {
    //clientes = await produto.consultarProduto();
    produtos = await produto.consultarProdutos();
    await this.montarTabela();
    

    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                // Desmarcar todos os outros checkboxes
                document
                    .querySelectorAll('input[type="checkbox"]')
                    .forEach((otherCheckbox) => {
                        if (otherCheckbox !== this) {
                            otherCheckbox.checked = false;
                        }
                    });
            }
        });
    });
    document.querySelector(".excluir").addEventListener("click", async () => {
        await produto.excluirProduto();
    });
    document.querySelector(".incluir").addEventListener("click", async () => {
        habilitaCampos();
        document.querySelector(".salvar").addEventListener('click', async () => {
            produto.criarProduto("Novo");
        })
    });    
    document.querySelector(".alterar").addEventListener("click", async () => {        
        let res = await produto.alterarProduto();   
        console.log("ID Prod: " + produto.id);
        document.querySelector(".salvar").addEventListener('click', async () => {
            console.log("ID prod: " + produto.id);
            let idProd = produto.id;
            produto.criarProduto("Alterar",idProd);
        })
    });
});
