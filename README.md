

# Auth Library

This library provides basic authentication functionality including user registration, login, and token-based authentication. User data is stored in a local JSON file.

You can adjust it to store user data in database instead.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [Register a User](#register-a-user)
  - [Login a User](#login-a-user)
  - [Authenticate a User](#authenticate-a-user)
- [Functions](#functions)
  - [register](#register)
  - [login](#login)
  - [authenticate](#authenticate)
  - [saveUsers](#saveUsers)
- [Data Persistence](#data-persistence)

## Installation

Ensure you have Node.js installed. You can then use this library by importing it into your project.

```bash
npm install
```

## Usage

### Register a User

To register a new user, call the `register` function with a username and password. This will hash the password and store the user's credentials.

```javascript
import { register } from './path/to/auth-lib';

try {
    register('username', 'password');
    console.log('User registered successfully');
} catch (error) {
    console.error(error.message);
}
```

### Login a User

To log in a user, call the `login` function with a username and password. This will check the user's credentials and return a token if they are valid.

```javascript
import { login } from './path/to/auth-lib';

try {
    const token = login('username', 'password');
    console.log('Login successful, token:', token);
} catch (error) {
    console.error(error.message);
}
```

### Authenticate a User

To authenticate a user, call the `authenticate` function with a token. This will return the user's details if the token is valid.

```javascript
import { authenticate } from './path/to/auth-lib';

try {
    const user = authenticate('token');
    console.log('User authenticated:', user);
} catch (error) {
    console.error(error.message);
}
```

## Functions

### `register`

Registers a new user by hashing the password and storing the user's credentials.

**Parameters:**
- `username` (string): The username of the new user.
- `password` (string): The password of the new user.

**Throws:**
- Error: If the user already exists.

### `login`

Logs in a user by checking the provided credentials and returning a token.

**Parameters:**
- `username` (string): The username of the user.
- `password` (string): The password of the user.

**Returns:**
- `token` (string): The generated token for the user.

**Throws:**
- Error: If the username or password is invalid.

### `authenticate`

Authenticates a user by validating the provided token.

**Parameters:**
- `token` (string): The token to authenticate.

**Returns:**
- `user` (object): The authenticated user's details.

**Throws:**
- Error: If the token is invalid.

### `saveUsers`

Helper function to store user data to the data file.

**Parameters:**
- `users` (array): The array of user objects to save.

## Data Persistence

User data is stored in a JSON file (`data.json`). If the file does not exist, it will be created. The user data is read from this file on startup and written to this file whenever changes are made.

```javascript
import fs from 'fs';

export let users = [];

if (fs.existsSync('data.json')) {
    users = JSON.parse(fs.readFileSync('data.json'));
} else {
    fs.writeFileSync('data.json', JSON.stringify(users));
}

export function saveUsers(users) {
    fs.writeFileSync('data.json', JSON.stringify(users, null, 2));
}
```

This approach ensures that user data persists across application restarts.

## Example

Here's a simple example demonstrating the usage of the library:

```javascript
import { register, login, authenticate } from './path/to/auth-lib';

// Register a new user
try {
    register('username', 'password');
    console.log('User registered successfully');
} catch (error) {
    console.error(error.message);
}

// Log in the user
try {
    const token = login('username', 'password');
    console.log('Login successful, token:', token);
} catch (error) {
    console.error(error.message);
}

// Authenticate the user
try {
    const user = authenticate(token);
    console.log('User authenticated:', user);
} catch (error) {
    console.error(error.message);
}
```

This library provides a simple and effective way to handle user authentication with minimal setup. Ensure to handle the errors properly in a production environment and consider more secure practices for handling passwords and tokens.
```