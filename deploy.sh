docker build -t rosenurkov/monetize-web-client:latest -t rosenurkov/monetize-web-client:$SHA -f web-client/Dockerfile ./web-client
docker build -t rosenurkov/monetize-api-gateway:latest -t rosenurkov/monetize-api-gateway:$SHA -f api-gateway/Dockerfile ./api-gateway
docker build -t rosenurkov/monetize-balance-service:latest -t rosenurkov/monetize-balance-service:$SHA -f balance-service/Dockerfile ./balance-service
docker build -t rosenurkov/monetize-budget-service:latest -t rosenurkov/monetize-budget-service:$SHA -f budget-service/Dockerfile ./budget-service
docker build -t rosenurkov/monetize-statistics-service:latest -t rosenurkov/monetize-statistics-service:$SHA -f statistics-service/Dockerfile ./statistics-service

docker push rosenurkov/monetize-web-client:latest
docker push rosenurkov/monetize-api-gateway:latest
docker push rosenurkov/monetize-balance-service:latest
docker push rosenurkov/monetize-budget-service:latest
docker push rosenurkov/monetize-statistics-service:latest

docker push rosenurkov/monetize-web-client:$SHA
docker push rosenurkov/monetize-api-gateway:$SHA
docker push rosenurkov/monetize-balance-service:$SHA
docker push rosenurkov/monetize-budget-service:$SHA
docker push rosenurkov/monetize-statistics-service:$SHA

kubectl apply -f ./k8s/

kubecl set image deployments/web-client-deployment web-client=rosenurkov/monetize-web-client:$SHA
kubecl set image deployments/api-gateway-deployment api-gateway=rosenurkov/monetize-api-gateway:$SHA
kubecl set image deployments/balance-service-deployment balance-service=rosenurkov/monetize-balance-service:$SHA
kubecl set image deployments/budget-service-deployment budget-service=rosenurkov/monetize-budget-service:$SHA
kubecl set image deployments/statistics-service-deployment statistics-service=rosenurkov/monetize-statistics-service:$SHA
