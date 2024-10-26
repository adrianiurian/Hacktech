import { useContext } from "react";
import Button from "../components/UI/Button";
import UserContext from "../store/UserContext";

export default function HomePage() {
    const userContext = useContext(UserContext);
    return (
        <>
            <div>HomePage</div>
            <Button onClick={userContext.logout}>Log Out</Button>
        </>
    );
}
