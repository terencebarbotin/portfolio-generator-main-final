# PostgreSLQ Database

## Start with Docker
Pull the image latest official image :
```bash
docker pull postgres:15.3
```

Create the database : 
```bash
docker run --name postgres-container \
    -e POSTGRES_USER=admin \
    -e POSTGRES_PASSWORD=secret \
    -e POSTGRES_DB=portfolio \
    -p 5432:5432 \
    -d postgres:15.3
```

or run it
```bash
docker start postgres-container
```

The next step is now to intialialize the database i.e. create tables and add mock datas :
```bash
#docker exec -it postgres-container psql -U admin -d portfolio
docker exec -i postgres-container psql -U admin -d portfolio < src/init.sql
docker exec -i postgres-container psql -U admin -d portfolio < src/populate.sql
docker exec -i postgres-container psql -U admin -d portfolio < src/verify_data.sql
#docker restart postgres
```

Stop the image : 
```bash
docker ps
docker stop <id_image>
```
