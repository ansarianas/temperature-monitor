# REST + Websocket + n8n Communication

Standalone service that interacts with mongodb and n8n workflow.

## How to get started:

### Pre-requisite

- n8n setup using docker

```
docker run -it --rm --name n8n -p 5678:5678 docker.n8n.io/n8nio/n8n
```

- Setting up workflow in n8n - Post setup of n8n open http://localhost:5678/ and create a new workflow. Import the file present in the repo folder n8n/workflows

## Starting the servers

```
npm i 
npm run socket
```
This will start the websocket locally

```
npm run rest
```
This will start the express app locally

Note: Mongo is hosted on cloud so no need to do additional setup for running mongo
