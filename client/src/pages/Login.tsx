import { useContext } from "react";
import UserContext from "../store/UserContext";

export default function LoginPage() {
    const userContext = useContext(UserContext);

    return (
        <>
            <div>LoginPage</div>
            <button onClick={() => userContext?.login()}>Login GOogle</button>
        </>
    );
}
