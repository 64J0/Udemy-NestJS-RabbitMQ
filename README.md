# Curso: Microservices em Node.js com NestJS e RabbitMQ

Neste repositório estão armazenados os códigos desenvolvidos ao londo do curso: Microservices em Node.js com NestJS e RabbitMQ, feito na Udemy.

Além dessas tecnologias, o próprio estudo do NestJS e sua estrutura engloba diversos conceitos ligados ao SOLID, portanto a medida que alguns termos forem apresentados nas aulas irei atualizar este *README.md* para servir como uma fonte de estudos posteriormente.

Tecnologias utilizadas:

```bash
1. Node.js
2. NestJS
3. RabbitMQ
4. MongoDB
```

Abaixo seguem algumas informações mais detalhadas a respeito da aplicação desenvolvida, assim como alguns conhecimentos adquiridos nas aulas.

<details>
  <summary>Entendendo a aplicação:</summary>

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
  <summary>Iniciando a aplicação:</summary>

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

    # criar um service
    nest g service players
  ```
</details>

<details>
  <summary>Modules:</summary>

  Uma aplicação NestJS é organizada em módulos (modules). Toda aplicação NestJS tem pelo menos um módulo, que é o *root module*. É o "starting-point" da aplicação.

  Um módulo é definido quando anotamos uma classe com o *decorator* **@Module()**, e é um singleton.

  Este decorator recupera um objeto que descreve o módulo, usando as seguintes propriedades:

  * Providers: Array de providers que devem estar disponíveis dentro do módulo via injeção de dependências;
  * Controllers: Devem ser instanciados dentro do módulo;
  * Exports: Providers que devem ser exportados para outros módulos;
  * Imports: Lista de módulos necessários para uso no módulo atual.
</details>

<details>
  <summary>Controllers:</summary>

  Estes componentes são responsáveis por lidar com as requisições e retornar as respostas para o cliente.

  Um controller é definido quando anotamos uma classe com o *decorator* **@Controller()**, que pode receber um *path* representando a rota relacionada com aquele controller.

  Possuem *handlers* que lidam diretamente com métodos HTTP (GET, POST, DELETE, PUT, etc). Estes *handlers* são métodos implementados dentro da classe controller, que são anotados com os decorators relacionados a cada verbo HTTP.
</details>

<details>
  <summary>Providers e Services:</summary>

  **Providers**

  Os providers são elementos injetados dentro de construtores automaticamente, quando encontra-se o *decorator* **@Injectable()**, podendo ser uma classe, sync/async factory, etc.

  Providers devem ser fornecidos por um módulo para se tornarem utilizáveis.

  **Services**
  
  São definidos como providers, porém, nem todos providers são services. São singleton quando empacotados com **@Injectable()** e fornecidos a um módulo. Ou seja, uma mesma instância será compartilhada em toda a aplicação.

  É a principal fonte de lógica de negócios.
</details>

<details>
  <summary>Injeção de dependências:</summary>

  O NestJS utiliza o *pattern* de injeção de dependências para injetar código automaticamente em classes que nós criamos, adicionando **Providers** ou **Services** no método construtor de um **Controller**.

  A *injeção de dependências* é uma técnica de Inversão de Controler (**IoC**), na qual delegamos a instanciação de dependências para o **IoC Container** (que neste projetos erá o NestJS), ao invés de fazermos em nosso próprio código de forma imperativa. 

  Existem três etapas no fluxo de injeção de dependências do NestJS:

  1. No **Service** que será injetado, o decorator **@Injectable** define que a classe pode ser gerenciada pelo **Nest IoC Container**.

  2. No **Controller** declaramos uma dependência do **Service** que deve ser injetado, passando essa informação nos atributos de instanciação do construtor do **Controller**.

  ```typescript
    constructor(private readonly service: Service) {}
  ```

  3. No arquivo raiz do módulo nós definimos no array de providers o **Service** que desejamos injetar no **Controller**.

  ```typescript
    @Module({
      controllers: [Controller],
      providers: [Service]
    })
  ```

  Desta forma quando o **Nest IoC Container** instancia um **Controller**, ele primeiro procura por quaisquer dependências.
  
  Quando o container encontra a dependência do **Service** ele realiza uma pesquisa pelo token do **Service**, que retorna a classe deste.

  Por fim, assumindo o escopo SINGLETON (comportamento padrão), o NestJS cria uma instância do **Service**, armazena em cache e a retorna, ou, se já estiver alguma instância deste **Service** em cache, retorna essa instância já existente.
</details>

---
2021, Vinícius Gajo Marques Oliveira