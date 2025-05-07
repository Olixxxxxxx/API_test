import { EndPoints } from "./endPoints.js"
import { RandomHelper } from "./randomHelper.js";
export class UserAPI {

    static getUserData() {
        return {
            username: RandomHelper.generateRandomString(),
            password: "Olixxx77!",
            email: RandomHelper.generateUserEmail(),
            firstName: 'Olha',
            lastName: "Beregowa",
            middleName: "Igorevna"
        }
    }

    static registerNewUser(user, failOnStatusCode) {
        return cy.request({
            method: 'POST',
            url: `${Cypress.env('testURL')}${EndPoints.REGISTRATION_END_POINT}`,
            body: {
                "username": user.username,
                "password": user.password,
                "email": user.email,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "middleName": user.middleName
            },
            failOnStatusCode: failOnStatusCode
        })
    }

    static logInUser(username, userPassword, failOnStatusCode) {
        return cy.request({
            method: 'POST',
            url: `${Cypress.env('testURL')}${EndPoints.LOGIN_END_POINT}`,
            body: {
                "username": username,
                "password": userPassword
            },
            failOnStatusCode: failOnStatusCode
        })
    }
    
    static registerNewUserAndLogIn(user, failOnStatusCode) {
        return this.registerNewUser(user, failOnStatusCode).then((registrationResponse) => {
            return this.logInUser(
                registrationResponse.body.username,
                user.password,
                true
            ).then((loginResponse) => {
                return {
                    registrationResponse,
                    loginResponse
                }
            })
        })
    }


    static getUserByID(userID, sessionToken, failOnStatusCode) {
        return cy.request({
            method: 'GET',
            url: `${Cypress.env('testURL')}${EndPoints.GET_USER_ENDPOINT}${userID}`,
            headers: {
                "Authorization": sessionToken
            },
            failOnStatusCode: failOnStatusCode
        })
    }

    static checkApiHealth() {
        cy.request('GET', 'http://44.204.239.34:5000/health').then((response) => {
            expect(response.status).eq(200)
            expect(response.body.status).eq('healthy')
        })
    }
}
exports.UserAPI = UserAPI