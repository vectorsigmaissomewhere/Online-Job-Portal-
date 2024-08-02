import { Container, VStack, Heading, Input, Button, Link} from '@chakra-ui/react';

const Login = () => {
    return <Container>
        <form>
            <VStack>
                <Heading>Sajha Kaam</Heading>
                <Input placeholder={"Email"} type={"email"} required />
                <Input placeholder={"Password"}  type={"password"} required />
                <Button>
                    Forget Password?
                </Button>
                <Button>Login</Button>
            </VStack>
        </form>
    </Container>
};

export default Login;