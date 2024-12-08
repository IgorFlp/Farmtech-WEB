class Usuario {
    constructor(nome, login, cargo, senha, id) {
        this.nome = nome;
        this.login = login;
        this.cargo = cargo;
        this.senha = senha;
        this.id = id;
    }
    consultarUsuarios() {
        const url = '/Usuario/Consultar';
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
                    throw new Error('Erro ao consultar usuarios.');
                }
            })
            .then(data => {
                console.log('Consulta usuarios realisada com sucesso:', data);
                return data;
            })
            .catch(error => {
                console.error('Erro:', error);
            });
        
    }
    async criarUsuario(tipo,idUser) {
        const usuario = new Usuario();
        let login = document.querySelector("#txtUsuario").value;
        let cargo = document.querySelector("#slcCargo").value;
        let nome = document.querySelector("#txtNome").value;
        let senha = document.querySelector("#txtSenha").value;
        usuario.login = login;
        usuario.cargo = cargo;
        usuario.nome = nome;
        usuario.senha = senha;

        if (login != null && login != "" &&
            cargo != null && cargo != "" &&
            nome != null && nome != "" &&
            senha != null && senha != ""
        ) {
            if (tipo == "Novo") {
                console.log("tipo: " + tipo);
                const url = '/Usuario/Criar';

                return await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(usuario)


                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Erro ao cadastrar usuario. Error code: '+response.status +response.json());
                        }
                    })
                    .then(data => {
                        console.log('Usuario cadastrado adicionados:', data);
                        location.reload();
                        return data;
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                        throw error;
                    });
            } else if (tipo == "Alterar") {
                usuario.id = idUser;
                console.log("tipo: " + tipo);
                console.log("Usuario: " + JSON.stringify(usuario));
                const url = "http://localhost:5147/api/Usuario/" + idUser;
                //const url = '/Usuario/Alterar';

                return await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(usuario)

                })
                    .then(response => {
                        if (response.ok) {
                            return response.ok;
                        } else {
                            throw new Error('Erro ao alterar usuario Error code: ' + response.status + response.json());
                        }
                    })
                    .then(data => {
                        console.log('Usuario alterado com sucesso:', data);
                        location.reload();
                        return data;
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                        throw error;
                    });
            }
        } else {
            alert("Preencha todos os campos!");
        }
    }
    alterarUsuario() {
        //let usuario = new Usuario();     
        let login = document.querySelector("#txtUsuario").value;
        let cargo = document.querySelector("#slcCargo").value;
        let nome = document.querySelector("#txtNome").value;
        let senha = document.querySelector("#txtSenha").value;
        let nodeList = document.querySelectorAll(".check-usuario");        
            Array.from(nodeList).forEach(async function (el) {
                if (el.checked == true) {
                    //console.log("Marcado: " + el.id)
                    let linha = el.parentElement.parentElement;
                    //console.log("Linha: " + linha.id)
                    let idBusca = document.querySelector("#" + CSS.escape(linha.id) + " .labelId").innerText
                    usuario.id = idBusca;
                    console.log("Id usuario: " + usuario.id);
                    habilitaCampos();
                    let pos = usuarios.findIndex((u) => u.id.toString() === idBusca);
                    console.log("POS: " + pos + JSON.stringify(usuarios[pos]));
                    document.querySelector("#txtUsuario").value = usuarios[pos].login;
                    let slcCargo = document.querySelector("#slcCargo");
                    for (let i = 0; i < slcCargo.options.length; i++) {
                        if (slcCargo.options[i].text.toLowerCase() === usuarios[pos].cargo.toLowerCase()) {
                            slcCargo.selectedIndex = i;
                            break;
                        }
                    }
                    document.querySelector("#txtNome").value = usuarios[pos].nome;
                    document.querySelector("#txtSenha").value = usuarios[pos].senha;
                }
            }
            )
        
    }
    async excluirUsuario() {
        let nodeList = document.querySelectorAll(".check-usuario");
        Array.from(nodeList).forEach(async function (el) {
            if (el.checked == true) {
                console.log("Marcado: " + el.id)
                let linha = el.parentElement.parentElement;
                console.log("Linha: " + linha.id)
                let idBusca = document.querySelector("#" + CSS.escape(linha.id) + " .labelId").innerText
                console.log("ID: " + idBusca);                
                usuario.id = idBusca;
                //Excluir cliente

                const url = '/Usuario/Excluir';
                // Faz a requisição POST usando fetch
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(usuario)
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json(); // Se a resposta for OK, converte para JSON
                        } else {
                            throw new Error('Erro ao excluir cliente.');
                        }
                    })
                    .then(data => {
                        console.log('Usuario excluido:', data);
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
let usuario = new Usuario();
let usuarios = [];
function montarTabela() {
    let tabela = document.querySelector("#usuarioTabela > tbody");
    let i = 0;   

    usuarios.forEach((c) => {
        let linha = document.createElement("tr");
        linha.id = "linha-" + i;

        let checkbox = document.createElement("input");
        checkbox.id = "cb-" + i;
        checkbox.type = "checkbox";
        checkbox.className = "text-center check-usuario";
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
    const usuario = document.querySelector("#txtUsuario");
    const cargo = document.querySelector("#slcCargo");
    const nome = document.querySelector("#txtNome");
    const senha = document.querySelector("#txtSenha");
    const salvar = document.querySelector("#btnSalvar");
    usuario.disabled = false;
    cargo.disabled = false;
    nome.disabled = false;
    senha.disabled = false;
    salvar.disabled = false;
}

window.addEventListener("load", async () => {
    //clientes = await usuario.consultarUsuario();
    usuarios = await usuario.consultarUsuarios();
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
        await usuario.excluirUsuario();
    });
    document.querySelector(".incluir").addEventListener("click", async () => {
        habilitaCampos();
        document.querySelector(".salvar").addEventListener('click', async () => {
            usuario.criarUsuario("Novo");
        })
    });    
    document.querySelector(".alterar").addEventListener("click", async () => {        
        let res = await usuario.alterarUsuario();   
        console.log("ID USER: " + usuario.id);
        document.querySelector(".salvar").addEventListener('click', async () => {            
            console.log("ID USER: " + usuario.id);
            let idUser = usuario.id;
            usuario.criarUsuario("Alterar",idUser);
        })
    });
});
