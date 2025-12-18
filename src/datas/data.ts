
interface Users {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    isActive: boolean;
}

const usersData: Users[] = [
    {
        id : "user1",
        firstName : 'Name1',
        lastName : 'Name1',
        userName : 'Username 1',
        email : 'user1@gmail.com',
        password : 'user1',
        isActive : true
    }, {
        id : "user2",
        firstName : 'Name2',
        lastName : 'Name2',
        userName : 'Username 2',
        email : 'user2@gmail.com',
        password : 'user2',
        isActive : true
    }, {
        id : "user3",
        firstName : 'Name3',
        lastName : 'Name3',
        userName : 'Username 3',
        email : 'user3@gmail.com',
        password : 'user3',
        isActive : false
    },
];

export default usersData;