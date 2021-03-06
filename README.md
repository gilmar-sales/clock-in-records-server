<p align="center">
  <a href="https://github.com/gilmarxd/clock-in-records-server" target="blank"><img src="resources/logo.svg" width="320" alt="Nest Logo" /></a>
</p>

  <p align="center">The server-side of a system for management of the clock in records of the collaborators of a company</p>
    <p align="center">
<a href="#" target="_blank"><img src="https://img.shields.io/github/package-json/v/gilmarxd/clock-in-records-server" alt="Project Version" /></a>
<a href="#" target="_blank"><img src="https://img.shields.io/github/license/gilmarxd/clock-in-records-server" alt="Package License" /></a>
<a href="#" target="_blank"><img src="https://img.shields.io/github/repo-size/gilmarxd/clock-in-records-server" alt="Repo Size" /></a>
<a href="#" target="_blank"><img src="https://img.shields.io/github/last-commit/gilmarxd/clock-in-records-server" alt="Last Commmit"/></a>
</p>

## Intent

Instigate the candidate to solve a challenge in a while determined, in order to identify categories and technical weaknesses for better internal targeting and onboarding according to the practices and technologies used in the Brainny Smart Solutions.

## Project

The development proposal consists of the implementation of a system for the management of clock-in records of the employees of a company.

### Abstract

### Functional Requirements

- **[FR01]** - Manage time records
- **[FR02]** - Record the collaborator's arrival and departure times
- **[FR03]** - The user with administrator permissions will be able to view in real time the records of collaborators, without need to refresh the page

### Non-functional Requirements

- **[NFR01]** - Only collaborators can record the point
- **[NFR02]** - Only the administrator can view the list with collaborators's records;
- **[NFR03]** - The system will use authentication with JWT
- **[NFR04]** - Node API development;
- **[NFR05]** - Web Client development in React.

# Technologies

- [Nest](https://github.com/nestjs/nest): A progressive Node.js framework for building efficient, scalable, and enterprise-grade server-side applications.
- [TypeORM](https://github.com/typeorm/typeorm): ORM for TypeScript and JavaScript.
- [GraphQL](https://github.com/graphql/graphql-js): GraphQL is a query language and execution engine tied to any backend service.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Informations

- Author - [Gilmar Custodio](https://github.com/gilmarxd)
- This project is [MIT licensed](LICENSE).
