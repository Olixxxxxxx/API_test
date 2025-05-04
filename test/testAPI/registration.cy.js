import { UserAPI } from "./userAPI"
describe('User Registration API', () => {
    
    before(() => {
        UserAPI.checkApiHealth()
    })

    it('Register User with Valid Data', () => {
        UserAPI.registerNewUser(
            UserAPI.getUserData(),
            true
        ).then((response) => {
            expect(response.status).eq(200)
        })
    })

    it('Register User with Existed Email', () => {
        const testEmail = UserAPI.generateUserEmail()
        const user1 = {
            ...UserAPI.getUserData(),
            email: testEmail
        }
        const user2 = {
            ...UserAPI.getUserData(),
            email: testEmail
        }
        UserAPI.registerNewUser(user1, true).then(() => {
            UserAPI.registerNewUser(user2, false).then((response) => {
                expect(response.status).eq(400)
                expect(response.body.error).eq('Email already exists')
            })
        })
    })

    it('Register User without Email', () => {
        const testEmail = ""
        const user = {
            ...UserAPI.getUserData(),
            email: testEmail
        }
        UserAPI.registerNewUser(user, false).then((response) => {
            expect(response.status).eq(400)
            expect(response.body.error).eq('Invalid email format')
        })
    })

    it('Register User with invalid Email', () => {
        const testEmail = "xxxx.678"
        const user = {
            ...UserAPI.getUserData(),
            email: testEmail
        }
        UserAPI.registerNewUser(user, false).then((response) => {
            expect(response.status).eq(400)
            expect(response.body.error).eq('Invalid email format')
        })
    })

    it('User Registration with Existed Username', () => {
        const testUserName = UserAPI.generateUserName()
        const user1 = {
            ...UserAPI.getUserData(),
            username: testUserName
        }
        const user2 = {
            ...UserAPI.getUserData(),
            username: testUserName
        }
        UserAPI.registerNewUser(user1, true).then(() => {
            UserAPI.registerNewUser(user2, false).then((response) => {
                expect(response.status).eq(400)
                expect(response.body.error).eq('Username already exists')
            })
        })
    })

    it('User registration with a username shorter than 5 characters ', () => {
        const testUserName = "Jon"
        const user = {
            ...UserAPI.getUserData(),
            username: testUserName
        }
        UserAPI.registerNewUser(user, false).then((response) => {
            expect(response.status).eq(400)
            expect(response.body.error).eq('Username must be between 5 and 8 characters')
        })
    })

    it('User registration with a username longer than 8 characters ', () => {
        const testUserName = "Joni77777777"
        const user = {
            ...UserAPI.getUserData(),
            username: testUserName
        }
        UserAPI.registerNewUser(user, false).then((response) => {
            expect(response.status).eq(400)
            expect(response.body.error).eq('Username must be between 5 and 8 characters')
        })
    })

    it('User registration with password shorter than 6 characters', () => {
        const testPassword = "Xxx5!"
        const user = {
            ...UserAPI.getUserData(),
            password: testPassword
        }
        UserAPI.registerNewUser(user, false).then((response) => {
            expect(response.status).eq(400)
            expect(response.body.error).eq('Password must be at least 6 characters long')
        })
    })

    it('User registration with password without spec symbols', () => {
        const testPassword = "Xxx555"
        const user = {
            ...UserAPI.getUserData(),
            password: testPassword
        }
        UserAPI.registerNewUser(user, false).then((response) => {
            expect(response.status).eq(400)
            expect(response.body.error).eq('Password must contain at least one special character')
        })
    })

    it('User registration with password without a uppercase letter', () => {
        const testPassword = "xxx555!"
        const user = {
            ...UserAPI.getUserData(),
            password: testPassword
        }
        UserAPI.registerNewUser(user, false).then((response) => {
            expect(response.status).eq(400)
            expect(response.body.error).eq('Password must contain at least one uppercase letter')
        })
    })

    it('User registration with password without number', () => {
        const testPassword = "Xxxxxxx!"
        const user = {
            ...UserAPI.getUserData(),
            password: testPassword
        }
        UserAPI.registerNewUser(user, false).then((response) => {
            expect(response.status).eq(400)
            expect(response.body.error).eq('Password must contain at least one number')
        })
    })
})
