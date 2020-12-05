import { Model, string, include } from '@triframe/scribe'
import { Resource } from '@triframe/core'
import { belongsTo } from "@triframe/scribe/dist/decorators";

export class Gift extends Resource {

    @include(Model)

    @belongsTo({ a: "User" })
    user = null;

    @string
    item = "" 

    @string
    store = ""

    @string
    price = "" 

    @string 
    salesDate = "" 

    @string
    color = ""

    @string 
    size = "" 

    @string 
    link = ""

}