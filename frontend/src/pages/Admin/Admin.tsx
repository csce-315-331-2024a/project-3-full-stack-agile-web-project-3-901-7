import { useEffect, useState } from "react";
import { getUserAuth } from "../Login";
import { User } from "../../types/dbTypes";
import Navbar from "../../components/Navbar";

export default function Admin() {
    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);

    useEffect(() => {
        getUserAuth('admin')
            .then(setUserProfile)
            .catch(console.error);
    }, [])
    
    return (userProfile &&
        <Navbar userInfo={userProfile} userType="admin" />
    )
}