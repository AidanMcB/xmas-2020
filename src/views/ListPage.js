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
      {/* <Container className="user-gift-items-grid"> */}
        {user.gifts.map ( gift => (
          <Card key={gift.id}>
            <List.Item title="Item" description={gift.item}/>
            <List.Item title="Store" desciption={gift.store}/>
            <List.Item title="Price" description={gift.price} />
          </Card>
        ))}
        {/* </Container> */}

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