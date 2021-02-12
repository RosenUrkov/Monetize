# Monetize - API Gateway

## Description

The API Gateway service for the **Monetize** application.

- **Main technologies used**: _Nest, Typescript, MySql, JWT_
- **Overview**: The gateway service is the single point of entrance for the application. It does the authentication logic which is stored in the _AuthModule_ using _JWT tokens_ and stores the user information in _MySql_ DB instance. The application has 3 controllers associated with the 3 microservices - _Balance, Budget and Statistics_ which wrap their public API. The only exception is on login when the gateway pings the _Balance and Budget_ services to send data to the _Statistics_ service so it is initialized with the current user's data.

## Starting the project

- **Start without containers**: The service is dependent on environment variables (_.env_ file) and the database connection is dependent on _typeorm_ and an _ormconfig.json_ file (for the migrations and seeding). All of the configurations can be found inside the global _ConfigurationModule_.

  - Start a local MySql server with a database `monetize-auth`
  - Create a `ormconfig.json` file. Example:

  ```
  {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "root",
    "database": "monetize-auth",
    "entities": ["src/**/*.entity{.ts,.js}"],
    "migrations": ["./src/config/database/migrations/*.ts"],
    "cli": {
      "migrationsDir": "./src/config/database/migrations"
    },
    "synchronize": false
  }
  ```

  - Run the migrations: `npm run typerorm -- migration:run`
  - Seed the database: `npm run seed`
  - Create a `.env` file

  ```
  PORT=4000
  TYPEORM_CONNECTION=mysql
  TYPEORM_HOST=localhost
  TYPEORM_PORT=3306
  TYPEORM_USERNAME=root
  TYPEORM_PASSWORD=root
  TYPEORM_DATABASE=monetize-auth
  TYPEORM_ENTITIES=src/entities/*.entity.ts
  TYPEORM_MIGRATIONS=src/config/database/migrations/*.ts
  TYPEORM_MIGRATIONS_DIR=src/configdatabase/migrations
  JWT_SECRET=s3cr3t
  JWT_EXPIRE_TIME=3600
  BALANCE_SERVICE_HOST=localhost
  BALANCE_SERVICE_PORT=4001
  BUDGET_SERVICE_HOST=localhost
  BUDGET_SERVICE_PORT=4002
  STATISTICS_SERVICE_HOST=localhost
  STATISTICS_SERVICE_PORT=4003
  ```

  - `npm install`
  - `npm start` or `npm run start:dev`
