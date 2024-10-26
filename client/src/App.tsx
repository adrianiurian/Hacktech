import { UserContextProvider } from "./store/UserContext";
import Router from "./components/Router";

function App() {
    return (
        <UserContextProvider>
            <Router />
        </UserContextProvider>
    );
}

export default App;
