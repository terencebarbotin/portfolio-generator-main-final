# Backend resume generation micro service

Micro service to manage generation and visualisation of resume in pdf.

## Start with Docker (best option)

This micro service needs the backed-portfolio one to run in order to work. Thus, you must check this micro service before :
```bash
backend-portfolio/README.md
```

Pull the image :
```bash
docker pull terencered/resume-service:1.4
```

Run the image : 
```bash
docker run -p 3001:3001 --env-file .env terencered/resume-service:latest
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

## Build and publish a Docker image - to update

Build by replacing `1.0` with the tag and tag it to `lastest` version :
```bash
docker buildx create --use # multi architecture
docker buildx build --platform linux/amd64,linux/arm64 -t terencered/resume-service:1.0 --push .

docker tag terencered/resume-service:1.0 terencered/resume-service:latest
# docker run -p 3001:3001 --env-file .env terencered/resume-service:latest
docker push terencered/resume-service:latest
```

## Endpoints

Open the [Swagger API documentation](http://localhost:3000/api/resume/openapi) and start requesting the API using the endpoints !
