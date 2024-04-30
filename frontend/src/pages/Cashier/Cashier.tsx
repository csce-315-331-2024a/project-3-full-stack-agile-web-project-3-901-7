import { useEffect, useState } from "react";
import { getUserAuth } from "../Login";
import { User } from "../../types/dbTypes";
import Navbar from "../../components/Navbar";
import CashierHelpQueue from "../../components/CashierHelpQueue";

export default function Cashier() {
    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);

    useEffect(() => {
        getUserAuth('cashier')
            .then(setUserProfile)
            .catch(console.error);
    }, [])
    
    return (userProfile && <>
        <Navbar userInfo={userProfile} userType="cashier"/>
        <CashierHelpQueue />
    </>)
}