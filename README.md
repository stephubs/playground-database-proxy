# MongoDB WebSocket Proxy

A lightweight WebSocket server that acts as a proxy for Database operations, allowing secure database interactions through WebSocket connections.

## Features

- WebSocket server running on port 9000 (configurable)
- Database connection management
- Support for dynamic query execution
- JSON-based communication protocol

## Prerequisites

- Node.js 20 or higher
- Docker (optional, for containerized deployment)
- Database (MongoDB) instance accessible from the server

## Installation

### Using Node.js

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
node index.js
```

### Using Docker

1. Build the Docker image:

```bash
docker build -t mongodb-websocket-proxy .
```

2. Run the Docker container:

```bash
docker run -p 9000:9000 mongodb-websocket-proxy
```

or run compiled image from AWS ECR
```bash
docker pull public.ecr.aws/w9y9l0z2/playground/database-proxy:latest
docker run -p 9000:9000 public.ecr.aws/w9y9l0z2/playground/database-proxy:latest
```

you can find more details about how to pull public images from AWS ECR [here](https://docs.aws.amazon.com/AmazonECR/latest/public/docker-pull-ecr-image.html)

## Usage

Open the browser and navigate to `https://playground.bemoxie.ai/generic-search`

go to the tab `Database`
 - Fill in the `Connection String` with the MongoDB connection string
 - Click on `Run`
