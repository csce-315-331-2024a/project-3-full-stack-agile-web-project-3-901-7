import { useEffect, useState } from "react";
import CashierNavbar from "../components/CashierNavbar";
import { getUserAuth, UserInfo } from "./Login";

export default function Manager() {
    const [userProfile, setUserProfile] = useState<UserInfo | undefined>(undefined);

    useEffect(() => {
        getUserAuth()
            .then(setUserProfile)
            .catch(console.error);
    }, [])
    
    return (userProfile &&
        <CashierNavbar userInfo={userProfile} />
    )
}