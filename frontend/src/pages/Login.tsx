import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleLoginButton: React.FC = () => {
    const googleLogin = useGoogleLogin({
        onSuccess: user => {
            console.log('Login Success:', user);
        },
        onError: error => {
            console.error('Login Error:', error);
        },
    });

    return (
        <div>
            <button onClick={() => googleLogin()}>Sign in with Google</button>
        </div>
    );
}

const Login = () => {
    return (
        <GoogleLoginButton />
    );
};
  

export default Login;
  