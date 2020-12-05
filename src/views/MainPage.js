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
        <Container style={{backgroundColor: 'rgb(12,201,25)', height:"100vh", width:"100%", marginLeft: 0, padding: "5%"}}>
        <div className="main-title"><h1>Christmas List 2020!</h1></div>
            <div className="user-cards-grid">
            {users.map(user => ( 
                <Card
                style={{backgroundColor: 'rgb(255,2,2)'}}
                className="user-card"
                key={user.id}
                onPress={() => redirect(`/list/${user.id}`)}
                ><p>{user.name}</p></Card>
            ))}
            </div>
        </Container>
    )
})  