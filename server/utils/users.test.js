const expect = require('expect');

const {
    Users
} = require('./users');

describe('Users', () => {

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jun',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Sandy',
            room: 'Node Course'
        }]
    })

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 1,
            name: 'wyk',
            age: 18
        }
        var resUser = users.addUser(user.id, user.name, user.age);
        expect(users.users).toEqual([resUser]);
    })

    it('should remove user', () => {
        var userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    })

    it('should not remove user', () => {
        var userId = '4';
        var user = users.removeUser(userId);
        expect(user).toBeUndefined();
    })

    it('should find user', () => {
        var user = users.getUser('2');
        expect(user.name).toBe('Jun')
    })

    it('should not find user', () => {
        var userId = '4';
        var user = users.getUser(userId);
        expect(user).toBeUndefined();
    })

    it('should return names from React Course', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jun']);
    })

    it('should return names from Node Course', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Sandy']);
    })
})