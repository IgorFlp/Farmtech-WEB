document.querySelector("#btnEntrar").addEventListener("click", () => {
    const usuario = document.querySelector("#usuario").value;
    const senha = document.querySelector("#senha").value;
    console.log("Usuario: " + usuario + "Senha: " + senha);

    //fetch pro banco de dados
    if (usuario == "Jorge" && senha == "123") {
        
        location.replace("home.html");
    } else {
        alert("Login incorreto");
    }
});