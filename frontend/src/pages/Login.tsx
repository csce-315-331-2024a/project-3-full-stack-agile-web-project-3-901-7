import React, { useState } from "react";
import { hasGrantedAllScopesGoogle, hasGrantedAnyScopeGoogle, TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CookieManager from "../utils/CookieManager";

interface ILoginButtonProps {
    color?: string;
    isSubmit?: boolean;
    children?: JSX.Element | string;
    icon?: IIcon;
    onClick?: () => void;
}

interface IIcon {
    viewboxSize: number;
    path: string;
}

export interface UserInfo {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
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

export async function getUserAuth() {
    let tokenResponseStr = CookieManager.get('tokenResponse');
    if (tokenResponseStr) {
        let tokenResponse = JSON.parse(tokenResponseStr) as TokenResponse;
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
                Accept: 'application/json'
            }
        });
        const userProfile = await response.json() as UserInfo;
        return userProfile;
    }
    else {
        window.location.href = '/login';
        throw Error('No auth token');
    }
}

const LoginButton: React.FC<ILoginButtonProps> = (props) => {
    return (
        <button
            type={props.isSubmit ? "submit" : "button"}
            className={`w-full text-white bg-black group relative flex justify-center py-2 px-4 border border-black text-lg font-medium rounded-m bg-${
                props.color || "gray"
            }-300 hover:bg-${
                props.color || "gray"
            }-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${
                props.color || "gray"
            }-500`}
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

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const googleLogin = useGoogleLogin({
        onSuccess: (user) => {
            console.log("Login Success:", user);
            CookieManager.create('tokenResponse', JSON.stringify(user), user.expires_in);
            navigate("/manager");
        },
        onError: (error) => {
            console.error("Login Error:", error);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(email, password);
        navigate("/manager");
    };

    return (
        <div className="w-full h-screen p-8 relative bg-white overflow-hidden">
            <Navbar />
            <div className="min-w-screen flex items-center justify-center bg-white py-12 h-full">
                <div className="h-full w-3/4 space-y-8 flex">
                    <div className="w-1/2 pr-4">
                        <img
                            className="shadow-md rounded-3xl h-4/5 w-full object-cover"
                            src="/icons/loginsquiggle.png"
                            alt="Login Squiggle"
                        />
                    </div>
                    <div className="items-center w-1/2 pl-4 flex flex-col justify-center">
                        <div>
                            <h2 className="font-ptserif text-center text-3xl font-extrabold text-gray-900">
                                Login To Your Account
                            </h2>
                        </div>
                        <form
                            className="w-3/5 mt-8 space-y-6 mx-auto"
                            onSubmit={handleSubmit}
                        >
                            <div className="w-full rounded-md shadow-sm -space-y-px">
                                <div className="mb-4">
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div className="my-4" />
                                <div>
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
                            <div className="space-y-4">
                                <LoginButton isSubmit>Login</LoginButton>
                                <div className="text-lg font-bold text-gray-500 space-y-2 text-center">
                                    - or -
                                </div>
                                <LoginButton
                                    icon={icons.google}
                                    onClick={googleLogin}
                                >
                                    Sign In With Google
                                </LoginButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
