import React from 'react'
import { tether, Card, Title, Section, TextInput, Container, Heading, Button } from '@triframe/designer'


export const ListPage = tether(function* ({ Api, useParams }) {

  const { User } = Api;

  const { id } = yield useParams();

  const user = yield User.read(
    id,
    `
      *
    `
  )

    return (
    <Container>
      <Heading>{user.name}'s Xmas List</Heading>


    </Container>
  )
})  