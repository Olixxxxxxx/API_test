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
    // it('Register User without Email', () => {
    //     UserAPI.userData.email = ""
    //     UserAPI.registerNewUser(
    //         UserAPI.userData,
    //         false
    //     ).then((response) => {
    //         expect(response.status).eq(400)
    //         expect(response.body.error).eq('Invalid email format')
    //     })
    // })
    // it('Register User with wrong Email', () => {
    //     UserAPI.userData.email = "xxx.gmail.com"
    //     UserAPI.registerNewUser(
    //         UserAPI.userData,
    //         false
    //     ).then((response) => {
    //         expect(response.status).eq(400)
    //         expect(response.body.error).eq('Invalid email format')
    //     })
    // })
    // it('User Registration with Existed Username', () => {
    //     UserAPI.userData.email = UserAPI.generateUserEmail()
    //     UserAPI.userData.name = UserAPI.generateUserEmail()
    //     UserAPI.registerNewUser(
    //         UserAPI.userData,
    //         false
    //     ).then(() => {
    //         UserAPI.userData.email = UserAPI.generateUserEmail()
    //         UserAPI.registerNewUser(
    //             UserAPI.userData,
    //             false
    //         ).then((response) => {
    //                 expect(response.status).eq(400)
    //                 expect(response.body.error).eq('Username already exists')
    //             })
    //     })
    // })
    // it('User registration with a username shorter than 5 characters ', () => {
    //     User.registerNewUser(
    //         "Olha",
    //         User.userData.password,
    //         User.generateUserEmail(),
    //         User.userData.firstname,
    //         User.userData.lastname,
    //         User.userData.middleName,
    //         false
    //     ).then((response) => {
    //         expect(response.status).eq(400)
    //         expect(response.body.error).eq('Username must be between 5 and 8 characters')
    //     })
    // })
    // it('User registration with a username longer than 8 characters ', () => {
    //     User.registerNewUser(
    //         "Olha333333",
    //         User.userData.password,
    //         User.generateUserEmail(),
    //         User.userData.firstname,
    //         User.userData.lastname,
    //         User.userData.middleName,
    //         false
    //     ).then((response) => {
    //         expect(response.status).eq(400)
    //         expect(response.body.error).eq('Username must be between 5 and 8 characters')
    //     })
    // })
    // it('User registration with password shorter than 6 characters ', () => {
    //     User.registerNewUser(
    //         User.userData.username,
    //         "Oli7!",
    //         User.generateUserEmail(),
    //         User.userData.firstname,
    //         User.userData.lastname,
    //         User.userData.middleName,
    //         false
    //     ).then((response) => {
    //         expect(response.status).eq(400)
    //         expect(response.body.error).eq('Password must be at least 6 characters long')
    //     })
    // })

    // it('User registration with password without spec symbols ', () => {
    //     User.registerNewUser(
    //         User.userData.username,
    //         "Oli789",
    //         User.generateUserEmail(),
    //         User.userData.firstname,
    //         User.userData.lastname,
    //         User.userData.middleName,
    //         false
    //     ).then((response) => {
    //         expect(response.status).eq(400)
    //         expect(response.body.error).eq('Password must contain at least one special character')
    //     })
    // })

    // it('User registration with password without a uppercase letter ', () => {
    //     User.registerNewUser(
    //         User.userData.username,
    //         "oli789!",
    //         User.generateUserEmail(),
    //         User.userData.firstname,
    //         User.userData.lastname,
    //         User.userData.middleName,
    //         false
    //     ).then((response) => {
    //         expect(response.status).eq(400)
    //         expect(response.body.error).eq('Password must contain at least one uppercase letter')
    //     })
    // })

    // it('User registration with password without number ', () => {
    //     User.registerNewUser(
    //         User.userData.username,
    //         "Olixxx!",
    //         User.generateUserEmail(),
    //         User.userData.firstname,
    //         User.userData.lastname,
    //         User.userData.middleName,
    //         false
    //     ).then((response) => {
    //         expect(response.status).eq(400)
    //         expect(response.body.error).eq('Password must contain at least one number')
    //     })
    // })
})
