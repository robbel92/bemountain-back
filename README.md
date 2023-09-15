[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=robbel92_bemountain-back&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=robbel92_bemountain-back)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=robbel92_bemountain-back&metric=coverage)](https://sonarcloud.io/summary/new_code?id=robbel92_bemountain-back)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=robbel92_bemountain-back&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=robbel92_bemountain-back)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=robbel92_bemountain-back&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=robbel92_bemountain-back)

# Project Name

**Bemount API**

## Configuration

- Clone the repository.
- Run `npm i` to install the dependencies.

## Scripts

- Use `npm run build` to compile the application.
- Use `npm run start` to start the compiled application.

## Endpoints

### Health Check

- **Endpoint**: `/`
- **Method**: GET
- **Description**: This endpoint is used to check the status of the API.
- **Response**: Returns the message "ping OK."

### User Login

- **Endpoint**: `/user/login`
- **Method**: POST
- **Description**: This endpoint is used to log in as a user.
- **Response**: Returns the token belonging to the user who has logged in.

### Get Routes

- **Endpoint**: `/routes`
- **Method**: GET
- **Description**: This endpoint is used to obtain a collection of routes.
- **Requirements**: A valid token must be provided in the request.
- **Response**: Returns the collection of routes.

#### Add a New Route

- **Endpoint**: `/routes/addRoute`
- **Method**: POST
- **Description**: This endpoint is used to add a new route.
- **Requirements**: A valid token must be provided in the request.
- **Response**: Returns the details of the newly created route.

#### Modify an Existing Route

- **Endpoint**: `/routes/modifyRoute`
- **Method**: PUT
- **Description**: This endpoint is used to modify an existing route.
- **Requirements**: A valid token must be provided in the request.
- **Response**: Returns the details of the modified route.

#### Get Details of a Specific Route

- **Endpoint**: `/routes/:routeId`
- **Method**: GET
- **Description**: This endpoint is used to obtain details of a specific route.
- **Requirements**: A valid token must be provided in the request.
- **Response**: Returns the details of the route specified by `routeId`.

#### Delete a Route

- **Endpoint**: `/routes/:routeId`
- **Method**: DELETE
- **Description**: This endpoint is used to delete a route.
- **Requirements**: A valid token must be provided in the request.
- **Response**: Returns a message indicating that the route has been deleted.

Make sure to have the dependencies installed and the application compiled before using these endpoints.
