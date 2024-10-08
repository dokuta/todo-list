// importando os prompts da biblioteca inquirer
const {
    select,
    input,
    checkbox
} = require('@inquirer/prompts');

// para salvar as metas
const fs = require("fs").promises;

// armazena mensagens
let mensagem = "boas vindas ao app de metas.";

// armazena as metas
let metas;

// carrega as metas, se houver
const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("goals.json", "utf-8");
        metas = JSON.parse(dados); // converte o json em array javascript
    } catch (erro) {
        metas = [];
    }
};

// salva as metas
const salvarMetas = async () => {
    // converte o array javascript em json
    await fs.writeFile("goals.json", JSON.stringify(metas, null, 2));
};

// cadastra as metas
const cadastrarMeta = async () => {
    const meta = await input({
        message: "digite a sua meta:"
    });

    if (meta.length == 0) {
        mensagem = "a meta não pode ser vazia.";
        return // cadastrarMeta() caso queira que a pessoa escreva algo
    }

    // cadastra a meta digitada
    metas.push({
        value: meta,
        checked: false
    });

    mensagem = "meta cadastrada com sucesso.";
}

// lista as metas
const listarMetas = async () => {
    // verifica se há metas
    if (metas.length == 0) {
        mensagem = "não existem metas.";
        return;
    }

    const respostas = await checkbox({
        message: "use as setas para mudar de meta, o espaço para marcar/desmarcar, e o enter para finalizar.",
        // pega tudo o que tem no metas
        choices: [...metas],
        instructions: false,
    });

    // desmarcando o que foi desmarcado
    metas.forEach((m) => {
        m.checked = false;
    });

    if (respostas.length == 0) {
        mensagem = "nenhuma meta selecionada.";
        return;
    }

    // verifica se foi a meta selecionada
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        });

        meta.checked = true;
    });

    mensagem = "meta(s) marcada(s) como concluída(s).";
}

// lista metas realizadas
const metasRealizadas = async () => {
    // verifica se há metas
    if (metas.length == 0) {
        mensagem = "não existem metas.";
        return;
    }

    // filter = HOF que precisa ser passada como função
    const realizadas = metas.filter((meta) => {
        return meta.checked;
    });

    if (realizadas.length == 0) {
        mensagem = "não existem metas realizadas. :(";
        return;
    }

    await select({
        message: "METAS REALIZADAS: " + realizadas.length,
        choices: [...realizadas]
    });
};

// lista metas abertas
const metasAbertas = async () => {
    // verifica se há metas
    if (metas.length == 0) {
        mensagem = "não existem metas.";
        return;
    }

    const abertas = metas.filter((meta) => {
        return !meta.checked; // ou: meta.checked != true;
    });

    if (abertas.length == 0) {
        mensagem = "não existem metas abertas. :D";
        return;
    };

    await select({
        message: "METAS ABERTAS: " + abertas.length,
        choices: [...abertas]
    });
};

// deleta as metas
const deletarMetas = async () => {
    // verifica se há metas
    if (metas.length == 0) {
        mensagem = "não existem metas.";
        return;
    }
    
    const metasDesmarcadas = metas.map((meta) => {
        return {
            value: meta.value,
            checked: false
        };
    });

    const metasParaDeletar = await checkbox({
        message: "selecione uma meta para deletar.",
        // pega tudo o que tem no metas
        choices: [...metasDesmarcadas],
        instructions: false,
    });

    if (metasParaDeletar.length == 0) {
        mensagem = "nenhuma meta para deletar.";
        return;
    }

    // lógica que apaga as metas de fato
    metasParaDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item;
        });
    });

    mensagem = "meta(s) deletada(s) com sucesso.";
};

// sistema de mensagens
const mostrarMensagem = () => {
    console.clear();

    if (mensagem != "") {
        console.log(mensagem);
        console.log(""); // pula uma linha
        mensagem = "";
    };
};

// começa a aplicação
// async pois existe o await dentro (async/promises)
const start = async () => {

    // carrega as metas salvas, se houver
    // await pois leva um tempo para abrir o arquivo e ler
    await carregarMetas();

    // cria o menu
    while (true) {
        mostrarMensagem();
        await salvarMetas(); // await pois leva um tempo para abrir o arquivo e salvar

        // await para esperar a resposta do usuário (async/promises)
        // o select exige um "message" e um "choices" (array de objetos)
        const opcao = await select({
            message: "MENU >",
            choices: [{
                    name: "cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "listar metas",
                    value: "listar",
                },
                {
                    name: "metas realizadas",
                    value: "realizar"
                },
                {
                    name: "metas abertas",
                    value: "abertas"
                },
                {
                    name: "deletar metas",
                    value: "deletar"
                },
                {
                    name: "sair",
                    value: "sair"
                }
            ]
        });

        // usa o resultado do select
        switch (opcao) {
            case "cadastrar":
                await cadastrarMeta();
                break;
            case "listar":
                await listarMetas();
                break;
            case "realizar":
                await metasRealizadas();
                break;
            case "abertas":
                await metasAbertas();
                break;
            case "deletar":
                await deletarMetas();
                break;
            case "sair":
                console.log("até mais.");
                return;
        }
    }
}

start();