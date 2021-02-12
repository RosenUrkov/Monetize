# Monetize - Budget Service

## Description

The Budget service for the **Monetize** application.

- **Main technologies used**: _Nest, Typescript, MySql_
- **Overview**: The _Budget_ service holds the logic about the user's budgets. All of the logic can be found in the _AppService_. One budget must have a _type (Day, Month or Annual) and a list of payments: [value, paymentType (Expense or Income), category (specific to the paymentType)]_. The user can create only one of each budget types and each of the payments listed must have a unique category with the predicted accumulated value for that category. The service is REST-ful, supports all CRUD operations over the budgets and when an operation is done it updates the _Statistics_ service.

## Starting the project

- **Start without containers**: The service is dependent on environment variables (_.env_ file) and the database connection is dependent on _typeorm_ and an _ormconfig.json_ file (for the migrations and seeding). All of the configurations can be found inside the global _ConfigurationModule_.

  - Start a local MySql server with a database `monetize-budget`
  - Create a `ormconfig.json` file. Example:

  ```
  {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "root",
    "database": "monetize-budget",
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
  TYPEORM_DATABASE=monetize-budget
  TYPEORM_ENTITIES=src/entities/*.entity.ts
  TYPEORM_MIGRATIONS=src/config/database/migrations/*.ts
  TYPEORM_MIGRATIONS_DIR=src/config/database/migrations
  BUDGET_SERVICE_HOST=localhost
  BUDGET_SERVICE_PORT=4002
  STATISTICS_SERVICE_HOST=localhost
  STATISTICS_SERVICE_PORT=4003
  ```

  - `npm install`
  - `npm start` or `npm run start:dev`
