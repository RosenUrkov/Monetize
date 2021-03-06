# Monetize - Balance Service

## Description

The Balance service for the **Monetize** application.

- **Main technologies used**: _Nest, Typescript, MySql_
- **Overview**: The _Balance_ service holds the logic about the user's input payments. All of the logic can be found in the _AppService_. One payment must have a _value, paymentType (Expense or Income), category (specific to the paymentType), account (Cash, Bank or CreditCard) and a date_. The service is REST-ful, supports all CRUD operations over the payments and when an operation is done it updates the _Statistics_ service.

## Starting the project

- **Start without containers**: The service is dependent on environment variables (_.env_ file) and the database connection is dependent on _typeorm_ and an _ormconfig.json_ file (for the migrations and seeding). All of the configurations can be found inside the global _ConfigurationModule_.

  - Start a local MySql server with a database `monetize-balance`
  - Create a `ormconfig.json` file. Example:

  ```
  {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "root",
    "database": "monetize-balance",
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
  TYPEORM_CONNECTION=mysql
  TYPEORM_HOST=localhost
  TYPEORM_PORT=3306
  TYPEORM_USERNAME=root
  TYPEORM_PASSWORD=root
  TYPEORM_DATABASE=monetize-balance
  TYPEORM_ENTITIES=src/entities/*.entity.ts
  TYPEORM_MIGRATIONS=src/config/database/migrations/*.ts
  TYPEORM_MIGRATIONS_DIR=src/config/database/migrations
  BALANCE_SERVICE_HOST=localhost
  BALANCE_SERVICE_PORT=4001
  STATISTICS_SERVICE_HOST=localhost
  STATISTICS_SERVICE_PORT=4003
  ```

  - `npm install`
  - `npm start` or `npm run start:dev`
