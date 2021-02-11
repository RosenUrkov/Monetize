# Monetize - API Gateway

## Description

The API Gateway service for the **Monetize** application.

- **Main technologies used**: _Nest, Typescript, MySql, JWT_
- **Overview**: The gateway service is the single point of entrance for the application. It does the authentication logic which is stored in the _AuthModule_ using _JWT tokens_ and stores the user information in _MySql_ DB instance. The application has 3 controllers associated with the 3 microservices - _Balance, Budget and Statistics_ which wrap their public API. The only exception is on login when the gateway pings the _Balance and Budget_ services to send data to the _Statistics_ service so it is initialized with the current user's data.

## Starting the project

- **Start without containers**: The service is dependent on environment variables (_.env_ file) and the database connection is dependent on _typeorm_ and an _ormconfig.json_ file (for the migrations and seeding). All of the configurations can be found inside the global _ConfigurationModule_.

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
  - Create a `.env` file. Example:

  ```
  PORT=4000
  DB_TYPE=mysql
  DB_HOST=localhost
  DB_PORT=3306
  DB_USERNAME=root
  DB_PASSWORD=root
  DB_DATABASE_NAME=monetize-auth
  JWT_SECRET=h3ll0
  JWT_EXPIRE_TIME=3600
  ```

  - `npm install`
  - `npm start` or `npm run start:dev`
