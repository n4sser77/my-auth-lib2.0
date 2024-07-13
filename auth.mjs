import crypto from 'crypto';
import fs from 'fs';

/**
 * Users store array
 *  import or write function to fetch and connect to database
 */
export let users = [];

if (fs.existsSync('data.json')) {
    users = JSON.parse(fs.readFileSync('data.json'));
} else {
    // Create a new empty file 'data.json'
    fs.writeFileSync('data.json', JSON.stringify(users));
}

/**
 * Helper function to store userdata to the data file.
 * @param {*} users 
 */
export function saveUsers(users) {
    fs.writeFileSync('data.json', JSON.stringify(users, null, 2));
};

/**
 * Creates new user, hashes password and stores credentials.
 * @param {*} username 
 * @param {*} password 
 */
export function register(username, password) {
    //check is the user already exists
    if (users.find(user => user.username === username)) {
        throw new Error('User already exists');
    }
    //hash password
    const hash = crypto.createHash('sha256').update(password).digest('hex');

    //add user to users array
    users.push({ username, password: hash });
    saveUsers(users);

}
/**
 *  Checks if user exists and compares credentials.
 * @param {*} username 
 * @param {*} password 
 * @returns Returns generated user-token.
 */
export function login(username, password){
    // hash provided password
    const hash = crypto.createHash('sha256').update(password).digest('hex');

    /**
     * checks if user exists in store
     */
    const user = users.find(user => user.username === username && user.password == hash);
    if (!user) {
        throw new Error('invaild username or password');
    }

    /**
     * Crypto generated token
     */
    const token = crypto.randomBytes(16).toString('hex');
    user.token = token;
    saveUsers(users);

    return token;
}
/**
 * 
 * @param {*} token user-token to be authenticated by function
 * @returns {*} returns user identiy and user details
 */
export function authenticate(token) {
    const user = users.find(user => user.token === token);
    if (!user) {
        throw new Error('Invaild token');
    }
    return user;
}

