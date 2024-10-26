import { Link } from "react-router-dom";
import Button from "./UI/Button";
import logo from "../assets/react.svg";

export default function Menu() {
    return (
        <nav>
            <nav className='flex flex-row justify-between px-6 py-4'>
                <Link to='/'>
                    <img src={logo} alt='logo' />
                </Link>
                <div className='flex flex-row gap-4'>
                    <Button onClick={() => {}} outlined styleType='primary'>
                        Register
                    </Button>
                    <Button onClick={() => {}} styleType='primary'>
                        <Link to='/'>Login</Link>
                    </Button>
                </div>
            </nav>
        </nav>
    );
}
