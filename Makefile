# Variables globales
DOCKER_USER=terencered
BACKEND_IMAGE=$(DOCKER_USER)/portfolio-service:latest

build:
	docker build -t $(BACKEND_IMAGE) ./backend-portfolio

push:
	docker push $(BACKEND_IMAGE)

deploy:
	kubectl apply -f k8s/

clean:
	kubectl delete -f k8s/

logs:
	kubectl logs -l app=backend-portfolio --tail=100 -f
