import React from "react";

interface Props {
    children?: React.ReactNode;
}

const AuthLayout : React.FC<Props> = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
            <div className="w-full max-w-md">
                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;