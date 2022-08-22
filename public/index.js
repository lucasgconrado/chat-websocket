const setLocalStorage = (usuario) => localStorage.setItem("usuario", JSON.stringify(usuario));

function btnEntrar() {
    var inputNome = document.getElementById("nome").value; //pegar o nome
    var idUsuario = (Math.random() * 100).toString(); //gerar um id pro usuário, número aleatório multiplicado só para aleatorizar mais

    setLocalStorage({//Para salvar os dados do usuário
        nome: inputNome,
        meuId: idUsuario
    });

    window.location.href="chat.html?usuarionome=" + inputNome + "&meuid=" + idUsuario;
}