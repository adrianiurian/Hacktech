import VisitorHeader from "../components/VisitorHeader";
import { Outlet } from "react-router-dom";

export default function VisitorLayout() {
    return (
        <main>
            <VisitorHeader />
            <Outlet />
        </main>
    );
}
