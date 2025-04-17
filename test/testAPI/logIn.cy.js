import { UserAPI } from "./user"
describe('User LogIn API', () => {
    
    before(() => {
        UserAPI.checkApiHealth()
    })

    it('LogIn User with Valid Data', () => {
        const newUser = UserAPI.getUserData()
        UserAPI.registerNewUser(
            newUser,true).then((response) => {
            UserAPI.logInUser(
                response.body.username,
                newUser.password,
                true
            ).then((response) => {
                expect(response.status).eq(200)
                expect(response.body.message).eq('Login successful')
                expect(response.body['access-token']).to.exist
            })
        })
    })

    it('LogIn User with Invalid Username', () => {
        const newUser = UserAPI.getUserData()
        const invalidUserName = 'xxx7'
        UserAPI.registerNewUser(
            newUser,true).then((response) => {
            UserAPI.logInUser(
                invalidUserName,
                newUser.password,
                false
            ).then((response) => {
                expect(response.status).eq(401)
                expect(response.body.error).eq('User does not exist')
            })
        })
    })
    
    it('LogIn User with Invalid Password', () => {
        const newUser = UserAPI.getUserData()
        const invalidPassword = 'xxxx'
        UserAPI.registerNewUser(
            newUser,true).then((response) => {
            UserAPI.logInUser(
                response.body.username,
                invalidPassword,
                false
            ).then((response) => {
                expect(response.status).eq(401)
                expect(response.body.error).eq('Invalid password')
            })
        })
    })
})