// importando os prompts da biblioteca inquirer
const {
    select,
    input,
    checkbox
} = require('@inquirer/prompts');

// lista de metas (primeira feita à mão)
let meta = {
    value: "tomar 3L de água por dia.",
    checked: false,
};
let metas = [meta];

// cadastra metas
const cadastrarMeta = async () => {
    const meta = await input({
        message: "digite a sua meta:"
    });

    if (meta.length == 0) {
        console.log("a meta não pode ser vazia.");
        return // cadastrarMeta() caso queira que a pessoa escreva algo
    }

    // cadastra a meta digitada
    metas.push({
        value: meta,
        checked: false
    });
}

// lista metas
const listarMetas = async () => {
    const respostas = await checkbox({
        message: "use as setas para mudar de meta, o espaço para marcar/desmarcar, e o enter para finalizar.",
        choices: []
    });
}

// começa a aplicação
// async pois existe o await dentro (async/promises)
const start = async () => {

    // cria o menu
    while (true) {

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
                    value: "listar"
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
                console.log(metas);
                break;
            case "listar":
                await listarMetas();
                break;
            case "sair":
                console.log("até mais.");
                return;
        }
    }
}

start();