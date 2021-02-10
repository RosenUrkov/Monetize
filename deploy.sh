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