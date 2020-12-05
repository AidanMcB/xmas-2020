import React from 'react'
import { tether, Card, Title, Section, TextInput, List, Container, Heading, Button, Redirect } from '@triframe/designer'


export const MainPage = tether(function*({ Api, redirect }) {

    const { User } = Api;

    const currentUser = yield User.current();


    const users = yield User.list() 

    const form = yield { name: '' }

    const handleSubmit = async () => {
        await User.create({ name: form.name })
        form.name = ''
    }
    if(currentUser === null){
        redirect('/login')
    } 
    return (
        <Container>
        <Title>Christmas List 2020!</Title>
            <div className="user-cards-grid">
            {users.map(user => ( 
                <Card
                style={{backgroundColor: "orange"}}
                className="user-card"
                key={user.id}
                onPress={() => redirect(`/list/${user.id}`)}
                ><p>{user.name}</p></Card>
            ))}
            </div>
        </Container>
    )
})  