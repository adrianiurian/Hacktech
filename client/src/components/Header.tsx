import { useContext } from "react";
import Button from "./UI/Button";
import UserContext from "../store/UserContext";

import { useLocation } from "react-router-dom";

export default function Header() {
    const userContext = useContext(UserContext);
    const location = useLocation();

    function formatPathname(pathname: string): string {
        return pathname
            .split("/")
            .filter(Boolean)
            .map((segment) =>
                segment
                    .replace(/[-_]/g, " ")
                    .replace(/^\w/, (c) => c.toUpperCase())
            )
            .join(" / ");
    }

    return (
        <div className='flex flex-row justify-between items-center px-6 py-4'>
            <h2 className='text-zinc-700 text-2xl font-semibold'>
                {formatPathname(location.pathname)}
            </h2>
            <Button onClick={userContext.logout} outlined>
                Log Out
            </Button>
        </div>
    );
}
