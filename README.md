# Monetize

[![Build Status](https://travis-ci.com/RosenUrkov/Monetize.svg?branch=main)](https://travis-ci.com/RosenUrkov/Monetize)

## Description

A budgeting application for rising the user's financial awareness.

- **Main technologies used**: _Microservices with Nest and Typescript, client with React and Redux_
- **Overview**: There are three main services - _Balance, Budget and Statistics_. The _Balance_ service contains the logic about manipulating the user's input payments and the _Budget_ service handles the budget actions. Both services emit to the _Statistics_ service on every change so it has the most recent data. The _Statistics_ service's job is to accumulate all of the payments over a given period and compare them with the budget for that period so it can help the user improve their financial habits. The services are hidden behind the _API Gateway_ which holds the authentication logic and its the single point of entrance for the clients.

## Starting the project

In order to start the application you must start all of the services and the client separately. Each project has its own README with instructions that you can follow.
