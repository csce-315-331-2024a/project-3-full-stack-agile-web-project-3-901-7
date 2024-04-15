import Navbar from "../components/ManagerNavbar";
import { getUserAuth } from "./Login";

export default function Manager() {
    getUserAuth().then(console.log).catch(console.error);
    return (
        <Navbar />
    )
}
