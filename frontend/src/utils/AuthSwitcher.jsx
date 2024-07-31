import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';

const AuthSwitcher = () => {
    const [isSignup, setIsSignup] = useState(true);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            {isSignup ? <SignupForm /> : <SigninForm />}
            <div className="mt-6 text-center">
                <button 
                    onClick={() => setIsSignup(!isSignup)}
                    className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300"
                >
                    Switch to {isSignup ? 'Sign In' : 'Sign Up'}
                </button>
            </div>
        </div>
    );
};

export default AuthSwitcher;
