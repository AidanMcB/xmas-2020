import React from 'react'
import { tether, Section, TextInput, List, Container, Heading, Button } from '@triframe/designer'


export const MainPage = tether(function*({ Api }) {

    const { User } = Api;

    const users = yield User.list()

    const form = yield { name: '' }

    const handleSubmit = async () => {
        await User.create({ name: form.name })
        form.name = ''
    }

    return (
        <Container>
            <Heading>User List</Heading>
            <Section>
                {users.map(user => (
                    <List.Item
                        key={user.id}
                        title={user.name}
                        right={() => 
                            <Button onPress={() => user.delete()}>
                                Delete
                            </Button>
                        }
                    />
                ))}
            </Section>
            <Heading>User Form</Heading>
            <Section>
                <TextInput
                    label="Name"
                    value={form.name}
                    onChange={ value => form.name = value }
                />
                <Button onPress={handleSubmit}>
                    Create
                </Button>
            </Section>
        </Container>
    )
})  