
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
    let usr = new Usuario("", usuario, "", senha);

    
    const url = '/Usuario/Logar';        
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usr)            
        })
            .then(response => {
                if (response.ok) {
                    return response.json();

                } else {
                    throw new Error(alert("Login incorreto"));
                    return "Incorreto"
                }
            })
            .then(data => {
                console.log('Login feito com sucesso:', data);
                let usuario = data.user;
                localStorage.setItem('usrNome',usuario.nome);
                localStorage.setItem('usrId', usuario.id);
                console.log(usuario.nome +"-"+ usuario.id)
                const url = 'Home/Index';
                window.location.href = url;            
                return "Correto";
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