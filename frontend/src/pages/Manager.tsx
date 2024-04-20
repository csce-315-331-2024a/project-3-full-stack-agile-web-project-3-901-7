import { useEffect, useState } from "react";
import ManagerNavbar from "../components/ManagerNavbar";
import { getUserAuth, UserInfo } from "./Login";

export default function Manager() {
    const [userProfile, setUserProfile] = useState<UserInfo | undefined>(undefined);

    useEffect(() => {
        getUserAuth('manager')
            .then(setUserProfile)
            .catch(console.error);
    }, [])
    
    return (userProfile &&
        <ManagerNavbar userInfo={userProfile} />
    )
}
