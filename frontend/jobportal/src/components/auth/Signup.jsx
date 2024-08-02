import { Container, VStack, Heading,  Avatar, Input, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';

const Signup = () => {
    return(
        <Container>
            <form>
                <VStack>
                    <Heading>Sajha Kaam</Heading>
                    <Avatar alignSelf={'center'} boxSize={'32'}/>
                    <Input placeholder={"Name"} type={"text"} required/>
                    <Input placeholder={"Email"} type={"email"} required/>
                    <Input placeholder={"Password"} type={"password"} required/>
                    <Button>Signup</Button>
                    <Text>
                        Already Signed Up?{' '}
                        <Button>
                            <Link to={'/login'}>Login In</Link>
                        </Button>
                    </Text>
                </VStack>
            </form>
        </Container>
    )
}

export default Signup;