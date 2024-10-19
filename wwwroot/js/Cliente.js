class Cliente {
    constructor(nome, cpf,telefone,email,dataNasc,genero) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.dataNasc = dataNasc;
        this.genero = genero;
       
    }
    criarCliente() {
        const url = '/Cliente/Criar';
        // Faz a requisição POST usando fetch
        //console.log("Cliente: "+JSON.stringify(cliente));
        return fetch('http://localhost:5147/api/Clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(cliente) // Envia o objeto venda como JSON
            // Verifica os dados que estão sendo enviados

        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Se a resposta for OK, converte para JSON
                } else {
                    throw new Error('Erro ao cadastrar cliente.');
                }
            })
            .then(data => {
                console.log('Cliente cadastrado adicionados:', data); 
                clienteEndereco.criarEndereco();
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
                throw error;
            });

    }
    atualizarCliente() {
        const url = 'http://localhost:5147/api/Clientes/'+cliente.cpf;
        // Faz a requisição POST usando fetch
        //console.log("Cliente: "+JSON.stringify(cliente));
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(cliente) // Envia o objeto venda como JSON
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
                console.log('Cliente cadastrado adicionados:', data);
                clienteEndereco.atualizarEndereco();
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
                throw error;
            });

    }
    async excluirCliente() {
        let nodeList = document.querySelectorAll(".check-cliente");
        Array.from(nodeList).forEach(async function (el) {
            if (el.checked == true) {
                console.log("Marcado: " + el.id)
                let linha = el.parentElement.parentElement;
                console.log("Linha: " + linha.id)
                let cpfBusca = document.querySelector("#" + CSS.escape(linha.id) + " .labelCpf").innerText
                console.log("Cpf: " + cpfBusca)
                clienteEndereco.cl_cpf = cpfBusca;
                cliente.cpf = cpfBusca;
                //Excluir endereco
                let exclusaoEndereco = await clienteEndereco.excluirEndereco(cpfBusca);

                //Excluir cliente
                
                    const url = '/Cliente/Excluir';
                    // Faz a requisição POST usando fetch
                fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(cliente) 
                })
                        .then(response => {
                            if (response.ok) {
                                return response.json(); // Se a resposta for OK, converte para JSON
                            } else {
                                throw new Error('Erro ao excluir cliente.');
                            }
                        })
                        .then(data => {
                            console.log('Cliente excluido:', data);
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
    consultarClientes() {
        const url = '/Cliente/Consultar';
        // Faz a requisição POST usando fetch
        return fetch('http://localhost:5147/api/Clientes', {
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
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }    
}
class ClienteEndereco {
    constructor(cl_cpf, rua, bairro, cidade, estado, cep) {
        this.cl_cpf = cl_cpf;
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
    }
    criarEndereco() {
        let url = '/Cliente/CriarEndereco';
        //console.log("Cliente Endereco: "+JSON.stringify(cliente));
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(clienteEndereco) // Envia o objeto venda como JSON
            // Verifica os dados que estão sendo enviados

        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Se a resposta for OK, converte para JSON
                } else {
                    throw new Error('Erro ao cadastrar endereco do cliente.');
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
        let url = 'http://localhost:5147/api/ClientesEnderecos/'+clienteEndereco.cl_cpf;
        //console.log("Cliente Endereco: "+JSON.stringify(cliente));
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(clienteEndereco) // Envia o objeto venda como JSON
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
    async excluirEndereco(cpf) {
        const url = '/Cliente/ExcluirEndereco';
        clienteEndereco.cl_cpf = cpf;
        console.log("CLIENTE ENDERECO stringfy: "+JSON.stringify(clienteEndereco))
        // Faz a requisição POST usando fetch
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(clienteEndereco) // Envia o objeto venda como JSON
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
        const url = '/Cliente/ConsultarEndereco';
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
                console.log('Consulta endereco realisada com sucesso:', data);                
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }    
}
let cliente = new Cliente();
let clienteEndereco = new ClienteEndereco();
let clientes = [];
let enderecos = [];
function montarTabela() {
    console.log("Entrou em montar tabela")
    let tabela = document.querySelector("#clienteTabela > tbody");
    let i = 0
    //let clientes2 = await cliente.consultarClientes();
    //let enderecos = await clienteEndereco.consultarEndereco();
    clientes.forEach((c) => {

        //console.log("Cliente: "+JSON.stringify(c))
        const pos = enderecos.map(e => e.cl_cpf).indexOf(c.cpf);
        //console.log("Endereco: " + JSON.stringify(enderecos[pos]));


        let linha = document.createElement('tr');
        linha.id = "linha-" + i;
        
            let checkbox = document.createElement('input');
            checkbox.id = "cb-" + i;
            checkbox.type = "checkbox";
            checkbox.className = "text-center check-cliente"
            let tdCheckbox = document.createElement('td');
            tdCheckbox.appendChild(checkbox);
            linha.appendChild(tdCheckbox);
        
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

function alterarCliente() {
    let nodeList = document.querySelectorAll(".check-cliente");
    Array.from(nodeList).forEach(async function (el) {
        if (el.checked == true) {
            console.log("Marcado: " + el.id)
            let linha = el.parentElement.parentElement;
            console.log("Linha: " + linha.id)
            let cpfBusca = document.querySelector("#" + CSS.escape(linha.id) + " .labelCpf").innerText
            localStorage.setItem('cpfBusca',cpfBusca);
            window.location.href = 'ClientesAlterar';           
            
        }
    });    
}
function preencherCliente() {
    let cpfBusca = localStorage.getItem('cpfBusca');
    let cliente = clientes.find(c => c.cpf === cpfBusca);
    let endereco = enderecos.find(e => e.cl_cpf === cpfBusca);

    if (cliente) {
        document.querySelector("#nome").value = cliente.nome;
        document.querySelector("#email").value = cliente.email;
        document.querySelector("#telefone").value = cliente.telefone;
        document.querySelector("#cpf").value = cliente.cpf;
        document.querySelector("#data-nascimento").value = cliente.dataNasc;
        document.querySelector("#genero").value = cliente.genero;
    }

    if (endereco) {
        document.querySelector("#rua").value = endereco.rua;
        document.querySelector("#bairro").value = endereco.bairro;
        document.querySelector("#estado").value = endereco.estado;
        document.querySelector("#cidade").value = endereco.cidade;
        document.querySelector("#cep").value = endereco.cep;
    }
}


window.addEventListener('load', async () => {
    // Verifica se a URL atual corresponde a "/Home/Clientes"
    if (window.location.pathname === "/Home/Clientes") {
        clientes = await cliente.consultarClientes();
        enderecos = await clienteEndereco.consultarEndereco();
        await montarTabela();

        // Configura os checkboxes para permitir apenas um selecionado
        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    document.querySelectorAll('input[type="checkbox"]').forEach((otherCheckbox) => {
                        if (otherCheckbox !== this) {
                            otherCheckbox.checked = false;
                        }
                    });
                }
            });
        });

        // Ações de exclusão e alteração
        document.querySelector(".excluir").addEventListener('click', async () => {
            await cliente.excluirCliente();
        });
        document.querySelector(".alterar").addEventListener('click', alterarCliente);

        // Navegar para página de inclusão
        document.querySelector(".incluir").addEventListener('click', () => {
            window.location.href = 'https://localhost:7160/Home/ClientesNovo';
        });
    }

    // Verifica se a URL atual corresponde a "/Home/ClientesAlterar"
    if (window.location.pathname === "/Home/ClientesAlterar") {
        let cpfBusca = localStorage.getItem('cpfBusca'); // Recupera o CPF armazenado
        console.log("CPF busca: " + cpfBusca);

        if (cpfBusca) {
            console.log("CPF para alteração: " + cpfBusca);

            // Consulta os dados dos clientes e endereços    
            clientes = await cliente.consultarClientes();
            enderecos = await clienteEndereco.consultarEndereco();
            preencherCliente();
        }
        document.querySelector("#confirmar").addEventListener('click', async (event) => {
            console.log("Botão de confirmar clicado");
            event.preventDefault();

            cliente.nome = document.querySelector("#nome").value;
            cliente.email = document.querySelector("#email").value;
            cliente.telefone = document.querySelector("#telefone").value;
            cliente.cpf = document.querySelector("#cpf").value;
            cliente.dataNasc = document.querySelector("#data-nascimento").value;
            cliente.genero = document.querySelector("#genero").options[document.querySelector("#genero").selectedIndex].value;

            clienteEndereco.cl_cpf = document.querySelector("#cpf").value;
            clienteEndereco.rua = document.querySelector("#rua").value;
            clienteEndereco.bairro = document.querySelector("#bairro").value;
            clienteEndereco.estado = document.querySelector("#estado").options[document.querySelector("#estado").selectedIndex].value;
            clienteEndereco.cidade = document.querySelector("#cidade").value;
            clienteEndereco.cep = document.querySelector("#cep").value;

            await cliente.atualizarCliente().then(() => {
                window.location.href = "https://localhost:7160/Home/Clientes";
                //location.reload();
            });
        });
        document.querySelector("#cancelar").addEventListener('click', async (event) => {
            window.location.href = "https://localhost:7160/Home/Clientes";
        })
    }

    // Verifica se a URL atual corresponde a "/Home/ClientesNovo"
    if (window.location.pathname === "/Home/ClientesNovo") {
        document.querySelector("#confirmar").addEventListener('click', async (event) => {
            console.log("Botão de confirmar clicado");
            event.preventDefault();

            cliente.nome = document.querySelector("#nome").value;
            cliente.email = document.querySelector("#email").value;
            cliente.telefone = document.querySelector("#telefone").value;
            cliente.cpf = document.querySelector("#cpf").value;
            cliente.dataNasc = document.querySelector("#data-nascimento").value;
            cliente.genero = document.querySelector("#genero").options[document.querySelector("#genero").selectedIndex].value;

            clienteEndereco.cl_cpf = document.querySelector("#cpf").value;
            clienteEndereco.rua = document.querySelector("#rua").value;
            clienteEndereco.bairro = document.querySelector("#bairro").value;
            clienteEndereco.estado = document.querySelector("#estado").options[document.querySelector("#estado").selectedIndex].value;
            clienteEndereco.cidade = document.querySelector("#cidade").value;
            clienteEndereco.cep = document.querySelector("#cep").value;

            await cliente.criarCliente().then(() => {                
                location.reload();
            });
        });
        document.querySelector("#cancelar").addEventListener('click', async (event) => {
            window.location.href = "https://localhost:7160/Home/Clientes";
        })
    }
});
/*
window.addEventListener('load', async () => {
    if (window.location == "https://localhost:7160/Home/Clientes") {

        clientes = await cliente.consultarClientes();
        enderecos = await clienteEndereco.consultarEndereco();
        //alert(JSON.stringify(clientes) + JSON.stringify(enderecos));
        await this.montarTabela();

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
        document.querySelector(".excluir").addEventListener('click', async () => { await cliente.excluirCliente() });
        document.querySelector(".alterar").addEventListener('click', alterarCliente);
        document.querySelector(".incluir").addEventListener('click', () => { window.location.href = 'https://localhost:7160/Home/ClientesNovo' });
    }
    if (window.location.href === "https://localhost:7160/Home/ClientesAlterar") {
        document.addEventListener('DOMContentLoaded', function () {
            let cpfBusca = localStorage.getItem('cpfBusca'); // Recupera o CPF armazenado
            console.log("CPF busca: " + cpfBusca)
            if (cpfBusca) {
                console.log("CPF para alteração: " + cpfBusca);

                // Consulta os dados dos clientes e endereços
                let clientes = consultarClientes();
                let enderecos = consultarEnderecos();

                let cliente = clientes.find(c => c.cpf === cpfBusca);
                let endereco = enderecos.find(e => e.cl_cpf === cpfBusca);

                if (cliente) {
                    document.querySelector("#nome").value = cliente.nome;
                    document.querySelector("#email").value = cliente.email;
                    document.querySelector("#telefone").value = cliente.telefone;
                    document.querySelector("#cpf").value = cliente.cpf;
                    document.querySelector("#data-nascimento").value = cliente.dataNasc;
                    document.querySelector("#genero").value = cliente.genero;
                }

                if (endereco) {
                    document.querySelector("#rua").value = endereco.rua;
                    document.querySelector("#bairro").value = endereco.bairro;
                    document.querySelector("#estado").value = endereco.estado;
                    document.querySelector("#cidade").value = endereco.cidade;
                    document.querySelector("#cep").value = endereco.cep;
                }
            }
        });
    }

    if (window.location.href === "https://localhost:7160/Home/ClientesNovo") {
        document.querySelector("#confirmar").addEventListener('click', async (event) => {
            console.log("Botão de confirmar clicado");
            event.preventDefault();

            cliente.nome = document.querySelector("#nome").value;
            cliente.email = document.querySelector("#email").value;
            cliente.telefone = document.querySelector("#telefone").value;
            cliente.cpf = document.querySelector("#cpf").value;
            cliente.dataNasc = document.querySelector("#data-nascimento").value;
            cliente.genero = document.querySelector("#genero").options[document.querySelector("#genero").selectedIndex].value;

            clienteEndereco.cl_cpf = document.querySelector("#cpf").value;
            clienteEndereco.rua = document.querySelector("#rua").value;
            clienteEndereco.bairro = document.querySelector("#bairro").value;
            clienteEndereco.estado = document.querySelector("#estado").options[document.querySelector("#estado").selectedIndex].value;
            clienteEndereco.cidade = document.querySelector("#cidade").value;
            clienteEndereco.cep = document.querySelector("#cep").value;

            await cliente.criarCliente().then(() => { location.reload(); });


            //alert(JSON.stringify(cliente) + JSON.stringify(clienteEndereco));

        });
    }
}*/


       
    

