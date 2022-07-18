import * as jwt from "jsonwebtoken"
import { UserEntity } from "src/users/entities/user.entity"

const secret = process.env.JWT_SECRET
console.log(secret)

function issueJWT(userId: string) {
    const expiresIn = '60s'
    const payload = {
        sub: userId,
    }

    const options: jwt.SignOptions = {
        algorithm: 'RS256',
        issuer: 'moart',
        expiresIn,
    }

    const signedToken = jwt.sign(payload, secret, options)

    return {
        token: 'Bearer ' + signedToken,
        expires: expiresIn,
    }
}
