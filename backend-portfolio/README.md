# Backend portfolio micro service

Micro service to manage portfolios entries.

## Start with Docker (best option)

Pull the image :
```bash
docker pull terencered/portfolio-service:latest
```

Run the image : 
```bash
docker run -p 3000:3000 --env-file .env terencered/portfolio-service:latest
```

Stop the image : 
```bash
docker ps
docker stop <id_image>
```

## Installation and start (for dev usage)

First you need to install the dependencies with : 
```bash
npm install
```

To start the server : 
```bash
npm run start
```

To start the server in dev mode : 
```bash
npm run dev
```

## Build and publish a Docker image

Build by replacing `1.0` with the tag and tag it to `lastest` version, run the image to test it and publish it :
```bash
docker build -t terencered/portfolio-service:1.0 .
docker tag terencered/portfolio-service:1.0 terencered/portfolio-service:latest
docker run -p 3000:3000 --env-file .env terencered/portfolio-service:latest
docker push terencered/portfolio-service:latest
```

## Endpoints

Open the [Swagger API documentation](http://localhost:3000/api/portfolio/openapi) and start requesting the API using the endpoints !
