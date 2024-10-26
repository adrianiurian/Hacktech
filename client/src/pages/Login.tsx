import { useContext, useState } from "react";
import UserContext from "../store/UserContext";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

export default function LoginPage() {
    const userContext = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <div>LoginPage</div>
            <Input
                label='Email'
                value={email}
                onChange={(value) => setEmail(value as string)}
                id='email'
            />
            <Input
                label='Password'
                value={password}
                onChange={(value) => setPassword(value as string)}
                id='password'
                type='password'
            />
            <div className='flex flex-row'>
                <Button
                    onClick={userContext.googleLogin}
                    styleType='error'
                    outlined
                >
                    Google Login
                </Button>
                <Button
                    onClick={() => userContext.login(email, password)}
                    styleType='primary'
                >
                    Login
                </Button>
            </div>
        </>
    );
}
