class Fornecedor {
    constructor(razaoSocial, nomeFantasia, cnpj, telefone, email) {
        this.razaoSocial = razaoSocial;
        this.nomeFantasia = nomeFantasia;
        this.cnpj = cnpj;
        this.telefone = telefone;
        this.email = email;              
    }
    criarFornecedor() {
        const url = '/Fornecedor/Criar';
        // Faz a requisição POST usando fetch
        //console.log("Fornecedor: "+JSON.stringify(fornecedor));
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(fornecedor) // Envia o objeto venda como JSON
            // Verifica os dados que estão sendo enviados

        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Se a resposta for OK, converte para JSON
                } else {
                    throw new Error('Erro ao cadastrar fornecedor.');
                }
            })
            .then(data => {
                console.log('Fornecedor cadastrado adicionados:', data); 
                fornecedorEndereco.criarEndereco();
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
                throw error;
            });

    }
    atualizarFornecedor() {
        const url = 'http://localhost:5147/api/Fornecedores/' + fornecedor.cnpj;
        // Faz a requisição POST usando fetch
        //console.log("Cliente: "+JSON.stringify(cliente));
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(fornecedor) // Envia o objeto venda como JSON
            // Verifica os dados que estão sendo enviados

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
                console.log('Fornecedor cadastro alterado:', data);
                fornecedorEndereco.atualizarEndereco();
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
                throw error;
            });

    }
    async excluirFornecedor() {
        let nodeList = document.querySelectorAll(".check-fornecedor");
        Array.from(nodeList).forEach(async function (el) {
            if (el.checked == true) {
                console.log("Marcado: " + el.id)
                let linha = el.parentElement.parentElement;
                console.log("Linha: " + linha.id)
                let cnpjBusca = document.querySelector("#" + CSS.escape(linha.id) + " .labelCnpj").innerText
                console.log("Cnpj: " + cnpjBusca)
                fornecedorEndereco.frn_cnpj = cnpjBusca;
                fornecedor.cnpj = cnpjBusca;
                //Excluir endereco
                let exclusaoEndereco = await fornecedorEndereco.excluirEndereco(cnpjBusca);

                //Excluir fornecedor
                
                    const url = '/Fornecedor/Excluir';
                    // Faz a requisição POST usando fetch
                fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(fornecedor) 
                })
                        .then(response => {
                            if (response.ok) {
                                return response.json(); // Se a resposta for OK, converte para JSON
                            } else {
                                throw new Error('Erro ao excluir fornecedor.');
                            }
                        })
                        .then(data => {
                            console.log('Fornecedor excluido:', data);
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
    async consultarFornecedores() {
        const url = '/Fornecedor/Consultar';
        // Faz a requisição POST usando fetch
        return await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); 

                } else {
                    throw new Error('Erro ao Consultar fornecedors.');
                }
            })
            .then(data => {
                console.log('Consulta fornecedor realisada com sucesso:', data);                
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }
    
}

class FornecedorEndereco {
    constructor(frn_cnpj, rua, bairro, cidade, estado, cep) {
        this.frn_cnpj = frn_cnpj;
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
    }
    criarEndereco() {
        let url = '/Fornecedor/CriarEndereco';
        //console.log("Fornecedor Endereco: "+JSON.stringify(fornecedor));
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(fornecedorEndereco) // Envia o objeto venda como JSON
            // Verifica os dados que estão sendo enviados

        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Se a resposta for OK, converte para JSON
                } else {
                    throw new Error('Erro ao cadastrar endereco do fornecedor.');
                }
            })
            .then(data => {
                console.log('Endereco Cadastrado:', data);                
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
                throw error;
            });
    }
    atualizarEndereco() {
        let url = 'http://localhost:5147/api/FornecedoresEnderecos/' + fornecedorEndereco.frn_cnpj;
        //console.log("Cliente Endereco: "+JSON.stringify(cliente));
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(fornecedorEndereco) // Envia o objeto venda como JSON
            // Verifica os dados que estão sendo enviados

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
                console.log('Endereco Cadastrado:', data);
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
                throw error;
            });
    }
    async excluirEndereco(cnpj) {
        const url = '/Fornecedor/ExcluirEndereco';
        fornecedorEndereco.frn_fornecedor = cnpj;
        console.log("CLIENTE ENDERECO stringfy: "+JSON.stringify(fornecedorEndereco))
        // Faz a requisição POST usando fetch
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(fornecedorEndereco) // Envia o objeto venda como JSON
            // Verifica os dados que estão sendo enviados

        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Se a resposta for OK, converte para JSON
                } else {
                    throw new Error('Erro ao excluir endereco.');
                }
            })
            .then(data => {
                console.log('Endereco excluido:', data);                
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
                throw error;
            });

    }
    consultarEndereco() {
        const url = '/Fornecedor/ConsultarEndereco';
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
                    throw new Error('Erro ao Consultar fornecedors.');
                }
            })
            .then(data => {
                console.log('Consulta endereco realisada com sucesso:', data);                
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }
}
let fornecedor = new Fornecedor();
let fornecedorEndereco = new FornecedorEndereco();
let fornecedores = [];
let enderecos = [];
fornecedores = fornecedor.consultarFornecedores();
enderecos = fornecedorEndereco.consultarEndereco();

