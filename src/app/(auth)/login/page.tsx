'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import usersData from "@/datas/data";
import Image from "next/image";
import Link from "next/link";


 const LoginPage : React.FC = ()=> {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault();
         setIsLoading(true);
          const dataLogin = usersData.find(
              user => user.email === email && user.password === password
              );
         if(dataLogin){
             setTimeout(() => {
                 router.push('/home');
                 localStorage.setItem('userLogin', JSON.stringify(dataLogin.userName));
             },800)
         }else {
             setError('Login failed!');
             setIsLoading(false);
             return;
         }
     };

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                    <h1 style={{fontSize : '24px' , fontWeight : 'bold' , color : 'blue'}}>Login</h1>
                </div>
                <div className="mb-4">
                    <label className="block text-black mb-2">Email :</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            outline: 'none',
                            border : '2px solid blue',
                        }}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-black mb-2">Password :</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 text-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            outline: 'none',
                            border : '2px solid blue',
                        }}
                    />
                </div>
                {error && (
                    <div className="mb-4">
                        <span style={{color: 'red'}}> {error}</span>
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                    { isLoading ? 'Loading...' : 'Login' }
                </button>
                <span
                    className="mt-3 text-center"
                    style={{color : 'black', marginTop: '10px'}}
                >
                    Do not have an account? <Link href='/register' style={{color : 'blue' , textDecoration : 'underline'}}>Register</Link>
                </span>
            </form>
        </div>
    );
};
export default LoginPage;