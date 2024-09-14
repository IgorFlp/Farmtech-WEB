
class Usuario {
    constructor(nome, login, cargo, senha) {
        this.nome = nome;
        this.login = login;
        this.cargo = cargo;
        this.senha = senha;
    }
}
function logar() {
    
    const usuario = document.querySelector("#usuario").value;
    const senha = document.querySelector("#senha").value;
    console.log("Usuario: " + usuario + "Senha: " + senha);
    let usuario = new Usuario("", usuario, "", senha);

    
        const url = '/Usuario/Logar';        
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringfy(usuario);            
        })
            .then(response => {
                if (response.ok) {
                    return response.json();

                } else {
                    throw new Error('Usuario não encontrado.');
                }
            })
            .then(data => {
                console.log('Login feito com sucesso:', data);
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    

    //fetch pro banco de dados
    if (usuario == "Jorge" && senha == "123") {
        return "Correto";
        //location.replace("home.html");
    } else {
        
        alert("Login incorreto");
        return 'Incorreto';
    }
}