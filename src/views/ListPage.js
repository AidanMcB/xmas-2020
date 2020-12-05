import React from 'react'
import { Snackbar, List, Header, BubbleButton, TextInput, HelperText, tether, Card, Title, Section, Container, Modal, Heading, Button } from '@triframe/designer'


export const ListPage = tether(function* ({ Api, useParams }) {

  const { User, Gift } = Api;


  const { id } = yield useParams();

  const user = yield User.read(
    id,
    `
      *,
      gifts {
        *
      }
    `
  )
  const currentUser = yield User.current()

  //validation must go here in the front end
  const handleAddGift = async () => {
    // console.log(newGift)
    try {
      await Gift.create({
        item: newGift.item,
        store: newGift.store,
        price: newGift.price,
        salesDate: newGift.salesDate,
        color: newGift.color,
        size: newGift.size,
        link: newGift.link,
        userId: user.id
      });
      // redirect('/main')
    } catch (error) {
      // errors.message = error.message
      console.log(error);
    }

  }
  const handleShowModal = () => {
    if (currentUser.id == user.id) {
      addGiftModal.visible = true
      addGiftModal.errorMessage = ''
    } else {
      addGiftModal.errorVisible = true
      addGiftModal.errorMessage = 'You can only add gifts to your own X-mas list, doofus!'
    }
  }
  const addGiftModal = yield {
    visible: false,
    errorMessage: '',
    errorVisible: false,
  }

  const newGift = yield {
    item: '',
    store: '',
    price: '',
    salesDate: '',
    color: '',
    size: '',
    link: ''
  }

  return (
    <Container>
      <Heading>{user.name}'s Xmas List</Heading>
      <div className="gift-item-grid">
        <Heading>Title</Heading>
        <Heading>Store</Heading>
        <Heading>Price</Heading>
        <Heading>Sales Dates</Heading>
        <Heading>Color</Heading>
        <Heading>Size</Heading>
        <Heading>Link</Heading>
        {user.gifts.map ( gift => (
          <div key={gift.id} elevation={5} className="gift-item-card">
            <p className="c1">{gift.item}</p>
            <p className="c2">{gift.store}</p>
            <p className="c3">${gift.price}</p>
            <p className="c4">{gift.salesDate} </p>
            <p className="c5">{gift.color} </p>
            <p className="c6">{gift.size} </p>
            <Button><a className="link" href={gift.link} target="_blank">Link</a>!</Button>
          </div>
        ))}
        </div>

      <BubbleButton onPress={handleShowModal}>
        Add a Gift!
      </BubbleButton>
      <Snackbar visible={addGiftModal.errorVisible} duration={3000}
        onDismiss={() => addGiftModal.errorVisible = false}
      >{addGiftModal.errorMessage}</Snackbar>

      <Modal key={user.id} visible={addGiftModal.visible} onDismiss={() => addGiftModal.visible = false}>
      <Container>
          <Heading>What would you like for Christmas?</Heading>
          <TextInput
            label="Item"
            value={newGift.item}
            onChange={(value) => newGift.item = value} />
          <TextInput
            label="Store"
            value={newGift.store}
            onChange={(value) => newGift.store = value} />
          <TextInput
            label="Price"
            value={newGift.price}
            onChange={(value) => newGift.price = value} />
          <TextInput
            label="Any Sales Date"
            value={newGift.salesDate}
            onChange={(value) => newGift.salesDate = value} />
          <TextInput
            label="Color"
            value={newGift.color}
            onChange={(value) => newGift.color = value} />
          <TextInput
            label="Size"
            value={newGift.size}
            onChange={(value) => newGift.size = value} />
          <TextInput
            label="Link"
            value={newGift.link}
            onChange={(value) => newGift.link = value} />
            <Button onPress={handleAddGift}>
              Send It To Santa!
            </Button>
        </Container>
      </Modal>


    </Container>
  )
})  