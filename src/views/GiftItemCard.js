import React from 'react'
import { Snackbar, Icon, List, Header, BubbleButton, TextInput, HelperText, tether, Card, Title, Section, Container, Modal, Heading, Button } from '@triframe/designer'


export const GiftItemCard = tether(function* ({ Api, useParams, props }) {

    const { User, Gift } = Api;

    const gift = yield Gift.read(
        props.gift,
        `
        *
    `
    )
    const currentUser = yield User.current()

    const addGiftModal = yield {
        visible: false,
        errorMessage: '',
        errorVisible: false,
        itemError: ''
    }

    const newGift = yield {
        item: '',
        store: '',
        price: '',
        salesDate: '',
        color: '',
        size: '',
        link: '',
        purchased: false,
    }
    const resetNewGift = () => {
        newGift.item = '';
        newGift.store = '';
        newGift.price = '';
        newGift.salesDate = '';
        newGift.color = '';
        newGift.size = '';
        newGift.link = '';
        newGift.purchased = false;
    }

    const handleDelete = async (delGift) => {
        if (!delGift.purchased) {
            await delGift.delete()
        }else{
            addGiftModal.errorMessage = 'It is too late to delete that item'
            addGiftModal.errorVisible = true
        }

    }
    // *** Buy A Gift Functionality *** // 
    const purchaseAGift = async (thisGift) => {
        let boughtGift = await Gift.read(`${thisGift.id}`)
        boughtGift.purchased = true;
    }
    //fixed delete

    const cardStyle = gift.purchased && currentUser.id !== gift.userId ? "gift-item-card-purchased" : "gift-item-card-unpurchased"
    if (gift === null) {
        return null
    }
    return (
        <div key={gift.id} elevation={5} className={cardStyle}>
            <p className="c1">{gift.item}</p>
            <p className="c2">{gift.store}</p>
            <p className="c3">${gift.price}</p>
            <p className="c4">{gift.salesDate} </p>
            <p className="c5">{gift.color} </p>
            <p className="c6">{gift.size} </p>
            <Button style={{ backgroundColor: "red", gridColumn: 7 }}><a className="link" href={gift.link} target="_blank">Link</a>!</Button>
            {currentUser.id === gift.userId ? <Button onPress={() => handleDelete(gift)} icon="delete" /> :
                <Button disabled={gift.purchased} onPress={() => purchaseAGift(gift)} style={{ gridColumn: 8 }}>Buy</Button>
            }
            <Snackbar visible={addGiftModal.errorVisible} duration={3000}
                onDismiss={() => addGiftModal.errorVisible = false}
            >{addGiftModal.errorMessage}</Snackbar>
        </div>
    )
})