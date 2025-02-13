#!/bin/sh

# Run TypeORM migrations
echo "Running TypeORM migrations..."
npx typeorm migration:run -d dist/database/data-source.js

# TypeORM command references
# To revert last migration: npx typeorm migration:revert -d dist/database/data-source.js
# To show migrations: npx typeorm migration:show -d dist/database/data-source.js

# Start the application
echo "Starting the application..."
node dist/main.js
