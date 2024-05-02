import React, { useState } from "react";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CookieManager from "../utils/CookieManager";
import { toTitleCase } from "../utils/utils";
import { UserType, User, Role } from "../types/dbTypes";

interface IIcon {
    viewboxSize: number;
    path: string;
}

interface CredCache {
    googleResponse?: TokenResponse;
    userInfo?: User;
    type: UserType;
}

const icons = {
    google: {
        path: "M 0 300 C 0 134.578125 134.578125 0 300 0 C 366.808594 0 430.042969 21.496094 482.867188 62.160156 L 413.152344 152.71875 C 380.492188 127.578125 341.363281 114.285156 300 114.285156 C 197.597656 114.285156 114.285156 197.597656 114.285156 300 C 114.285156 402.402344 197.597656 485.714844 300 485.714844 C 382.476562 485.714844 452.566406 431.675781 476.71875 357.144531 L 300 357.144531 L 300 242.855469 L 600 242.855469 L 600 300 C 600 465.421875 465.421875 600 300 600 C 134.578125 600 0 465.421875 0 300 Z M 0 300",
        viewboxSize: 600,
    },
    signIn: {
        path: "M10 0C4.477 0 0 4.477 0 10c0 5.522 4.477 10 10 10 5.522 0 10-4.478 10-10 0-5.523-4.478-10-10-10zm5.707 9.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 10-1.414 1.414l3.5 3.5a1 1 0 001.414 0l3.5-3.5a1 1 0 000-1.414z",
        viewboxSize: 20,
    },
};

export function authLevel(type : UserType) {
    return {
        'customer': 1,
        'cashier': 2,
        'manager': 3,
        'admin': 4,
    }[type];
}

