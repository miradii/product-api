import * as bcrypt from "bcrypt"

export function hashPassword(password: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        const salt = await bcrypt.genSalt()
        try {
            const hash = await bcrypt.hash(password, salt)
            resolve(hash)
        } catch (e) {
            reject(e)
        }
    })
}

export function comparePassword(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const isMatch = bcrypt.compare(password, hash)
        if (isMatch) resolve(true)
        else reject(false)
    });
}
