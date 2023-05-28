# TFG-Backend_Auth-API_REST

## Running the API
The main way to run the project is via Docker.

### Docker run

```
docker run -d \
  --name my-awesome-container \
  -p 3001:3001 \
  trino11/tfg-backendauth:latest
```

Since all environment variables has a default value, you may want to change most of them, here are the env-vars and their default values:

- ENV JWTKEY key            (JWT secure key, used to encrypt the jwt sessions token)
- ENV KEYSSN key            (Sessions secure key, used to encrypt the expressSessions sessions token)
- ENV PORT_ENV 3001         (Express port, you can also change the -p param that its safer)
- ENV DBHOST 172.0.0.1      (DB hostname)
- ENV DBPORT 27017          (DB post)
- ENV DBUSER root           (DB user)
- ENV DBPASSWORD root       (DB password)

A docker run using two of them:

```
docker run -d \
  --name my-awesome-container \
  -e DBUSER=myuser \
  -e DBPASSWORD=mysecurepassword \
  -p 3001:3001 \
  trino11/tfg-backendauth:latest
```

**The name of the database must be database at the moment is not configurable.**

### Docker compose

Other way to run docker containers is docker-compose.yml

Here is an example using it with a mongo instance on the same docker compose.

```
version: '3'
services:
  tfg_auth:
    image: trino11/tfg-backendauth:latest
    environment:
      - "JWTKEY=myawesometoken"
      - "KEYSSN=myawesometoken"
      - "DBHOST=mongo_tfg_auth"
      - "DBPORT=27017"
      - "DBUSER=root"
      - "DBPASSWORD=root"
    ports:
      - 3001:3001

  mongo_tfg_auth:
    image: mongo:4.4.6
    ports:
      - 27017:27017
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=root
      - MONGO_INITDB_DATABASE=database
    volumes:
      - /opt/mongo/auth:/data/db
```

