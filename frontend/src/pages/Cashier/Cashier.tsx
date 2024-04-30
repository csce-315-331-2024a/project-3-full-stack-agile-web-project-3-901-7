import { useEffect, useState } from "react";
import { getUserAuth } from "../Login";
import { User } from "../../types/dbTypes";
import Navbar from "../../components/Navbar";
import CashierHelpQueue from "../../components/CashierHelpQueue";

/**
 * Represents the Cashier page component.
 */
export default function Cashier() {
    /**
     * Represents the user profile state.
     */
    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);

    useEffect(() => {
        /**
         * Fetches the user authentication data for the cashier.
         */
        getUserAuth('cashier')
            .then(setUserProfile)
            .catch(console.error);
    }, [])
    
    return (userProfile && <>
        <Navbar userInfo={userProfile} userType="cashier"/>
        <CashierHelpQueue />
    </>)
}