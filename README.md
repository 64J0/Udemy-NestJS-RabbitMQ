# Curso: Microservices em Node.js com NestJS e RabbitMQ

Neste repositório estão armazenados os códigos desenvolvidos ao londo do curso Microservices em Node.js com NestJS e RabbitMQ, feito na Udemy.

Tecnologias utilizadas:

```bash
1. Node.js
2. NestJS
3. RabbitMQ
4. MongoDB
```

Abaixo seguem algumas informações mais detalhadas a respeito da aplicação desenvolvida, assim como alguns conhecimentos adquiridos nas aulas.

<details>
  <summary>Entendendo a aplicação</summary>

  **Domínio da aplicação**

  Uma aplicação que será utilizada por jogadores amadores de tênis. Estes jogadores fazem parte de um ranking que é atualizado conforme realização das partidas. Atualmente este ranking é controlado de forma manual, e o organizador nos procurou para desenvolver uma aplicação que modernize o controle, visando incentivar quem já participa, bem como disponibilizar um atrativo para novos jogadores.

  **Jogador**

  * Solicitar ou rejeitar um desafio;
  * Registrar o resultado de uma partida;
  * Acompanhar os rankings;
  * Consultar seus dados e seu histórico de partidas (vitórias, derrotas, posição no ranking);
  * Consultar as informações de seus adversários (histórico de partidas e dados);
  * Ser notificado por e-mail quando for desafiado.

  **Administrador**
  
  * Cadastrar as categorias e definir as pontuações;
  * Cadastrar jogadores e definir suas categorias;
  * Ser notificado quando existir um desafio pendente a mais de 10 dias.

  **Entidades**

  ```bash
    Categorias                             Rankings
        |:1                                   |:1
        |             Notificações            |
        |                                     |
        |:N                                   |:1
    Jogadores --------- Desafios --------- Partidas 
              :N      :N        :1      :1
  ```
</details>

<details>
  <summary>Iniciando a aplicação</summary>

  Para iniciar o desenvolvimento da aplicação devemos ter previamente instalado o Node.js e o NPM. Então basta executar os seguintes comandos no terminal:

  ```bash
    # algumas opções que falharam:
    # 1. npx @nestjs/cli
    # 2. npx @nestjs/cli new api-smartranking

    # instala o pacote globalmente
    npm install -g @nestjs/cli

    # executa o script de iniciar o desenvolvimento do projeto api-smartranking
    nest new api-smartranking

    # criar um módulo chamado players
    nest g players

    # criar um controller chamado players
    nest g controller players
  ```
</details>

---
2021, Vinícius Gajo Marques Oliveira