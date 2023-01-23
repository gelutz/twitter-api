# Twitter API - Gabriel
> Simples API que se assemelha ao twitter

--------

## Iniciando projeto:

```bash
git clone https://github.com/gelutz/twitter-api
cd twitter-api
yarn
```
- Renomear .env.example para .env e preencher todas as chaves.
> já estão preenchidas para que ambos rodem com o docker

## Rodando o projeto
#### Docker:
- Alterar o DB_HOST no arquivo .env para que aponte para o nome do container `twitterdb`
```bash
docker compose up --build
```
#### Dev:
- Alterar o DB_HOST no arquivo .env para que aponte para o IP do container `10.1.1.10`
```bash
docker compose up --build # levanta apenas o container do PostgreSQL
yarn dev
```