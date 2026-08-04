const fs = require('fs/promises');
const filePathToUrl = require('url');
const path = require('path');
const { AppError } = require('../utils/helpers');

async function getUsers() {
    const users = await getUsersFromJSONFile();
    return users
}

async function getUserById(id) {
    const users = await getUsersFromJSONFile();
    const user = users.find(user => user.id === id)
    return user;
}

async function createUser(user) {
    const users = await getUsersFromJSONFile();

    if (await userExists(user.id)) {
        throw new AppError({message: 'conflict. User already exists', statusCode: 409})
    }
    users.push(user);
    await writeToUsersJSONFile(users)
    return true;
}

async function updateUserById(user) {
    let users = await getUsersFromJSONFile();

    if ( !(await userExists(user.id)) ) {
        throw new AppError({message: 'user not foumd', statusCode: 404});
    }
    users = users.map(userData => {
        if (userData.id === user.id) {
            return {
                ...userData,
                ...user

            }
        } else {
            return userData
        }
    });
    await writeToUsersJSONFile(users)
    return true;
}

async function deleteUserById(id) {
    let users = await getUsersFromJSONFile();

    if ( !(await userExists(id)) ) {
        throw new AppError({message: 'user not found', statusCode: 404});
    }

    users = users.filter( user => user.id !== id);
    await writeToUsersJSONFile(users)
    return true
}
const usersJSONFilePath = path.join(__dirname, '../Db/users.json');
async function getUsersFromJSONFile() {
    const users= await fs.readFile(usersJSONFilePath, 'utf-8');
    const parsedUsers = JSON.parse(users)

    return parsedUsers;
}

async function writeToUsersJSONFile(data) {
    await fs.writeFile(usersJSONFilePath, JSON.stringify(data), null, 2)
}
async function userExists(id) {
    const users = await getUsersFromJSONFile();
    return users.find( user => user?.id === id);
}
// Run tests on the model functions
/*
async function test() {
    console.log(await getUsers(),'first call');
    await updateUserById({
        id:2, 
        name: 'david'
    })
    console.log(await getUserById(2), 'second call');
    await deleteUserById(5);
    console.log(await getUsers(), ' last call')
}
test()
*/
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    userExists
}