Example of a REST api with authentication using Node.js , Express, PostgreSQL and JWT

Partial API documentation can be found in swagger folder

Install necessary node modules:

```
npm install
```

Deploy:

```
docker-compose up -d
```

Deploy and rebuild:

```
docker-compose up --build -d
```

Hard reset, bye bye data

```
docker-compose down
docker volume rm $(docker volume ls -q)
docker rm -f $(docker ps -a -q)
docker-compose up -d
```

//TODO: add more info
