import React from 'react'
import { tether, Section, TextInput, PasswordInput, Container, Heading, Button,Surface } from '@triframe/designer'
import { HelperText } from '@triframe/designer/dist/paper'


export const SignUp = tether(function* ({ Api, redirect }) {

    const { User } = Api
    
    const form = yield {
        username: '',
        password: '',
        errorMessage: null

    }

    return (
        <Container style={{ backgroundColor: "#e3f3e8", padding: "20px", height: "90vh" }}>
            <Container style={{marginTop:"15%", marginBottom:"10%", width:"30%", position: "relative", marginLeft:"36%", marginRight:"50%"}}>
            <Surface style={{padding: "20px", display:"flex"}}>
            <Heading              
                size="large"
              style={{ backgroundColor: "#00dbc4", padding: "10px" }}>Sign Up</Heading>
            </Surface>
            <TextInput
                label="Username"
                value={form.username}
                onChange={value => form.username = value}
                />
              <PasswordInput
                label="Password"
                value={form.password}
                onChange={value => form.password = value}
                />
            <Button style={{backgroundColor: "#00dbc4", shadow:"black", hoverEffect:"black"}}
                onPress={ async () => {
                    try{
                    await User.register(form.username, form.password)
                    redirect('/login')
                    }
                    catch(error){
                        form.errorMessage = error.message
                    }
                }}
                >Sign Up</Button>
                <HelperText type="error" visible={form.errorMessage !== null}>
                    {form.errorMessage}
                </HelperText>
                </Container>
        </Container>
    )

})