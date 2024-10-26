import { Link } from "react-router-dom";
import logo from "../assets/react.svg";
import Button from "./UI/Button";

export default function VisitorHeader() {
    return (
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
    );
}
