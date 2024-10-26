import { useContext, useState } from "react";
import UserContext from "../store/UserContext";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import googleLogo from "../assets/google_icon.webp";

export default function LoginPage() {
    const userContext = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className='flex flex-col items-center pt-[10rem]'>
            <h2 className='font-bold pb-14 text-4xl text-zinc-700'>Login</h2>
            <div className='flex flex-col gap-6'>
                <Input
                    label='Email'
                    value={email}
                    className='w-[20rem]'
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
            <div className='flex flex-row pt-10 justify-between w-[20rem]'>
                <Button
                    onClick={userContext.googleLogin}
                    outlined
                    className='py-[0.5rem]'
                >
                    <p className='font-medium'>Login with</p>
                    <img
                        src={googleLogo}
                        alt='google logo'
                        className='h-10 ps-2'
                    />
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
