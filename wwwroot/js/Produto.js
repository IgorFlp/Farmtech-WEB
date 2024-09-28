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
        produto.unMedida = document.querySelector("#txtProduto").value;
        produto.precoUn = document.querySelector("#slcCargo").value;
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
                    location.reload();
                    return data;
                })
                .catch(error => {
                    console.error('Erro:', error);
                    throw error;
                });
        } else if (tipo == "Alterar") { 
            produto.id = idUser;
            console.log("tipo: " + tipo);
            console.log("Produto: "+JSON.stringify(produto));
            const url = '/Produto/Alterar';

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
                        throw new Error('Erro ao alterar produto.');
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
        //let produto = new Produto();     
        let precoUn = document.querySelector("#txtPreco").value;
        let unMedida = document.querySelector("#slcUnidade").value;
        let nome = document.querySelector("#txtNome").value;
        
        let nodeList = document.querySelectorAll(".check-produto");
        Array.from(nodeList).forEach(async function (el) {
            if (el.checked == true) {
                //console.log("Marcado: " + el.id)
                let linha = el.parentElement.parentElement;
                //console.log("Linha: " + linha.id)
                let idBusca = document.querySelector("#" + CSS.escape(linha.id) + " .labelId").innerText
                produto.id = idBusca;
                console.log("Id produto: " + produto.id);             
                habilitaCampos();
                let pos = produtos.findIndex((p) => p.id.toString() === idBusca);                
                console.log("POS: "+pos+JSON.stringify(produtos[pos]));
                document.querySelector("#txtNome").value = produtos[pos].login;
                let slcCargo = document.querySelector("#slcCargo");
                for (let i = 0; i < slcCargo.options.length; i++) {
                    if (slcCargo.options[i].text.toLowerCase() === produtos[pos].cargo.toLowerCase()) {
                        slcCargo.selectedIndex = i;
                        break;
                    }
                }                
                document.querySelector("#txtNome").value = produtos[pos].nome;        
                document.querySelector("#txtSenha").value = produtos[pos].senha;
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
                //Excluir cliente

                const url = '/Produto/Excluir';
                // Faz a requisição POST usando fetch
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(produto)
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json(); // Se a resposta for OK, converte para JSON
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
            }

        });


    }
}
let produto = new Produto();
let produtos = [];
function montarTabela() {
    let tabela = document.querySelector("#produtoTabela > tbody");
    let i = 0;    

    produtos.forEach((c) => {
        let linha = document.createElement("tr");
        linha.id = "linha-" + i;

        let checkbox = document.createElement("input");
        checkbox.id = "cb-" + i;
        checkbox.type = "checkbox";
        checkbox.className = "text-center check-produto";
        let tdCheckbox = document.createElement("td");
        tdCheckbox.appendChild(checkbox);
        linha.appendChild(tdCheckbox);

        let lblLogin = document.createElement("label");
        lblLogin.id = "login-" + i;
        lblLogin.className = "labelLogin";
        lblLogin.innerText = c.login;
        let tdLogin = document.createElement("td");
        tdLogin.appendChild(lblLogin);
        linha.appendChild(tdLogin);

        let lblNome = document.createElement("label");
        lblNome.id = "nome-" + i;
        lblNome.className = "labelNome";
        lblNome.innerText = c.nome;
        let tdNome = document.createElement("td");
        tdNome.appendChild(lblNome);
        linha.appendChild(tdNome);

        let lblCargo = document.createElement("label");
        lblCargo.id = "cargo-" + i;
        lblCargo.className = "labelCargo";
        lblCargo.innerText = c.cargo;
        let tdCargo = document.createElement("td");
        tdCargo.appendChild(lblCargo);
        linha.appendChild(tdCargo);

        let lblId = document.createElement("label");
        lblId.id = "Id-" + i;
        lblId.className = "labelId";
        lblId.innerText = c.id;
        let tdId = document.createElement("td");
        tdId.appendChild(lblId);
        linha.appendChild(tdId);

        tabela.appendChild(linha);
        i++;
    });
    i = 0;
}
function habilitaCampos() {
    const produto = document.querySelector("#txtProduto");
    const cargo = document.querySelector("#slcCargo");
    const nome = document.querySelector("#txtNome");
    const senha = document.querySelector("#txtSenha");
    const salvar = document.querySelector("#btnSalvar");
    produto.disabled = false;
    cargo.disabled = false;
    nome.disabled = false;
    senha.disabled = false;
    salvar.disabled = false;
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
        console.log("ID USER: " + produto.id);
        document.querySelector(".salvar").addEventListener('click', async () => {
            console.log("ID USER: " + produto.id);
            let idProd = produto.id;
            produto.criarProduto("Alterar",idProd);
        })
    });
});
