import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function VisitorHeader() {
    return (
        <nav className='flex flex-row justify-between px-6 py-4'>
            <Link to='/' className='flex flex-row gap-4 items-center'>
                <img src={logo} alt='logo' className='h-[3.5rem]' />
                <h2 className='text-3xl font-bold text-zinc-800'>
                    <span className='text-emerald-400 font-semibold'>Med</span>
                    Scan
                </h2>
            </Link>
            <div className='flex flex-row gap-4 items-center'>
                <h2 className='text-md py-4 px-8 text-zinc-800 hover:text-zinc-900 font-semibold'>
                    Register
                </h2>
                <h2 className='text-md py-3 px-8 rounded-full bg-emerald-400 hover:bg-emerald-500 text-white font-semibold'>
                    <Link to='/'>Login</Link>
                </h2>
            </div>
        </nav>
    );
}
