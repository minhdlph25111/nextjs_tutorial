// app/(auth)/layout.js
import React from "react";

interface Props {
    children?: React.ReactNode;
}

const AuthLayout : React.FC<Props> = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
            <div
                className="w-full max-w-md"
                style={{marginTop : '-200px'}}
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Demo App</h1>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {children}
                </div>
            </div>
        </div>
    );
};
export default AuthLayout;