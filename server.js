const express = require("express");
const path = require("path");
const http = require("http");
const {usuarioEntrou, getUsuariosSala, mensagemFormatada, getUsuario, usuarioSaiu } = require('./usuario'); //importando os métodos de usuário

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
const socketIO = require('socket.io');
app.use(express.static(path.join(__dirname, 'public')));
const io = socketIO(server);
const nomeSala = "Totvs Chat"
//Socket io

io.on('connection', socket => { //entrando na sala
    socket.on('entrarSala', ({usuarionome, meuid}) =>{ //chamando a função de entrar na sala
        const usuario = usuarioEntrou(socket.id, usuarionome, nomeSala, meuid); 
        socket.join(nomeSala);

        socket.broadcast.to(nomeSala).emit('novaMensagem', mensagemFormatada(usuario.nome)); //Se não tiver parâmetro, ele envia a mensagem automática do msgParam
        io.to(usuario.sala).emit("salaUsuarios", {sala: usuario.sala, usuarios: getUsuariosSala()});
    });

    socket.on('mensagemChat', mensagem => {
        const usuario = getUsuario(socket.id);
        io.to(nomeSala).emit('novaMensagem', mensagemFormatada(usuario.nome, mensagem, usuario.meuid));
    });

    socket.on('sairSala', () => {
        const usuario = usuarioSaiu(socket.id);

        if(usuario) {
            io.to(nomeSala).emit('novaMensagem', mensagemFormatada(usuario.nome, 'Saiu da sala', usuario.id));
            io.to(nomeSala).emit('salaUsuarios', {sala: usuario.sala, usuarios: getUsuariosSala()});
        }
    });
});


server.listen(PORT, () => console.log("Servidor online na porta " + PORT));
