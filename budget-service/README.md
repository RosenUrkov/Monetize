# Monetize - Budget Service

## Description

The Budget service for the **Monetize** application.

- **Main technologies used**: _Nest, Typescript, MySql_
- **Overview**: The _Budget_ service holds the logic about the user's budgets. All of the logic can be found in the _AppService_. One budget must have a _type (Day, Month or Annual) and a list of payments: [value, paymentType (Expense or Income), category (specific to the paymentType)]_. The user can create only one of each budget types and each of the payments listed must have a unique category with the predicted accumulated value for that category. The service is REST-ful, supports all CRUD operations over the budgets and when an operation is done it updates the _Statistics_ service.

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
  - Create a `.env` file. Example:

  ```
  PORT=4002
  DB_TYPE=mysql
  DB_HOST=localhost
  DB_PORT=3306
  DB_USERNAME=root
  DB_PASSWORD=root
  DB_DATABASE_NAME=monetize-budget
  ```

  - `npm install`
  - `npm start` or `npm run start:dev`
