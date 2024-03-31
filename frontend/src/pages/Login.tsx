import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

interface ILoginButtonProps {
    color: string;
    isSubmit?: boolean;
    children?: JSX.Element | string;
    icon: IIcon;
    onClick?: () => void;
}

interface IIcon {
    viewboxSize: number;
    path: string;
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

const LoginButton: React.FC<ILoginButtonProps> = (props) => {
    return (
        <button
            type={props.isSubmit ? "submit" : "button"}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-${props.color}-600 hover:bg-${props.color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${props.color}-500`}
            onClick={() => props.onClick && props.onClick()}
        >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                    className={`h-5 w-5 text-${props.color}-400 group-hover:text-${props.color}-300`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={`0 0 ${props.icon.viewboxSize || 20} ${props.icon.viewboxSize || 20}`}
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d={props.icon.path}
                        clipRule="evenodd"
                    />
                </svg>
            </span>
            <div>
                {props.children}
            </div>
        </button>
    )
}

const Login : React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const googleLogin = useGoogleLogin({
        onSuccess: user => {
            console.log('Login Success:', user);
            navigate("/manager");
        },
        onError: error => {
            console.error("Login Error:", error);
        },
    });

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        console.log(email, password);
        navigate("/manager");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Manager Login</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={"appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"}
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-indigo-400 group-hover:text-indigo-300"></div>
                    <div className="bg-rose-600 hover:bg-rose-700 focus:ring-rose-500 text-rose-400 group-hover:text-rose-300"></div>
                    <div className="space-y-2">
                        <LoginButton 
                            color="indigo" 
                            icon={icons.signIn} 
                            isSubmit
                        >
                            Sign In
                        </LoginButton>

                        <LoginButton 
                            color="rose" 
                            icon={icons.google}
                            onClick={googleLogin}
                        >
                            Sign In With Google
                        </LoginButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;