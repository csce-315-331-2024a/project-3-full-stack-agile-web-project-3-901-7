import { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { getUserAuth, UserInfo } from "../Login";

export default function Admin() {
    const [userProfile, setUserProfile] = useState<UserInfo | undefined>(undefined);

    useEffect(() => {
        getUserAuth('admin')
            .then(setUserProfile)
            .catch(console.error);
    }, [])
    
    return (userProfile &&
        <AdminNavbar userInfo={userProfile} />
    )
}