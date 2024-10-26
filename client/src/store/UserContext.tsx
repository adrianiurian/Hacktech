import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { createContext, useCallback, useEffect, useState } from "react";
import { auth } from "../Firebase";
import {
    doSignInWithEmailAndPassword,
    doSignInWithGoogle,
    doSignOut,
} from "../api/AuthAPI";
import axios, { AxiosStatic } from "axios";

type UserContextType = {
    email: string;
    name: string;
    token: string;
    login: (email: string, password: string) => void;
    googleLogin: () => void;
    logout: () => void;
    axiosAPI: AxiosStatic;
};

const UserContext = createContext<UserContextType>({
    email: "",
    name: "",
    token: "",
    googleLogin: () => {},
    login: (email: string, password: string) => {
        let something = email + password;
        something = "test";
        console.log(something);
    },
    logout: () => {},
    axiosAPI: axios,
});
export default UserContext;

export function UserContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [email, setEmail] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // useEffect(() => {
    //     const storedToken = localStorage.getItem("token");
    //     if (storedToken) {
    //         setToken(storedToken);
    //     }
    // }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    async function initializeUser(user: FirebaseUser | null) {
        if (user) {
            const token = await user.getIdToken();
            console.log(token);
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            console.log("logout");
        }
    }

    const login = useCallback(async function login(
        email: string,
        password: string
    ) {
        console.log("login function");
        await doSignInWithEmailAndPassword(email, password);
    },
    []);

    const googleLogin = useCallback(function googleLogin() {
        console.log("google login function");
        doSignInWithGoogle().catch((err) => {
            console.log(err);
        });
    }, []);

    const logout = useCallback(function logout() {
        doSignOut();
        setEmail(null);
        setName(null);
        setToken(null);
        localStorage.removeItem("token");
    }, []);

    const contextValue: UserContextType = {
        email: email || "",
        name: name || "",
        token: token || "",
        axiosAPI: axios,
        login,
        googleLogin,
        logout,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}
