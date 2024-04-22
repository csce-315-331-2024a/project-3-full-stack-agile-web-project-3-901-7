import { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { getUserAuth } from "../Login";
import { User } from "../../types/dbTypes";

export default function Admin() {
    const [userProfile, setUserProfile] = useState<User | undefined>(undefined);

    useEffect(() => {
        getUserAuth('admin')
            .then(setUserProfile)
            .catch(console.error);
    }, [])
    
    return (userProfile &&
        <AdminNavbar userInfo={userProfile} />
    )
}