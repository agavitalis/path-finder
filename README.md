# <p align="center">PATH-FINDER RESTAURANT SERVICE API</p>

##### Question One [view](question-one.md)

## Description
This project was built using [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Dependencies & Services
- Nestjs - https://github.com/nestjs/nest
- MongoDB - https://www.mongodb.com/

## Get started Notes:
- Create a copy of `.env` by from `.env.test` file.
- Update `.env` file with the necessary credentials to match your system settings
- Application Endpoint: `http://localhost:6060`
- Application Documentations: `http://localhost:6060/docs`
- API Documentation Credentials: 
  - username: `path`
  - password: `finder`

## Installation
You can run the app in 3 ways: 
1. Without Docker
2. Using Docker as an image
3. Using Docker Compose (Recommeded)

### Running the app (Without Docker)

Install the application dependencies by running this command:
```bash
$ npm install

```

After installing the dependencies as listed on the  `package.json` file, start the applications using:
```bash
$ npm run start:dev
```

### Running the app (Using Docker as an image)
* When using this approach, ensure all your env configurations are mapped using IPs

Build the application docker image using the command:
```bash
docker build -t [name:tag] .
```
Example:
```bash
docker build -t agavitalis/path-finder:latest .
```

Run the generated docker image in a container using the command:
```bash
docker run -d -p [host_port]:[container_port] --name [container_name] [image_id/image_tag]
```
Example:
```bash
docker run -d -p 6060:6060 --name path-finder agavitalis/path-finder:latest
```

View application docker logs using:
```bash
docker logs path-finder
```

Verify that your docker container is running using the command:
```bash
docker container ps
```

To delete a docker container use the command:
```bash
docker stop <container_id>
```

To delete a docker container use the command:
```bash
docker rm <container_id>
```

### Running the app (Using Docker Compose -- Recommended)

Build the application docker image using the command:
```bash
docker compose build
```
Run the app using:
```bash
docker compose up 
```
You can also run in detached mood using:
```bash
docker compose up -d
```
To quit and delete use the command:
```bash
docker compose down
```
The access the app while running via docker use the URL: http://0.0.0.0:6060

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

```

## Architecture Overview

#### Entity-Driven Design:

- **Restaurants:** Key business concepts like restaurants are modeled as entities. Each entity encapsulates both data and behavior relevant to its domain.


#### Repository Pattern:

- **RestaurantsRepository:** Repositories abstract the data access layer, providing a way to retrieve and store aggregates. Each entity type has its corresponding repository, facilitating seamless data access.

#### Service Layer:

- **RestaurantsService:** A service layer is introduced to encapsulate business logic that extends beyond the domain of a specific entity. 


### Challenges and Considerations:

1. **Consistency in Aggregates:**
    - Ensuring consistency within aggregates is crucial, especially when dealing with multiple entities. Maintaining the integrity of related entities within the same aggregate and managing consistency across aggregates is a primary concern.

2. **Transaction Management:**
    - Careful handling of transactions is necessary, especially when dealing with multiple aggregates. Ensuring that operations are atomic and that the system remains in a consistent state is a key consideration.

3. **Complexity of Domain Logic:**
    - As more business logic is encapsulated within the domain layer, managing the complexity of domain logic, especially when dealing with intricate rules, relationships, and user interactions, can be challenging.

4. **Query Performance:**
    - Balancing a rich domain model with efficient querying is essential. Denormalization or other strategies might be employed for complex query scenarios involving user posts, comments, likes, and follow relationships.

5. **Evolution of the Domain Model:**
    - Evolving the domain model as business requirements change, especially with the introduction of new features like follows/unfollows, is a challenge. DDD encourages an iterative approach, but managing changes while ensuring backward compatibility is crucial.

In summary, the application architecture combines DDD principles with MongoDB as its database system since our data involves some geographical data.  Addressing challenges related to consistency, transactions, complexity, and evolution is vital for building a robust and adaptable system.


## Stay in touch

Author - [Ogbonna Vitalis](agavitalisogbonna@gmail.com)

## License

[MIT licensed](LICENSE).
