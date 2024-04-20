import { useEffect, useState } from "react";
import CashierNavbar from "../components/CashierNavbar";
import { getUserAuth, UserInfo } from "./Login";

export default function Cashier() {
    const [userProfile, setUserProfile] = useState<UserInfo | undefined>(undefined);

    useEffect(() => {
        getUserAuth('cashier')
            .then(setUserProfile)
            .catch(console.error);
    }, [])
    
    return (userProfile &&
        <CashierNavbar userInfo={userProfile} />
    )
}