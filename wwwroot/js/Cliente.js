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
        fetch(url, {
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
                console.log('Endereco do cliente adicionados:', data);
                alert("Endereco cadastrado" + data);
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
                throw error;
            });
    }
}
let cliente = new Cliente();
let clienteEndereco = new ClienteEndereco();

document.querySelector("#confirmar").addEventListener('click', () => {

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

    cliente.criarCliente();
        

    //alert(JSON.stringify(cliente) + JSON.stringify(clienteEndereco));
    
})