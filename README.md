# Task Service

## Description

Simple RESTful API built with Nest.js that allows users to create and manage tasks. The API supports pagination, sorting, and filtering of tasks.

## Application structure

The structure of the application is a composition of NestJS elements.

```txt
├── config                          Application configuration.
├── local                           Contains files used for local development.
├── src                             All source codes.
│   ├── modules                     Application NestJS modules.
│   ├── app.module.ts               Main NestJS module.
│   └── main.ts                     Application entry point for bootstrapping. Bootstrap documentation,
│                                   pipes, configuration and server.
└── test                            E2E tests.
```

## Configuration

## Running the app locally

### Installation

```bash
$ npm install
```

Create `.env` file from `./local/.env.example` and move it to the root.
This file contains example environment variables for your application.

```bash
cp ./local/.env.example .env
```

### Run MySQL database:

```bash
npm run init-local-db
```

### Start the application:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app locally with Docker

```bash
docker-compose up
```

The application is running on `http://localhost:3000`.

# Swagger

The application's Swagger API documentation is available at `http://localhost:3000/docs#/`.
By reviewing the Swagger documentation, you can get a clear understanding of the available API endpoints, their request and response formats, and how to interact with the API.

## Running end-to-end tests:

```bash
$ npm run test:e2e
```

## Unit tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
