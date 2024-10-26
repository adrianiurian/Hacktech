import { useContext, useState } from "react";
import UserContext from "../store/UserContext";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

export default function LoginPage() {
    const userContext = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className='flex flex-col items-center'>
            <h2 className='font-semibold pb-12'>Login</h2>
            <div className='flex flex-col gap-6'>
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
            </div>
            <div className='flex flex-row pt-7 gap-6'>
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
        </div>
    );
}
