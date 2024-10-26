import { useContext } from "react";
import Button from "./UI/Button";
import UserContext from "../store/UserContext";

export default function Header() {
    const userContext = useContext(UserContext);

    return (
        <div className='flex flex-row justify-between items-center px-6 py-4'>
            <h2>Patient Platform</h2>
            <Button onClick={userContext.logout} outlined>
                Log Out
            </Button>
        </div>
    );
}
