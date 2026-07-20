#!/usr/bin/env bash

NETWORK_NAME="nest-network"
POSTGRES_CONTAINER="postgres-db"
PGADMIN_CONTAINER="pgadmin"

# Create custom Docker network if it does not exist
if ! docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
    docker network create "$NETWORK_NAME"
fi

# Start PostgreSQL container if it exists
if docker container inspect "$POSTGRES_CONTAINER" >/dev/null 2>&1; then
    docker start "$POSTGRES_CONTAINER" >/dev/null

    # Connect container to network if not already connected
    docker network connect \
        "$NETWORK_NAME" \
        "$POSTGRES_CONTAINER" \
        >/dev/null 2>&1 || true
else
    docker run -d \
        --name "$POSTGRES_CONTAINER" \
        --network "$NETWORK_NAME" \
        -e POSTGRES_USER=postgres \
        -e POSTGRES_PASSWORD=postgres123 \
        -e POSTGRES_DB=nest_demo \
        -p 5432:5432 \
        postgres:17
fi

# Start pgAdmin container if it exists
if docker container inspect "$PGADMIN_CONTAINER" >/dev/null 2>&1; then
    docker start "$PGADMIN_CONTAINER" >/dev/null

    # Connect container to network if not already connected
    docker network connect \
        "$NETWORK_NAME" \
        "$PGADMIN_CONTAINER" \
        >/dev/null 2>&1 || true
else
    docker run -d \
        --name "$PGADMIN_CONTAINER" \
        --network "$NETWORK_NAME" \
        -e PGADMIN_DEFAULT_EMAIL=admin@example.com \
        -e PGADMIN_DEFAULT_PASSWORD=admin123 \
        -p 5050:80 \
        dpage/pgadmin4
fi

echo "Docker PostgreSQL and pgAdmin are running."
echo "PostgreSQL host from Ubuntu: localhost"
echo "PostgreSQL host from Docker containers: postgres-db"
echo "PostgreSQL port: 5432"
echo "pgAdmin URL: http://localhost:5050"