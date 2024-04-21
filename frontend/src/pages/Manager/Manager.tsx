import { useEffect, useState } from "react";
import ManagerNavbar from "../../components/ManagerNavbar";
import { getUserAuth } from "../Login";
import { User } from "../../types/dbTypes";

export default function Manager() {
    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);

    useEffect(() => {
        getUserAuth('manager')
            .then(setUserProfile)
            .catch(console.error);
    }, [])
    
    return (userProfile &&
        <ManagerNavbar userInfo={userProfile} />
    )
}
