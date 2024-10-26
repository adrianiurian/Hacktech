import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";
import Header from "../components/Header";

export default function RootLayout() {
    return (
        <main className='flex flex-row'>
            <Menu />
            <div className='flex flex-col flex-1'>
                <Header />
                <Outlet />
            </div>
        </main>
    );
}