function montarTabela() {
    let tabela = document.querySelector("#fornecedorTabela > tbody");
    let i = 0
    //let fornecedores = await fornecedor.consultarFornecedores();
    //let enderecos = await fornecedorEndereco.consultarEndereco();
    fornecedores.forEach((f) => {

        //console.log("Fornecedor: "+JSON.stringify(c))
        const pos = enderecos.map(e => e.frn_cnpj).indexOf(f.cnpj);
        //console.log("Endereco: " + JSON.stringify(enderecos[pos]));


        let linha = document.createElement('tr');
        linha.id = "linha-" + i;

        let checkbox = document.createElement('input');
        checkbox.id = "cb-" + i;
        checkbox.type = "checkbox";
        checkbox.className = "text-center check-fornecedor"
        let tdCheckbox = document.createElement('td');
        tdCheckbox.appendChild(checkbox);
        linha.appendChild(tdCheckbox);


        let lblCnpj = document.createElement('label');
        lblCnpj.id = "cnpj-" + i;
        lblCnpj.className = "labelCnpj"
        lblCnpj.innerText = f.cnpj;
        let tdCnpj = document.createElement('td');
        tdCnpj.appendChild(lblCnpj);
        linha.appendChild(tdCnpj);

        let lblRazao = document.createElement('label');
        lblRazao.innerText = f.razaoSocial;
        let tdRazao = document.createElement('td');
        tdRazao.appendChild(lblRazao);
        linha.appendChild(tdRazao);


        let lblNome = document.createElement('label');
        lblNome.innerText = f.nomeFantasia;
        let tdNome = document.createElement('td');
        tdNome.appendChild(lblNome);
        linha.appendChild(tdNome);


        let lblTelefone = document.createElement('label');
        lblTelefone.innerText = f.telefone;
        let tdTelefone = document.createElement('td');
        tdTelefone.appendChild(lblTelefone);
        linha.appendChild(tdTelefone);

        let lblEmail = document.createElement('label');
        lblEmail.innerText = f.email;
        let tdEmail = document.createElement('td');
        tdEmail.appendChild(lblEmail);
        linha.appendChild(tdEmail);

        let lblRua = document.createElement('label');
        lblRua.innerText = enderecos[pos].rua;
        let tdRua = document.createElement('td');
        tdRua.appendChild(lblRua);
        linha.appendChild(tdRua);

        //console.log("linha: " + JSON.stringify(linha.innerHTML))

        let lblBairro = document.createElement('label');
        lblBairro.innerText = enderecos[pos].bairro;
        let tdBairro = document.createElement('td');
        tdBairro.appendChild(lblBairro);
        linha.appendChild(tdBairro);

        let lblCidade = document.createElement('label');
        lblCidade.innerText = enderecos[pos].cidade;
        let tdCidade = document.createElement('td');
        tdCidade.appendChild(lblCidade);
        linha.appendChild(tdCidade);

        let lblEstado = document.createElement('label');
        lblEstado.innerText = enderecos[pos].estado;
        let tdEstado = document.createElement('td');
        tdEstado.appendChild(lblEstado);
        linha.appendChild(tdEstado);

        let lblCep = document.createElement('label');
        lblCep.innerText = enderecos[pos].cep;
        let tdCep = document.createElement('td');
        tdCep.appendChild(lblCep);
        linha.appendChild(tdCep);

        tabela.appendChild(linha)
        i++;

    })
    i = 0
}

