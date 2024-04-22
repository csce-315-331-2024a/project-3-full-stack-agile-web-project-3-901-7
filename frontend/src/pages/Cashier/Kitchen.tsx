import { useEffect, useState } from "react";
import CashierNavbar from "../../components/CashierNavbar";
import { getUserAuth } from "../Login";
import { User } from "../../types/dbTypes";

const Kitchen = () => {
    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);

    useEffect(() => {
        getUserAuth('cashier')
            .then(setUserProfile)
            .catch(console.error);
    }, [])
    
    return (userProfile &&
        <CashierNavbar userInfo={userProfile} />
    )
}

export default Kitchen;