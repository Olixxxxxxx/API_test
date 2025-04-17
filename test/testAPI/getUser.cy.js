import { UserAPI } from "./userAPI"
describe('Get User', () => {
    
    before(() => {
        UserAPI.checkApiHealth()
    })

    it('Get Existed User By Valid ID and Valid Token', () => {
        const newUser = UserAPI.getUserData()
        UserAPI.registerNewUserAndLogIn(
            newUser,
            true
        ).then(({ registrationResponse, loginResponse }) => {
            return UserAPI.getUserByID(
                registrationResponse.body.id,
                loginResponse.body['access-token'],
                true
            ).then((getResponse) => {
                return { getResponse, registrationResponse }
            })
        }).then(({ getResponse, registrationResponse }) => {
            expect(getResponse.body.id).eq(registrationResponse.body.id)
        })
    })

    it('Get Existed User By Invalid ID and Valid Token', () => {
        const newUser = UserAPI.getUserData()
        const invalidID = "000000"
        UserAPI.registerNewUserAndLogIn(
            newUser,
            true
        ).then((response) => {
            return UserAPI.getUserByID(
                invalidID,
                response.loginResponse.body['access-token'],
                false
            ).then((getResponse) => {
                expect(getResponse.status).eq(404)
                expect(getResponse.body.error).eq(('Invalid ID'))
            })
        })
    })

    it('Get Existed User By Valid ID and Invalid Token', () => {
        const newUser = UserAPI.getUserData()
        const invalidToken = "000000"
        UserAPI.registerNewUserAndLogIn(
            newUser,
            true
        ).then((response) => {
            return UserAPI.getUserByID(
                response.registrationResponse.body.id,
                invalidToken,
                false
            ).then((getResponse) => {
                expect(getResponse.status).eq(404)
                expect(getResponse.body.error).eq(('Invalid token'))
            })
        })
    })
})
