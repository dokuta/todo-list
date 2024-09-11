// importando o prompt (select) da biblioteca inquirer
const {
    select
} = require('@inquirer/prompts');

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
                console.log("vamos cadastrar.");
                break;
            case "listar":
                console.log("vamos listar.");
                break;
            case "sair":
                console.log("até mais.");
                return;
        }
    }
}

start();