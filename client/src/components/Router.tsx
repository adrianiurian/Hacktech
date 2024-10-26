import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../layouts/Root";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import { useContext } from "react";
import UserContext from "../store/UserContext";
import VisitorLayout from "../layouts/Visitor";
import RequestPage from "../pages/Request";

const visitorRouter = createBrowserRouter([
    {
        path: "/",
        element: <VisitorLayout />,
        children: [
            {
                path: "/",
                element: <LoginPage />,
            },
        ],
    },
]);

const userRouter = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            // {
            //     path: "/documents",
            //     element: <DocumentsPage />
            // },
            {
                path: "/request-referral",
                element: <RequestPage />,
            },
        ],
    },
]);

export default function Router() {
    const userContext = useContext(UserContext);

    if (userContext !== null && userContext.token)
        return <RouterProvider router={userRouter} />;
    return <RouterProvider router={visitorRouter} />;
}
