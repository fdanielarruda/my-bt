const adicionarJogo = (jogador1, jogador2, jogador3, jogador4) => {
    jogos_atuais = localStorage.getItem('jogos');

    if (jogos_atuais)
        jogos_atuais = JSON.parse(jogos_atuais);
    else
        jogos_atuais = [];

    const hash = Math.random().toString(36).substring(7);

    jogos_atuais.push({
        id: hash,
        dupla1_jogador1: jogador1,
        dupla1_jogador2: jogador2,
        dupla2_jogador1: jogador3,
        dupla2_jogador2: jogador4,
        pontuacao_dupla1: null,
        pontuacao_dupla2: null
    });

    localStorage.setItem('jogos', JSON.stringify(jogos_atuais));
}

const adicionarResultado = (id, pontuacao_dupla1, pontuacao_dupla2) => {
    jogos_atuais = localStorage.getItem('jogos');
    jogos_atuais = JSON.parse(jogos_atuais);

    jogos_atuais.forEach(element => {
        if (element.id === id) {
            element.pontuacao_dupla1 = pontuacao_dupla1;
            element.pontuacao_dupla2 = pontuacao_dupla2;
        }
    });

    localStorage.setItem('jogos', JSON.stringify(jogos_atuais));
}

function addGame() {
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;
    const player3 = document.getElementById('player3').value;
    const player4 = document.getElementById('player4').value;

    adicionarJogo(player1, player2, player3, player4);
    listarJogos();
}

function listarJogos() {
    const jogos = localStorage.getItem('jogos');

    if (jogos) {
        document.getElementById('lista_de_jogos').innerHTML = ``;

        JSON.parse(jogos).forEach(element => {
            let placar = '';

            if (!element.pontuacao_dupla1 || !element.pontuacao_dupla2) {
                placar = `<button onclick="adicionarPlacar('${element.id}')">Novo</button>`;
            } else {
                placar = `${element.pontuacao_dupla1} x ${element.pontuacao_dupla2}`;
            }

            document.getElementById('lista_de_jogos').innerHTML += `
                <tr>
                    <td>${element.dupla1_jogador1} & ${element.dupla1_jogador2}</td>
                    <td>${element.dupla2_jogador1} & ${element.dupla2_jogador2}</td>
                    <td>${placar}</td>
                    <td>
                        <button onclick="removerJogo('${element.id}')">Remover</button>
                    </td>
                </tr>
            `;
        });
    }
}

function adicionarPlacar(id) {
    const placar1 = prompt('Digite a pontuação da dupla 1');
    const placar2 = prompt('Digite a pontuação da dupla 2');

    adicionarResultado(id, placar1, placar2);
    listarJogos();
}

function removerJogo(id) {
    jogos_atuais = localStorage.getItem('jogos');
    jogos_atuais = JSON.parse(jogos_atuais);

    jogos_atuais = jogos_atuais.filter(element => element.id !== id);

    localStorage.setItem('jogos', JSON.stringify(jogos_atuais));

    listarJogos();
}

function listarJogadores() {
    let players = localStorage.getItem('players');

    if (players) {
        document.getElementById('lista_de_jogadores').innerHTML = ``;

        JSON.parse(players).forEach(element => {
            document.getElementById('lista_de_jogadores').innerHTML += `
                <tr>
                    <td>${element}</td>
                    <td>
                        <button onclick="removerJogador('${element}')">Remover</button>
                    </td>
                </tr>
            `;
        });
    }
}

function addPlayer() {
    const player = document.getElementById('newPlayer').value;
    let players = localStorage.getItem('players');

    if (players)
        players = JSON.parse(players);
    else
        players = [];

    players.push(player);

    localStorage.setItem('players', JSON.stringify(players));
    document.getElementById('newPlayer').value = '';
    listarJogadores();
}

function removerJogador(jogador) {
    let players = localStorage.getItem('players');
    players = JSON.parse(players);

    players = players.filter(element => element !== jogador);

    localStorage.setItem('players', JSON.stringify(players));

    listarJogadores();
}

function listarJogadoresEmSelects() {
    document.querySelectorAll('.lista_para_confrontos').forEach(element => {
        let players = localStorage.getItem('players');
        element.innerHTML = '';

        if (players) {
            players = JSON.parse(players);

            players.forEach(player => {
                element.innerHTML += `<option value="${player}">${player}</option>`;
            });
        }
    });
}
