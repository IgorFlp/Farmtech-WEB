class Usuario {
    constructor(nome, login, cargo, senha) {
        this.nome = nome;
        this.login = login;
        this.cargo = cargo;
        this.senha = senha;
    }
}
function montarTabela() {
    let tabela = document.querySelector("#usuarioTabela > tbody");
    let i = 0;
    let usuarios = [];
    usr = new Usuario("Julio", "Julio354", "Vendedor");
    usuarios.push(usr);
    usr = new Usuario("Andreia", "And984", "Gerente de vendas");
    usuarios.push(usr);
    usr = new Usuario("Cleomar", "Cleo1324", "Gerente geral");
    usuarios.push(usr);
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

        tabela.appendChild(linha);
        i++;
    });
    i = 0;
}

window.addEventListener("load", async () => {
    //clientes = await usuario.consultarUsuario();
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
    });
});
