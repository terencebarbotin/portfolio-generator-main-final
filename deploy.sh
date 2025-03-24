#!/bin/bash
# File: deploy.sh - Automated deployment script for portfolio-generator

# Print colored output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting deployment process...${NC}"

# Step 1: Start Minikube if not already running
echo -e "${YELLOW}Starting Minikube cluster...${NC}"
if ! minikube status > /dev/null 2>&1; then
    minikube start
else
    echo "Minikube already running"
fi

# Step 2: Install Istio if not already installed
echo -e "${YELLOW}Installing Istio...${NC}"
kubectl get namespace istio-system > /dev/null 2>&1
if [ $? -ne 0 ]; then
    istioctl install --set profile=demo -y
else
    echo "Istio namespace already exists, checking pods..."
    if ! kubectl get pods -n istio-system | grep -q "istio-ingressgateway"; then
        echo "Istio pods not found, reinstalling..."
        istioctl install --set profile=demo -y
    else
        echo "Istio already installed"
    fi
fi

# Step 3: Enable istio injection for default namespace
echo -e "${YELLOW}Enabling Istio injection for default namespace...${NC}"
kubectl label namespace default istio-injection=enabled --overwrite

# Step 4: Apply resources in order
echo -e "${YELLOW}Applying service mesh resources...${NC}"
kubectl apply -f k8s/service-mesh/

echo -e "${YELLOW}Applying config resources...${NC}"
kubectl apply -f k8s/config/

echo -e "${YELLOW}Applying database resources...${NC}"
kubectl apply -f k8s/database/

# Step 5: Wait for database to be ready
echo -e "${YELLOW}Waiting for database to be ready...${NC}"
kubectl wait --for=condition=ready pod -l app=postgres --timeout=300s

# Step 6: Initialize database
echo -e "${YELLOW}Initializing database...${NC}"
POSTGRES_POD=$(kubectl get pod -l app=postgres -o jsonpath="{.items[0].metadata.name}")
echo "Using PostgreSQL pod: $POSTGRES_POD"

kubectl cp database/src/init.sql $POSTGRES_POD:/init.sql
kubectl cp database/src/populate.sql $POSTGRES_POD:/populate.sql
kubectl cp database/src/verify_data.sql $POSTGRES_POD:/verify_data.sql

echo "Executing SQL scripts..."
kubectl exec -it $POSTGRES_POD -- psql -U admin -d portfolio -f /init.sql
kubectl exec -it $POSTGRES_POD -- psql -U admin -d portfolio -f /populate.sql
#kubectl exec -it $POSTGRES_POD -- psql -U admin -d portfolio -f /verify_data.sql

# Step 7: Deploy backends
echo -e "${YELLOW}Deploying backend services...${NC}"
kubectl apply -f k8s/backend-portfolio/
kubectl apply -f k8s/backend-resume/

# Step 8: Wait for backends to be ready
echo -e "${YELLOW}Waiting for backend services to be ready...${NC}"
kubectl wait --for=condition=ready pod -l app=portfolio-backend --timeout=300s
kubectl wait --for=condition=ready pod -l app=resume-backend --timeout=300s

# Step 9: Show resource status
echo -e "${GREEN}Deployment complete! Here are your resources:${NC}"
echo -e "${YELLOW}ConfigMaps:${NC}"
kubectl get configmap

echo -e "${YELLOW}Secrets:${NC}"
kubectl get secret

echo -e "${YELLOW}Gateway and VirtualServices:${NC}"
kubectl get gateway
kubectl get virtualservice

echo -e "${YELLOW}Deployments:${NC}"
kubectl get deployments

echo -e "${YELLOW}Pods:${NC}"
kubectl get pods

echo -e "${YELLOW}Services:${NC}"
kubectl get services

# Step 10: Setup port forwarding in background
echo -e "${GREEN}Setting up port forwarding to access the application...${NC}"
echo "Access your application at http://localhost:31380/api/portfolio/openapi or http://localhost:31380/api/resume/openapi"
# Run port-forwarding in the background and save PID
kubectl -n istio-system port-forward deployment/istio-ingressgateway 31380:8080 > /dev/null 2>&1 &
PORT_FORWARD_PID=$!
echo "Port-forwarding started (PID: $PORT_FORWARD_PID)"
echo "To stop port-forwarding later, run: kill $PORT_FORWARD_PID"

# Step 11: Start frontend in a new terminal (macOS specific)
echo -e "${GREEN}Starting Angular frontend in a new terminal...${NC}"
osascript -e 'tell app "Terminal" to do script "cd '$PWD'/frontend/portfolio-generator && npm install && ng serve"'
echo -e "${GREEN}Frontend will be available at http://localhost:4200${NC}"

# Wait for user to terminate the script
echo -e "${YELLOW}Press Ctrl+C to terminate the deployment and port-forwarding${NC}"
# Keep script running until interrupted
trap "kill $PORT_FORWARD_PID; echo -e '${GREEN}Port-forwarding stopped.${NC}'; exit 0" INT
while true; do sleep 1; done