import { Model, string, include } from '@triframe/scribe'
import { Resource } from '@triframe/core'

export class User extends Resource {

    @include(Model)

    @string
    name = ""

}