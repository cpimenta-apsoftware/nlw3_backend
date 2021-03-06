# nlw3-backend

API Rest desenvolvida com Express.js, para marcação de orfanatos em um mapa com informações para promover visitas e acões de ajuda.
Parte do conteúdo foi disponibilizado no NLW 3, evento realizado pela Rocketseat (https://github.com/Rocketseat).

## Ambiente (Versões)
1. node -v : v12.19.0 (choco upgrade nodejs-lts)
2. npm -v : 6.14.8
3. yarn -v : 1.22.5 (choco upgrade yarn)

## Execução
```sh
cd nlw3-backend
yarn
yarn typeorm migration:run
yarn dev
```

## Testando a API
### Em execução -> POST
```sh
curl -i -X POST "http://localhost:3333/orfanatos" -H "accept: */*" -H "Authorization: Abre-te Cézamo..." -H "Content-Type: application/json" -d "{\"nome\":\"Lar da Criança\",\"latitude\":-12.9694025,\"longitude\":-38.490993,\"sobre\":\"Foi fundado em 1963 a partir do sonho da adolescente Dulce Maria Goulart de Freitas. Mais informações em: http://lardacriancasalvador.org.br\",\"instrucoes\":\"Qualquer pessoa pode realizar visitas no Lar da Criança, desde que respeitados os dias e horários estabelecidos. Para agendar sua visita, entre em contato pelo telefone: (71) 3244-3795.\",\"horario_atendimento\":\"Das 8h até as 18h\",\"aberto_fim_semana\":true}"
```

### Em execução -> GET
```sh
curl -s "http://localhost:3333/orfanatos" |jq
curl -s "http://localhost:3333/orfanatos/1" |jq
```

### Jest
```sh
yarn test
```

## Roteiro para criação desse projeto
1. mkdir backend
2. yarn init -y
3. yarn add git-commit-msg-linter -D
4. Adicionar o .gitignore com o seguinte conteúdo: node_modules/**/*
5. yarn add express @types/express -D
6. yarn add typescript -D
7. yarn tsc --init
8. Mudar o target de es5 para es2017 no arquivo tsconfig.json;
9. yarn add ts-node-dev -D
10. Criar o atributo "scripts" com o conteúdo "dev":"ts-node-dev src/server.ts" no arquivo package.json;

## Para executar o projeto mais rápido
1. Adicionar "--transpile-only" no scripts dev em package.json (para não verifiar erros no código);
2. Adicionar "--ignore-watch" node_modules no scripts dev em package.json (para não verificar o node_modules por alterações no código);
3. Adicionar app.use(express.json()); no arquivo server.ts para que a aplicação consiga tratar requisições com body em json;

## Módulo de banco de dados
1. yarn add typeorm sqlite3 (cria o banco de dados como um arquivo físico no projeto e faz a integração entre o sqlite e o node).

obs.: Há três formas de integrar o banco de dados com o backend: 

. Driver Nativo => 
sqlite3.query('SELECT * FROM ...');

. Query Builder (exemplo: knex.js) =>
knex('users').select('*').where('nome', "Diego')

. ORM (Object Relational Mapping) =>
Cada tabela do banco é uma classe no projeto e cada linha da tabela é uma instância da classe.

2. Para usar o typeorm com sqlite, criar a pasta database dentro da pasta src com os arquivos connection.ts e database.sqlite, além do arquivo ormconfig.json na raiz do projeto;
3. Para criar o modelo com migrations, criar a pasta migrations dentro da pasta database e usar o cli do typeorm. Obs.: testar se o cli do typeorm está sendo executado em typescript ao invés de javascript, digitando yarn typeorm no console, se estiver executando em typescript os comandos serão exibidos precedidos de cli.js, senão deve ser incluido o seguinte script no arquivo package.json:  "typeorm" : "ts-node-dev ./node_modules/typeorm/cli.js";
4. yarn typeorm migration:create -n criar_orfanatos
5. Editar o arquivo criado em migrations para criar as tabelas e colunas;
6. yarn typeorm migration:run para executar as migrations e criar as estruturas no arquivo de banco de dados.
7. Criar a pasta models dentro da pasta src para criar os modelos que irão representar as tabelas no projeto integrando com typeorm.
8. Descomentar o código strictPropertyInitialization no arquivo tsconfig.json e colocar seu valor como false, para remover a sinalização da necessidade de inicializar os atributos do modelo;
9. Habilitar a API dos decorators no arquivo tsconfig.json: experimentalDecorators": true, "emitDecoratorMetadata": true
10. Se precisar reverter a última migration executada, yarn typeorm migration:revert 

## Organização das rotas
1. Criar o arquivo Routes.ts para centralizar as rotas do projeto
2. Criar a pasta controllers dentro da pasta src para centralizar as regras das rotas;

## Upload de arquivos
```sh
yarn add multer 
```
```sh
yarn add @types/multer -D
```
1. Criar a pasta config dentro da pasta src, e nela criar o arquivo upload.ts.
2. Criar a pasta uploads na raiz do projeto.

## Trabalhando com views
1. Criar a pasta views dentro da pasta src;

## Lidando com exceções
```sh
yarn add express-async-errors
```
1. Criar uma pasta errors dentro da pasta src, e dentro dela criar um arquivo handler.ts;

## Validação de dados (utilizando o módulo mais massa de validação que a gente tem no javascript: yup)
```sh
yarn add yup 
```
```sh
yarn add @types/yup -D
```

## Permitir que a API seja acessível pelos front-ends ou back-ends a partir de outros domínios (incluindo outras portas)
```sh
yarn add cors
```
```sh
yarn add @types/cors -D
```

## Biblioteca de criptografia
```sh
yarn add bcrypt
```
```sh
yarn add @types/bcrypt -D
```