export async function getUserAuth(type : UserType) {
    let tokenResponseStr = CookieManager.get('tokenResponse');
    if (tokenResponseStr) {
        let credCache = JSON.parse(tokenResponseStr) as CredCache;
        let userProfile : User | undefined = undefined;

        if (credCache.googleResponse) {
            const userResponse = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${credCache.googleResponse.access_token}`, {
                headers: {
                    Authorization: `Bearer ${credCache.googleResponse.access_token}`,
                    Accept: 'application/json'
                }
            });
            userProfile = await userResponse.json() as User;
        }
        else if (credCache.userInfo) {
            userProfile = credCache.userInfo;
        }

        if (!userProfile) {
            window.location.href = `${window.location.origin}/${type}/login`;
            throw Error('Invalid auth');
        }
        
        let role : Role;

        try {
            console.log('requesting with profile', userProfile);
            const roleResponse = await fetch(import.meta.env.VITE_BACKEND_URL + "/role/findByEmail?email=" + userProfile.email);
            role = await roleResponse.json() as Role;
        }
        catch {
            window.location.href = `${window.location.origin}/${type}/login`;
            throw Error('Role not set up');
        }

    
        if (authLevel(role.type) < authLevel(type)) {
            window.location.href = `${window.location.origin}/${role.type}`;
            throw Error('Authorization Level too Low');
        }
    
        return userProfile;
    }
    else {
        window.location.href = `${window.location.origin}/${type}/login`;
        throw Error('No auth token');
    }
}

interface ILoginButtonProps {
    color?: string;
    isSubmit?: boolean;
    children?: JSX.Element | string;
    icon?: IIcon;
    onClick?: () => void;
}

const LoginButton: React.FC<ILoginButtonProps> = (props) => {
    return (
        <button
            type={props.isSubmit ? "submit" : "button"}
            // className={`w-full text-white bg-black group relative flex justify-center py-2 px-4 border border-black text-lg font-medium rounded-m bg-${
            //     props.color || "gray"
            // }-300 hover:bg-${
            //     props.color || "gray"
            // }-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${
            //     props.color || "gray"
            // }-500`}
            className={`w-full text-white bg-black dark:bg-white dark:text-black dark:border-white group relative flex justify-center py-2 px-4 border border-black text-lg font-medium rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-${props.color || "gray"}-500 hover:bg-white duration-500 hover:text-black dark:hover:bg-black dark:hover:text-white`}
            onClick={() => props.onClick && props.onClick()}
        >
            <span className="flex items-center">
                {props.icon && (
                    <span className="mr-2">
                        <img
                            className="h-5 w-5"
                            src="/icons/google.png"
                            alt="Google Icon"
                        />
                    </span>
                )}
                <span>{props.children}</span>
            </span>
        </button>
    );
};

interface ILoginProps {
    type: UserType;
    signup?: boolean;
}

export const Login: React.FC<ILoginProps> = (props : ILoginProps) => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [userInfo, setUserInfo] = useState<User>({
        _id: -1,
        email: '',
        name: '',
        given_name: '',
        family_name: '',
        picture: '',
    });

    const onLoginSuccess = (cred: { googleResponse?: TokenResponse, userInfo?: User, type: UserType }) => {
        const credCache : CredCache = {
            googleResponse: cred.googleResponse,
            userInfo: cred.userInfo,
            type: cred.type,
        };
        CookieManager.create('tokenResponse', JSON.stringify(credCache), cred.googleResponse && cred.googleResponse.expires_in);
        getUserAuth(props.type).then(_ => {
            navigate(`/${props.type}`);
        });
    }

    const googleLogin = useGoogleLogin({
        onSuccess: (user) => {
            onLoginSuccess({ googleResponse: user, type: props.type });
        },
        onError: (error) => {
            console.error("Login Error:", error);
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (props.signup) {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/user/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userInfo, 
                    password,
                }),
            });
            const data = await response.json();
            if (data.success)
                navigate(`/${props.type}/login`);
            else
                alert('Invalid authentication: Please ensure the information you entered is correct and ask your administrator if any issues persist');
        } 
        else {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/user/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: userInfo.email, password,
                    }),
                });
                const user = await response.json() as User;
                onLoginSuccess({ userInfo: user, type: props.type });
            }
            catch (error) {
                alert('Could not authenticate');
            }

        }
    };

    return (
        <div className="w-full h-screen p-8 relative overflow-hidden">
            <Navbar />
            <div className="min-w-screen flex items-center justify-center py-12 h-full">
                <div className="h-full w-3/4 space-y-8 flex">
                    <div className="w-1/2 pr-4 flex items-center">
                        <img
                            className="shadow-md rounded-3xl h-4/5 w-full object-cover"
                            src="/icons/loginsquiggle.png"
                            alt="Login Squiggle"
                        />
                    </div>
                    <div className="items-center w-1/2 pl-4 flex flex-col justify-center">
                        <div>
                            <h2 className="font-ptserif text-center text-3xl font-extrabold">
                                {props.signup ? "Sign Up For" : "Login To"} Your {toTitleCase(props.type)} Account
                            </h2>
                        </div>
                        <form
                            className="w-3/5 mt-8 space-y-6 mx-auto"
                            onSubmit={handleSubmit}
                        >
                            <div className="w-full rounded-md shadow-sm -space-y-px">
                                {props.signup && <>
                                    <div className="flex flex-row gap-4 mb-4">
                                        <input
                                            id="first-name"
                                            name="firstName"
                                            type="text"
                                            required
                                            value={userInfo.given_name}
                                            onChange={(e) =>
                                                setUserInfo(prevUser => ({
                                                    ...prevUser, 
                                                    given_name: toTitleCase(e.target.value), 
                                                    name: toTitleCase(e.target.value + ' ' + prevUser.family_name)
                                                }))
                                            }
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                            placeholder="First name"
                                        />
                                        
                                        <input
                                            id="last-name"
                                            name="lastName"
                                            type="text"
                                            required
                                            value={userInfo.family_name}
                                            onChange={(e) =>
                                                setUserInfo(prevUser => ({
                                                    ...prevUser, 
                                                    family_name: toTitleCase(e.target.value), 
                                                    name: toTitleCase(prevUser.given_name + ' ' + e.target.value)
                                                }))
                                            }
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                            placeholder="Last name"
                                        />
                                    </div>
                                </>}

                                <div className="mb-4">
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={userInfo.email}
                                        onChange={(e) => {
                                            setUserInfo((prevUser) => ({ ...prevUser, email : e.target.value }));
                                        }}
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>

                            {!props.signup && (
                                <div className="flex flex-row justify-center gap-4">
                                    Don't have an account? 
                                    <a 
                                        className="text-blue-500"
                                        href={`/${props.type}/signup`}
                                    >
                                        Sign up here
                                    </a>
                                </div>
                            )}

                            <div className="space-y-4">
                                <LoginButton isSubmit>{props.signup ? "Sign Up" : "Login"}</LoginButton>
                                <div className="text-lg font-bold text-gray-500 space-y-2 text-center">
                                    - or -
                                </div>
                                <LoginButton
                                    icon={icons.google}
                                    onClick={googleLogin}
                                >
                                    <>Sign {props.signup ? "Up" : "In"} With Google</>
                                </LoginButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
