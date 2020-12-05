import { Model, string, include, session, hidden } from '@triframe/scribe'
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

    // @session
    // static async makeGift(newGift) {
    //     console.log("ran", newGift.item)
    //     if (newGift.item.length > 0) {
    //         throw Error("Must Enter a Gift Item")
    //     }
    //     return await Gift.create({
    //         item: newGift.item,
    //         store: newGift.store,
    //         price: newGift.price,
    //         salesDate: newGift.salesDate,
    //         color: newGift.color,
    //         size: newGift.size,
    //         link: newGift.link,
    //         userId: session.loggedInUserId,
    //     });
    // }
    // @hidden
    // static create;
}