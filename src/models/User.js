import { Model, string, include } from '@triframe/scribe'
import { Resource } from '@triframe/core'
import { hash, compare } from 'bcrypt'
import { hasMany, session, stream} from '@triframe/scribe/dist/decorators'

export class User extends Resource {

    @include(Model)

    @string
    name = ""

    @string
    passwordDigest = ""

    @hasMany
    gifts = []

    static async register(name, password) {
        let existingUser = await User.where({ name: name })
        if (existingUser.length > 0) {
            throw Error('A usesr with this name already exists')
        } else if (password.length < 6) {
            throw Error('Password must be atleasy 6 characters long')
        }
        let passwordDigest = await hash(password, 10)
        return User.create({ name: name, passwordDigest: passwordDigest })
    }

    @session
    static async login(session, name, password) {
        let [user] = await User.where({ name: name })
        if (user == undefined) {
            throw Error('Could not find a user with that name')
        }
        if (!await compare(password, user.passwordDigest)) {
            throw Error('Incorrect password')
        }
        session.loggedInUserId = user.id
        return true
    }

    @session
    static logout(session) {
        session.loggedInUserId = null
    }


    @stream
    @session
    static *current(session) {
        return (
            session.loggedInUserId !== null
                ? yield User.read(session.loggedInUserId, `
                *
                `)
                : null
        )
    }


}