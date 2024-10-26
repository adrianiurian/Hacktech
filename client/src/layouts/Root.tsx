import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";

export default function RootLayout() {
    return (
        <main className='flex flex-row'>
            <Menu />
            <Outlet />
        </main>
    );
}
