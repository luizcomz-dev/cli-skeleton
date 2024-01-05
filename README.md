# Projeto CLI e Test

Este repositório contém dois projetos interligados: `cli`, uma ferramenta de linha de comando, e `test`, que serve para testar as funcionalidades do `cli`. O projeto `test` utiliza o `cli` como uma dependência via `npm link`, permitindo que os comandos sejam executados diretamente do seu diretório.

## Projeto CLI

A ferramenta CLI é projetada para aceitar comandos, com dois argumentos principais: `--start` e `--build`. Esses comandos permitem aos usuários iniciar o projeto ou construir o projeto, respectivamente.

### Instalação

Para configurar o `cli` para desenvolvimento ou uso:

```bash
cd cli
npm install
npm link
```
Isso irá instalar as dependências necessárias e vincular o cli globalmente, de modo que possa ser chamado de qualquer lugar.

## Projeto Test

O projeto test é utilizado para testar as funcionalidades do cli.

### Configuração para teste
```bash
cd test
npm install
npm link cli
```
Isso irá instalar o cli como uma dependência simbólica no projeto test, permitindo que você execute comandos do cli dentro do diretório test.

### Testando o CLI
Após configurar o npm link, você pode testar os comandos cli diretamente:

```bash
cli --start # Inicia o projeto
```
```bash
cli --build # Constrói o projeto
```

### Configurações
O cli carrega as configurações necessárias do projeto test de duas formas possíveis:

1 - Através de uma tag cli no arquivo package.json do projeto test.
2 - Utilizando um arquivo cli-config.js localizado na raiz do projeto test.

O arquivo de configuração é processado pelo config-mrg.js para determinar as ações apropriadas a serem tomadas com base nos argumentos fornecidos.

Certifique-se de que o package.json do projeto test inclua a tag cli com as configurações apropriadas ou que um arquivo cli-config.js esteja presente na raiz.

#### exemplo `/test/package.json`
```javascript
  {
    (...tags do package.json),
    "cli": {
      "port": "1234"
    }
  }
```
#### exemplo `/test/cli-config.js`
```javascript
module.exports = {
  port: 9090
}
```

### Logs
O sistema de logs é uma parte fundamental da ferramenta CLI, fornecendo informações detalhadas sobre o processo de execução e quaisquer erros que possam ocorrer.

Setando a chave `DEBUG=` antes do comando é possível indicar quais logs de debug você pretende visualizar

```bash
DEBUG=* cli --start #exibe todos os logs de debug
DEBUG=commands:* cli --start #exibe os logs de debug da camada de commands
DEBUG=bin:* cli --start #exibe apenas os logs de debug da camada bin
DEBUG=config:* cli --start #exibe apenas os logs de debug da camada config
```