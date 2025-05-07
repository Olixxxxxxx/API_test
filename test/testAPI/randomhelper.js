export class RandomHelper {
    
    static generateRandomString(length = 8) {
        const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let result = ''
        for (let i = 0; i < length; i++) {
            result += symbols.charAt(Math.floor(Math.random() * symbols.length))
        }
        return result
    }

    static generateUserEmail() {
        return `Olha${Math.round((Math.random() * 10000))}@gmail.com`
    }
}
exports.RandomHelper = RandomHelper