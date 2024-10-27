import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

interface NavItemProps {
    to: string;
    text: string;
    icon: string;
}

function NavItem({ to, text, icon }: NavItemProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 hover:bg-zinc-100 ${
                    isActive
                        ? "border-l-4 border-emerald-400 bg-gradient-to-r from-emerald-400 to-transparent bg-[length:0%_10%] text-emerald-400 font-semibold"
                        : "border-l-4"
                }`
            }
        >
            <span className='material-symbols-rounded text-[1.75rem]'>
                {icon}
            </span>
            <span>{text}</span>
        </NavLink>
    );
}

export default function Menu() {
    return (
        <nav className='flex flex-col px-6 py-4'>
            <Link to='/' className='flex flex-row gap-4 items-center'>
                <img src={logo} alt='logo' className='h-[3.5rem]' />
                <h2 className='text-3xl font-bold text-zinc-800'>
                    <span className='text-emerald-400 font-semibold'>Med</span>
                    Scan
                </h2>
            </Link>
            <div className='flex flex-col gap-4 pt-8'>
                <NavItem to='/' text='Dashboard' icon='space_dashboard' />
                <NavItem to='/documents' text='Documents' icon='folder_open' />
                <NavItem
                    to='/request-referral'
                    text='Request Referral'
                    icon='medical_information'
                />
            </div>
        </nav>
    );
}
