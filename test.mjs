import { login, register, authenticate, users } from './auth.mjs';

// Register a new user
try {
    //calls register function from auth.mjs, see auth.mjs
    register('testuser', 'password123');
    console.log('User registered successfully');
} catch (error) {
    // if user already exists
    console.error(error.message);
}

// Login the user
try {
    // calls login function from auth.mjs which returns the token generated, see auth.mjs
    const token = login('testuser', 'password123');
    console.log('User logged in successfully, token: ', token);
    //authenticate a proctecrted route
    try {
        const user = authenticate(token)
        console.log('User authenticated: ', user.username);
    } catch (error) {
        console.error(error.message)
    }
} catch (error) {
    // if user doesn't exist or wrong password
    console.error(error.message);
}


