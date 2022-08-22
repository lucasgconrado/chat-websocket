let usuarios = []; //lista de usuários
const moment = require('moment');
moment.locale('pt-br');

function usuarioEntrou(id, nome, sala, meuid){
    const usuario = {id, nome, sala, meuid};
    usuarios.push(usuario); //adicionar o usuário na lista de usuários
    return usuario;
}

function usuarioSaiu(id){
    const index = usuarios.findIndex(usuario => usuario.id === id);
    if(index !== -1){
        return usuarios.splice(index, 1)[0];
    }
}

function mensagemFormatada(usuarioNome, mensagemParam, meuid){
    var mensagem = mensagemParam ? mensagemParam : "Entrou na sala.";
    
    return{
        usuarioNome,
        mensagem,
        horario: moment().format('lll'),
        meuid
    };
}

function getUsuariosSala(){
    return usuarios;
}

function getUsuario(idUsuario){
    return usuarios.find(usuario => usuario.id === idUsuario);
}

module.exports = {
    usuarioEntrou,
    getUsuariosSala,
    mensagemFormatada,
    getUsuario,
    usuarioSaiu
};
