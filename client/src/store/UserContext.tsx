import { createContext, useCallback, useEffect, useState } from "react";

type UserContextType = {
    email: string;
    name: string;
    token: string;
    login: () => void;
    logout: () => void;
};

const UserContext = createContext<UserContextType>({
    email: "",
    name: "",
    token: "",
    login: () => {},
    logout: () => {},
});
export default UserContext;

const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
const params = {
    client_id: import.meta.env.CLIENT_ID,
    redirect_uri: import.meta.env.REDIRECT_URI,
    response_type: "token",
    scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
};

export function UserContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [email, setEmail] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        } else {
            console.log("useEffect else");
            const hashParams = new URLSearchParams(
                window.location.hash.substring(1)
            );
            const accessToken = hashParams.get("access_token");
            console.log(accessToken);
            if (accessToken) {
                setToken(accessToken);
                localStorage.setItem("token", accessToken);
            }
        }
    }, []);

    const login = useCallback(function login() {
        console.log("login func");
        const authUrl = `${oauth2Endpoint}?${new URLSearchParams(
            params
        ).toString()}`;

        window.location.href = authUrl;
    }, []);

    const logout = useCallback(function logout() {
        // TODO add OAuth code
        setEmail(null);
        setName(null);
        setToken(null);
        localStorage.removeItem("token");
    }, []);

    const contextValue: UserContextType = {
        email: email || "",
        name: name || "",
        token: token || "",
        login,
        logout,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}
