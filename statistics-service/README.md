# Monetize - Statistics Service

## Description

The Statistics service for the **Monetize** application.

- **Main technologies used**: _Nest, Typescript_
- **Overview**: The _Statistics_ service's job is to accumulate all of the payments over a given period and compare them with the budget for that same period so it can send valuable information to the user. It receives data from the _Balance and Budget_ services upon login and on every change so it has the most updated payments and budgets.

## Starting the project

- **Start without containers**: The service is dependent on environment variables (_.env_ file). All of the configurations can be found inside the global _ConfigurationModule_. This service relies upon the _Balance and Budget_ services.

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
