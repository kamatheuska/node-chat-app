const expect = require('expect')
const { Users } = require('./users')

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users()
    users.users = [
      {
        id: '1',
        name: 'Mike',
        room: 'Node Course'
      },
      {
        id: '2',
        name: 'Jen',
        room: 'React Course'
      },
      {
        id: '3',
        name: 'Julie',
        room: 'Node Course'
      }
    ]
  })

  it('should add new user', function() {
    let users = new Users()
    let user = {
      id: '123',
      name: 'Nico',
      room: 'MusiCart'
    }

    let resUser = users.addUser(user.id, user.name, user.room)

    expect(users.users).toEqual([user])
  })

  it('should return names of Node Course', function() {
    let userList = users.getUserList('Node Course')

    expect(userList).toEqual(['Mike', 'Julie'])
  })

  it('should return names of React Course', function() {
    let userList = users.getUserList('React Course')

    expect(userList).toEqual(['Jen'])
  })

  it('should remove a user', function() {
    let removed = users.removeUser('1')

    expect(removed.id).toBe('1')
    expect(users.users.length).toBe(2)
  })

  it('should not remove a user', function() {
    let removed = users.removeUser('99')

    expect(removed).toNotExist()
    expect(users.users.length).toBe(3)    
  })

  it('should find user', function() {
    let user = users.getUser('2')1

    expect(user.id).toBe('2')
  })

  it('should not find user', function() {
    let user = users.getUser('99')

    expect(user).toNotExist()
  })
})