async function preencherFornecedor() {
    let cnpjBusca = localStorage.getItem('cnpjBusca');
    console.log("Busca: " + cnpjBusca);    
    let f = new Fornecedor();
    let e = new FornecedorEndereco();

    let fornecedores = await f.consultarFornecedores();
    let enderecos = await e.consultarEndereco();
    console.log(fornecedores)
    console.log(enderecos)
    let fornecedor = fornecedores.find(c => c.cnpj === cnpjBusca);    
    let fornecedorEndereco = enderecos.find(e => e.frn_cnpj === cnpjBusca);
    console.log(fornecedor)
    console.log(fornecedorEndereco)

    document.querySelector("#razaoSocial").value = fornecedor.razaoSocial;
    document.querySelector("#nomeFantasia").value = fornecedor.nomeFantasia;
    document.querySelector("#email").value = fornecedor.email;
    document.querySelector("#telefone").value = fornecedor.telefone;
    document.querySelector("#cnpj").value = fornecedor.cnpj;



    document.querySelector("#cnpj").value = fornecedorEndereco.frn_cnpj;
    document.querySelector("#rua").value = fornecedorEndereco.rua;
    document.querySelector("#bairro").value = fornecedorEndereco.bairro;
    document.querySelector("#estado").value = fornecedorEndereco.estado;
    document.querySelector("#cidade").value = fornecedorEndereco.cidade;
    document.querySelector("#cep").value = fornecedorEndereco.cep;
}
window.addEventListener('load', async () => {
    console.log("listener iniciou");

    // Verifica se está na página de fornecedores
    if (window.location.href === "https://localhost:7160/Home/Fornecedores") {
        fornecedores = await fornecedor.consultarFornecedores();
        enderecos = await fornecedorEndereco.consultarEndereco();

        await montarTabela();

        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    // Desmarcar todos os outros checkboxes
                    document.querySelectorAll('input[type="checkbox"]').forEach((otherCheckbox) => {
                        if (otherCheckbox !== this) {
                            otherCheckbox.checked = false;
                        }
                    });
                }
            });
        });

        document.querySelector(".excluir").addEventListener('click', async () => {
            await fornecedor.excluirFornecedor();
        });

        document.querySelector(".alterar").addEventListener('click', () => {
            console.log("Alterar clicado");
            let nodeList = document.querySelectorAll(".check-fornecedor");
            Array.from(nodeList).forEach(async function (el) {
                if (el.checked) {
                    console.log("Marcado: " + el.id);
                    let linha = el.parentElement.parentElement;
                    console.log("Linha: " + linha.id);
                    let cnpjBusca = document.querySelector("#" + CSS.escape(linha.id) + " .labelCnpj").innerText;
                    localStorage.setItem('cnpjBusca', cnpjBusca);
                    window.location.href = 'FornecedoresAlterar';
                    
                }
            });
        });
    }

    // Verifica se está na página de adicionar fornecedores
    if (window.location.href === "https://localhost:7160/Home/FornecedoresNovo") {
        document.querySelector("#confirmar").addEventListener('click', async (event) => {
            console.log("Botão de confirmar clicado");
            event.preventDefault();

            fornecedor.razaoSocial = document.querySelector("#razaoSocial").value;
            fornecedor.nomeFantasia = document.querySelector("#nomeFantasia").value;
            fornecedor.email = document.querySelector("#email").value;
            fornecedor.telefone = document.querySelector("#telefone").value;
            fornecedor.cnpj = document.querySelector("#cnpj").value;

            fornecedorEndereco.frn_cnpj = document.querySelector("#cnpj").value;
            fornecedorEndereco.rua = document.querySelector("#rua").value;
            fornecedorEndereco.bairro = document.querySelector("#bairro").value;
            fornecedorEndereco.estado = document.querySelector("#estado").options[document.querySelector("#estado").selectedIndex].value;
            fornecedorEndereco.cidade = document.querySelector("#cidade").value;
            fornecedorEndereco.cep = document.querySelector("#cep").value;

            await fornecedor.criarFornecedor().then(() => {
                location.reload();
            });
        });

        document.querySelector("#cancelar").addEventListener('click', async (event) => {
            window.location.href = "https://localhost:7160/Home/Fornecedores";
        });
    }

    // Verifica se está na página de alterar fornecedores
    if (window.location.href === "https://localhost:7160/Home/FornecedoresAlterar") {
        
        preencherFornecedor();
        document.querySelector("#confirmar").addEventListener('click', async (event) => {
            console.log("Botão de confirmar clicado");
            event.preventDefault();

            fornecedor.razaoSocial = document.querySelector("#razaoSocial").value;
            fornecedor.nomeFantasia = document.querySelector("#nomeFantasia").value;
            fornecedor.email = document.querySelector("#email").value;
            fornecedor.telefone = document.querySelector("#telefone").value;
            fornecedor.cnpj = document.querySelector("#cnpj").value;

            fornecedorEndereco.frn_cnpj = document.querySelector("#cnpj").value;
            fornecedorEndereco.rua = document.querySelector("#rua").value;
            fornecedorEndereco.bairro = document.querySelector("#bairro").value;
            fornecedorEndereco.estado = document.querySelector("#estado").options[document.querySelector("#estado").selectedIndex].value;
            fornecedorEndereco.cidade = document.querySelector("#cidade").value;
            fornecedorEndereco.cep = document.querySelector("#cep").value;

            await fornecedor.atualizarFornecedor().then(() => {
                window.location.href = "https://localhost:7160/Home/Fornecedores";
            });
        });

        document.querySelector("#cancelar").addEventListener('click', async (event) => {
            window.location.href = "https://localhost:7160/Home/Fornecedores";
        });
    }
});

       
    

