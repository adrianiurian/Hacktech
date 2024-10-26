import { Link, NavLink } from "react-router-dom";
import logo from "../assets/react.svg";

export default function Menu() {
    return (
        <nav className='flex flex-col justify-between px-6 py-4'>
            <Link to='/' className='pb-20'>
                <img src={logo} alt='logo' />
            </Link>
            <div className='flex flex-col gap-8'>
                <NavLink to='/'>Dashboard</NavLink>
                <NavLink to='/documents'>Documents</NavLink>
                <NavLink to='/request-referral'>Request Referral</NavLink>
            </div>
        </nav>
    );
}
