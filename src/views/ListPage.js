import React from 'react'
import { Snackbar, Icon, List, Header, BubbleButton, TextInput, HelperText, tether, Card, Title, Section, Container, Modal, Heading, Button } from '@triframe/designer'
import { GiftItemCard } from './GiftItemCard'

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
    if (newGift.item.length < 1) {
      addGiftModal.itemError = "You must at least enter the name of an item... "
    } else {
      try {
        await Gift.create({
          item: newGift.item,
          store: newGift.store,
          price: newGift.price,
          salesDate: newGift.salesDate,
          color: newGift.color,
          size: newGift.size,
          link: newGift.link,
          userId: user.id,
          purchased: false,
        });
        addGiftModal.visible = false;
        addGiftModal.itemError = '';
        resetNewGift()
      } catch (error) {
        // errors.message = error.message
        console.log(error);
      }
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
    newGift.salesDate ='';
    newGift.color = '';
    newGift.size = '';
    newGift.link = '';
    newGift.purchased = false;
  }

  const handleDelete = async (delGift) => {
    await delGift.delete()
  }

  // *** Buy A Gift Functionality *** // 
  const purchaseAGift = async(thisGift) => {
    let boughtGift =  await Gift.read(`${thisGift.id}`)
    boughtGift.purchased = true;
  }
  // let gitfCardStyle = gift.purchased ? "gift-item-card-purchased" : "gift-item-card-unpurchased"

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
        {user.gifts.map(gift => (
          <GiftItemCard gift={gift.id} key={gift.id}/>
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
          <HelperText type="error" visible={addGiftModal.itemError.length > 0}>
            {addGiftModal.itemError}
          </HelperText>
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