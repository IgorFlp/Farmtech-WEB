
class Relatorio {
    constructor() {
        
    }
    ConstruirTabela(tipo) {
        let container = document.querySelector("#tbContainer");
        let tabela = document.createElement("table");        
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");
        let tbody = document.createElement("tbody");
        if (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        let colunas;
        console.log("Entrou no construir tabela")
        switch (tipo) {
            case 'Estoque':
                tabela.id = 'estoqueTabela';
                tabela.className = 'table table-striped table-hover';
                colunas = ['ID', 'Nome', 'Unidade', 'Quantidade'];
                colunas.forEach(coluna => {
                    let th = document.createElement('th');
                    th.textContent = coluna;
                    tr.appendChild(th);
                });
                thead.appendChild(tr);
                tabela.appendChild(thead);
                tabela.appendChild(tbody);
                container.appendChild(tabela)
                break;
            case 'Produção':
                tabela.id = 'producaoTabela';
                tabela.className = 'table table-striped table-hover';
                colunas = ['ID Produção', 'Produtos', 'Quantidades', 'Un. Medidas', "Data Prod."];
                colunas.forEach(coluna => {
                    let th = document.createElement('th');
                    th.textContent = coluna;
                    tr.appendChild(th);
                });
                thead.appendChild(tr);
                tabela.appendChild(thead);
                tabela.appendChild(tbody);
                container.appendChild(tabela)
                break;
            case 'Vendas':
                tabela.id = 'vendasTabela';
                tabela.style = 'overflow-x: scroll'
                tabela.className = 'table table-striped table-hover';
                colunas = ['ID venda', 'CPF cliente', 'Nome Cliente', 'Produtos','Quantidades','Subtotal','Frete','Desconto','Total','Cupom','Metod. Pagto','Entrega','Data','Usuario'];
                colunas.forEach(coluna => {
                    let th = document.createElement('th');
                    th.textContent = coluna;
                    tr.appendChild(th);
                });
                thead.appendChild(tr);
                tabela.appendChild(thead);
                tabela.appendChild(tbody);
                container.appendChild(tabela)
                break;
            case 'Clientes':
                console.log("Entrou no switch clientes")
                
                tabela.id = "clienteTabela"
                tabela.className = "table table-striped table-hover"

                let thCpf = document.createElement("th");
                let thNome = document.createElement("th");
                let thTel = document.createElement("th");
                let thEmail = document.createElement("th");
                let thGenero = document.createElement("th");
                let thNasc = document.createElement("th");
                let thRua = document.createElement("th");
                let thBairro = document.createElement("th");
                let thCidade = document.createElement("th");
                let thEstado = document.createElement("th");
                let thCep = document.createElement("th");
                //let th = document.createElement("th");
                //th.innerText = ""
                //tr.appendChild(th);

                thCpf.innerText = "CPF"
                tr.appendChild(thCpf);

                thNome.innerText = "Nome"
                tr.appendChild(thNome);

                thTel.innerText = "Telefone"
                tr.appendChild(thTel);

                thEmail.innerText = "Email"
                tr.appendChild(thEmail);

                thNasc.innerText = "Nascimento"
                tr.appendChild(thNasc);

                thGenero.innerText = "Genero"
                tr.appendChild(thGenero);

                thRua.innerText = "Rua"
                tr.appendChild(thRua);

                thBairro.innerText = "Bairro"
                tr.appendChild(thBairro);

                thCidade.innerText = "Cidade"
                tr.appendChild(thCidade);

                thEstado.innerText = "Estado"
                tr.appendChild(thEstado);

                thCep.innerText = "CEP"
                tr.appendChild(thCep);

                thead.appendChild(tr)
                tabela.appendChild(thead);
                tabela.appendChild(tbody);
                container.appendChild(tabela);
                break;
            case 'Fornecedores':                
                tabela.id = 'fornecedorTabela';
                tabela.className = 'table table-striped table-hover';                
                colunas = ['CNPJ', 'Razão social', 'Nome Fantasia', 'Telefone', 'Email', 'Rua', 'Bairro', 'Cidade', 'Estado', 'CEP'];
                colunas.forEach(coluna => {
                    let th = document.createElement('th');
                    th.textContent = coluna;
                    tr.appendChild(th);
                });
                thead.appendChild(tr);
                tabela.appendChild(thead);
                //let tbody = document.createElement('tbody');
                tabela.appendChild(tbody);
                container.appendChild(tabela)
            break;
            case 'Produtos':
                tabela.id = 'produtoTabela';
                tabela.className = 'table table-striped table-hover';
                colunas = ['ID','Nome','Unidade','Preço'];
                colunas.forEach(coluna => {
                    let th = document.createElement('th');
                    th.textContent = coluna;
                    tr.appendChild(th);
                });
                thead.appendChild(tr);
                tabela.appendChild(thead);                
                tabela.appendChild(tbody);
                container.appendChild(tabela)
                break;
            case 'Usuarios':
                tabela.id = 'usuarioTabela';
                tabela.className = 'table table-striped table-hover';
                colunas = ['Login', 'Nome', 'Cargo', 'ID'];
                colunas.forEach(coluna => {
                    let th = document.createElement('th');
                    th.textContent = coluna;
                    tr.appendChild(th);
                });
                thead.appendChild(tr);
                tabela.appendChild(thead);
                tabela.appendChild(tbody);
                container.appendChild(tabela)
                break;
        }
        
    }
}

let relatorio = new Relatorio();
async function montarTabelaCliente() {
    console.log("Entrou em montar tabela")
    let tabela = document.querySelector("#clienteTabela > tbody");
    let i = 0
    let clientes; 
    let enderecos;
    
        let url = '/Cliente/Consultar';
        // Faz a requisição POST usando fetch
        await fetch('http://localhost:5147/api/Clientes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();

                } else {
                    throw new Error('Erro ao Consultar clientes.');
                }
            })
            .then(data => {
                console.log('Consulta cliente realisada com sucesso:', data);
                clientes = data;
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    
        url = '/Cliente/ConsultarEndereco';
        // Faz a requisição POST usando fetch
        await fetch(url, {
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
                console.log('Consulta endereco realisada com sucesso:', data);
                enderecos = data;
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
            });

    clientes.forEach((c) => {

        //console.log("Cliente: "+JSON.stringify(c))
        const pos = enderecos.map(e => e.cl_cpf).indexOf(c.cpf);
        //console.log("Endereco: " + JSON.stringify(enderecos[pos]));


        let linha = document.createElement('tr');
        linha.id = "linha-" + i;        

        let lblCpf = document.createElement('label');
        lblCpf.id = "cpf-" + i;
        lblCpf.className = "labelCpf"
        lblCpf.innerText = c.cpf;
        let tdCpf = document.createElement('td');
        tdCpf.appendChild(lblCpf);
        linha.appendChild(tdCpf);


        let lblNome = document.createElement('label');
        lblNome.innerText = c.nome;
        let tdNome = document.createElement('td');
        tdNome.appendChild(lblNome);
        linha.appendChild(tdNome);


        let lblTelefone = document.createElement('label');
        lblTelefone.innerText = c.telefone;
        let tdTelefone = document.createElement('td');
        tdTelefone.appendChild(lblTelefone);
        linha.appendChild(tdTelefone);

        let lblEmail = document.createElement('label');
        lblEmail.innerText = c.email;
        let tdEmail = document.createElement('td');
        tdEmail.appendChild(lblEmail);
        linha.appendChild(tdEmail);

        let lblDtNasc = document.createElement('label');
        lblDtNasc.innerText = c.dataNasc;
        let tdDtNasc = document.createElement('td');
        tdDtNasc.appendChild(lblDtNasc);
        linha.appendChild(tdDtNasc);

        let lblGenero = document.createElement('label');
        lblGenero.innerText = c.genero;
        let tdGenero = document.createElement('td');
        tdGenero.appendChild(lblGenero);
        linha.appendChild(tdGenero);

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
async function montarTabelaFornecedor() {
    let tabela = document.querySelector("#fornecedorTabela > tbody");
    let i = 0
    let fornecedores;
    let enderecos;

        let url = '/Fornecedor/Consultar';
        // Faz a requisição POST usando fetch
        await fetch(url, {
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
                fornecedores = data;
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
            });
        
        url = '/Fornecedor/ConsultarEndereco';
        // Faz a requisição POST usando fetch
        await fetch(url, {
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
                enderecos = data;
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
            });

    
    fornecedores.forEach((f) => {

        //console.log("Fornecedor: "+JSON.stringify(c))
        const pos = enderecos.map(e => e.frn_cnpj).indexOf(f.cnpj);
        //console.log("Endereco: " + JSON.stringify(enderecos[pos]));


        let linha = document.createElement('tr');
        linha.id = "linha-" + i;        


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

async function montarTabelaProduto() {
    let tabela = document.querySelector("#produtoTabela > tbody");
    let i = 0;
    let produtos;
    const url = '/Produto/Consultar';
    // Faz a requisição POST usando fetch
    await fetch(url, {
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
            produtos = data;
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
        });

    produtos.forEach((p) => {
        let linha = document.createElement("tr");
        linha.id = "linha-" + i;
        
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
async function montarTabelaEstoque() {
    let tabela = document.querySelector("#estoqueTabela > tbody");
    let i = 0;
    let produtos;
    let estoques;
    let url = '/Produto/Consultar';
    // Faz a requisição POST usando fetch
    await fetch(url, {
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
            produtos = data;
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    url = 'http://localhost:5147/api/Estoque';
    // Faz a requisição POST usando fetch
    await fetch(url, {
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
            estoques = data;
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
        });

    produtos.forEach((p) => {
        let linha = document.createElement("tr");
        linha.id = "linha-" + i;

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

        let lblQuant = document.createElement("label");
        lblQuant.id = "quant-" + i;
        lblQuant.className = "labelQuant";
        lblQuant.innerText = estoques[i].quant;
        let tdQuant = document.createElement("td");
        tdQuant.appendChild(lblQuant);
        linha.appendChild(tdQuant);


        tabela.appendChild(linha);
        i++;
    });
    i = 0;
}
async function montarTabelaProducao() {
    let tabela = document.querySelector("#producaoTabela > tbody");
    let i = 0;
    let produtos;
    let producoes;
    let producoesProdutos
    let url = '/Produto/Consultar';
    // Faz a requisição POST usando fetch
    await fetch(url, {
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
            produtos = data;
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    url = 'http://localhost:5147/api/Producao';
    // Faz a requisição POST usando fetch
    await fetch(url, {
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
            producoes = data;
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
        });

    url = 'http://localhost:5147/api/ProducaoProdutos';
    // Faz a requisição POST usando fetch
    await fetch(url, {
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
            producoesProdutos = data;
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
        });

    producoes.forEach((p) => {
        let linha = document.createElement("tr");
        linha.id = "linha-" + i;

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
        let nomes ="";
        let quants = "";
        let medidas = "";
        
        producoesProdutos.forEach((pp) => {
            if (pp.pdc_id == p.id) {
                produtos.forEach((pdt) => {
                    if (pp.pdt_id == pdt.id) {
                        nomes = nomes + pdt.nome + "\n";
                        medidas = medidas + pdt.unMedida + "\n";
                    }
                })
                if (pp.pdc_id == p.id) {
                    quants = quants + pp.quant + "\n";
                }
            }
        })
        lblNome.innerText = nomes;
        let tdNome = document.createElement("td");
        tdNome.appendChild(lblNome);
        linha.appendChild(tdNome);

        let lblQuant = document.createElement("label");
        lblQuant.id = "quant-" + i;
        lblQuant.className = "labelQuant";
        lblQuant.innerText = quants;
        let tdQuant = document.createElement("td");
        tdQuant.appendChild(lblQuant);
        linha.appendChild(tdQuant);

        let lblMedida = document.createElement("label");
        lblMedida.id = "unMedida-" + i;
        lblMedida.className = "labelunMedida";
        lblMedida.innerText = medidas;
        let tdMedida = document.createElement("td");
        tdMedida.appendChild(lblMedida);
        linha.appendChild(tdMedida);  

        let lblData = document.createElement("label");
        lblData.id = "data-" + i;
        lblData.className = "labelData";
        let data = new Date(p.dataProd)
        let dataFormatada = data.toLocaleDateString('pt-BR')
        lblData.innerText = dataFormatada;
        let tdData = document.createElement("td");
        tdData.appendChild(lblData);
        linha.appendChild(tdData);  


        tabela.appendChild(linha);
        i++;
    });
    i = 0;
}
async function montarTabelaVendas() {
    let tabela = document.querySelector("#vendasTabela > tbody");
    let i = 0;
    let produtos;
    let vendas;
    let vendaProdutos
    let clientes;
    let usuarios;
    let url = '/Produto/Consultar';
    // Faz a requisição POST usando fetch
    await fetch(url, {
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
            produtos = data;
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    url = 'http://localhost:5147/api/Venda';
    // Faz a requisição POST usando fetch
    await fetch(url, {
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
            vendas = data;
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
        });

    url = 'http://localhost:5147/api/VendaProdutos';
    // Faz a requisição POST usando fetch
    await fetch(url, {
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
            vendaProdutos = data;
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    url = 'http://localhost:5147/api/Clientes';
    // Faz a requisição POST usando fetch
    await fetch(url, {
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
            clientes = data;
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    url = 'http://localhost:5147/api/Usuario';
    // Faz a requisição POST usando fetch
    await fetch(url, {
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
            usuarios = data;
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    vendas.forEach((v) => {
        let linha = document.createElement("tr");
        linha.id = "linha-" + i;

        let lblId = document.createElement("label");
        lblId.id = "Id-" + i;
        lblId.className = "labelId";
        lblId.innerText = v.id;
        let tdId = document.createElement("td");
        tdId.appendChild(lblId);
        linha.appendChild(tdId);

        let cliente;
        clientes.forEach((c) => {
            if (c.cpf == v.cl_cpf) {
                cliente = c;
            }
        })
        let lblCpf = document.createElement("label");
        lblCpf.id = "cpf-" + i;
        lblCpf.className = "labelCpf";
        lblCpf.innerText = v.cl_cpf;
        let tdCpf = document.createElement("td");
        tdCpf.appendChild(lblCpf);
        linha.appendChild(tdCpf);

        let lblNome = document.createElement("label");
        lblNome.id = "nome-" + i;
        lblNome.className = "labelNome";
        lblNome.innerText = cliente.nome;
        let tdNome = document.createElement("td");
        tdNome.appendChild(lblNome);
        linha.appendChild(tdNome);



        let nomes = "";
        let quants = "";
        

        vendaProdutos.forEach((vp) => {
            if (vp.ven_id == v.id) {
                produtos.forEach((pdt) => {
                    if (vp.pdt_id == pdt.id) {
                        nomes = nomes + pdt.nome + "\n";
                        
                    }
                })
                if (vp.ven_id == v.id) {
                    quants = quants + vp.quant + "\n";
                }
            }
        })
        let lblNomeProd = document.createElement("label");
        lblNomeProd.id = "prods-" + i;
        lblNomeProd.className = "labelNomeProd";
        lblNomeProd.innerText = nomes;
        let tdNomeProd = document.createElement("td");
        tdNomeProd.appendChild(lblNomeProd);
        linha.appendChild(tdNomeProd);

        let lblQuant = document.createElement("label");
        lblQuant.id = "quant-" + i;
        lblQuant.className = "labelQuant";
        lblQuant.innerText = quants;
        let tdQuant = document.createElement("td");
        tdQuant.appendChild(lblQuant);
        linha.appendChild(tdQuant);

        let lblSubtotal = document.createElement("label");
        lblSubtotal.id = "Subtotal-" + i;
        lblSubtotal.className = "labelSubtotal";
        lblSubtotal.innerText = v.subtotal;
        let tdSubtotal = document.createElement("td");
        tdSubtotal.appendChild(lblSubtotal);
        linha.appendChild(tdSubtotal);

        let lblFrete = document.createElement("label");
        lblFrete.id = "Frete-" + i;
        lblFrete.className = "labelFrete";
        lblFrete.innerText = v.frete;
        let tdFrete = document.createElement("td");
        tdFrete.appendChild(lblFrete);
        linha.appendChild(tdFrete);

        let lblDesconto = document.createElement("label");
        lblDesconto.id = "Desconto-" + i;
        lblDesconto.className = "labelDesconto";
        lblDesconto.innerText = v.desconto;
        let tdDesconto = document.createElement("td");
        tdDesconto.appendChild(lblDesconto);
        linha.appendChild(tdDesconto);

        let lblTotal = document.createElement("label");
        lblTotal.id = "Subtotal-" + i;
        lblTotal.className = "labelSubtotal";
        lblTotal.innerText = v.total;
        let tdTotal = document.createElement("td");
        tdTotal.appendChild(lblTotal);
        linha.appendChild(tdTotal);

        let lblCupom = document.createElement("label");
        lblCupom.id = "Cupom-" + i;
        lblCupom.className = "labelCupom";
        lblCupom.innerText = v.cupom;
        let tdCupom = document.createElement("td");
        tdCupom.appendChild(lblCupom);
        linha.appendChild(tdCupom);

        let lblPagto = document.createElement("label");
        lblPagto.id = "Pagto-" + i;
        lblPagto.className = "labelPagto";
        lblPagto.innerText = v.mtdPagto;
        let tdPagto = document.createElement("td");
        tdPagto.appendChild(lblPagto);
        linha.appendChild(tdPagto);

        let lblEntrega = document.createElement("label");
        lblEntrega.id = "Entrega-" + i;
        lblEntrega.className = "labelEntrega";
        lblEntrega.innerText = v.entrega;
        let tdEntrega = document.createElement("td");
        tdEntrega.appendChild(lblEntrega);
        linha.appendChild(tdEntrega);

        let lblData = document.createElement("label");
        lblData.id = "data-" + i;
        lblData.className = "labelData";
        let data = new Date(v.dtVenda)
        let dataFormatada = data.toLocaleDateString('pt-BR')
        lblData.innerText = dataFormatada;
        let tdData = document.createElement("td");
        tdData.appendChild(lblData);
        linha.appendChild(tdData);

        let usuario;
        usuarios.forEach((u) => {
            if (u.id == v.usr_id) {
                usuario = u;
            }
        })

        let lblUsuario = document.createElement("label");
        lblUsuario.id = "Usuario-" + i;
        lblUsuario.className = "labelUsuario";
        lblUsuario.innerText = usuario.nome;
        let tdUsuario = document.createElement("td");
        tdUsuario.appendChild(lblUsuario);
        linha.appendChild(tdUsuario);


        tabela.appendChild(linha);
        i++;
    });
    i = 0;
}
async function montarTabelaUsuario() {
    let tabela = document.querySelector("#usuarioTabela > tbody");
    let i = 0;
    let usuarios;
    const url = '/Usuario/Consultar';
    // Faz a requisição POST usando fetch
    await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();

            } else {
                throw new Error('Erro ao consultar usuarios.');
            }
        })
        .then(data => {
            console.log('Consulta usuarios realisada com sucesso:', data);
            usuarios = data;
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
        });

    usuarios.forEach((c) => {
        let linha = document.createElement("tr");
        linha.id = "linha-" + i;
        
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
window.addEventListener('load', async () => {
    let relatorioObj = new Relatorio(); // Instância de Relatorio

    document.querySelector("#slcRelatorio").addEventListener('change', async function () {
        let relatorio = document.querySelector("#slcRelatorio").value;
        console.log("Relatorio: " + relatorio);

        await relatorioObj.ConstruirTabela(relatorio);

        switch (relatorio) {
            case 'Estoque':
                montarTabelaEstoque();
                break;
            case 'Produção':
                montarTabelaProducao();
                break;
            case 'Vendas':
                montarTabelaVendas();
                break;
            case 'Clientes':
                montarTabelaCliente(); 
                break;
            case 'Fornecedores':
                montarTabelaFornecedor();
                break;
            case 'Produtos':
                montarTabelaProduto();
                break;
            case 'Usuarios':
                montarTabelaUsuario();
                break;
        }
    }.bind(relatorioObj)); // Amarrando o `this` à instância de Relatorio
});
