## Aplicação de Gerenciamento de Metas

### Descrição

Essa aplicação Node.js, construída com JavaScript e a biblioteca Inquirer, permite que você gerencie suas metas de forma simples e intuitiva, e foi desenvolvida durante a NLW Pocket da plataforma Rocketseat. Nela, você pode:

-   **Cadastrar novas metas:** Adicione novas metas à sua lista a qualquer momento.
-   **Listar todas as metas:** Visualize todas as metas cadastradas, tanto as concluídas quanto as em aberto.
-   **Marcar metas como concluídas:** Marque as metas que você já alcançou.
-   **Visualizar metas realizadas e abertas:** Veja as que você já concluiu e as que estão faltando.
-   **Deletar metas:** Remova metas que não são mais relevantes.

### Como Utilizar

1.  **Instale as dependências:**
    
    Bash
    
    ```
    npm install
    
    ```
    
2.  **Execute a aplicação:**
    
    Bash
    
    ```
    node index.js
    
    ```
    
3.  **Interaja com o menu:** Siga as instruções na tela para navegar pelas opções e gerenciar suas metas.

### Tecnologias Utilizadas

-   **Node.js:** Plataforma para execução de JavaScript fora do navegador.
-   **JavaScript:** Linguagem de programação utilizada para desenvolver a aplicação.
-   **Inquirer.js:** Biblioteca para criar interfaces de linha de comando interativas.
-   **fs:** Módulo do Node.js para interagir com o sistema de arquivos.

### Estrutura do Projeto

-   **index.js:** Arquivo principal da aplicação, contendo toda a lógica do programa.
-   **package.json:** Arquivo que gerencia as dependências do projeto.
-   **goals.json:** Arquivo onde as metas são armazenadas.


**Exemplo de utilização:**

```
MENU >
❯ cadastrar meta
listar metas
metas realizadas
metas abertas
deletar metas
sair

Digite a sua meta: Aprender Node.js
meta cadastrada com sucesso.

MENU >
❯ listar metas
use as setas para mudar de meta, o espaço para marcar/desmarcar, e o enter para finalizar.

❯ Aprender Node.js

meta(s) marcada(s) como concluída(s).

```