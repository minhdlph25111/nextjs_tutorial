'use client'
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card"
import {Field, FieldDescription, FieldGroup, FieldLabel,} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import React, {useState} from "react";
import usersData from "@/datas/data";
import {useRouter} from "next/navigation";

export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentProps<"div">) {

    //Khai bao
    const router = useRouter(); // Navigation
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true);
        const UserLogin = usersData.find(
            user => (user.email === email || user.userName === username) && user.password === password
        ); // Tim user dang nhap trong data
        setTimeout(() => {
            if (UserLogin) { // Co user dang nhap
                alert('Login successfully.');
                sessionStorage.setItem("userLogin", JSON.stringify(UserLogin.userName)); // Luu username vao sessionStorage
                router.push("/home");
            } else { // Khong co user dang nhap
                alert("Login failed.");
                setIsLoading(false);
            }
        }, 800); // Delay 0,8 second
    }

    return (
        <div className={cn("flex flex-col gap-6 justify-center text-center", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="Email or username..."
                                    value={email || username}
                                    onChange={(e) => {
                                        // Lay gia tri cua input de gan gia tri cho username va email
                                        const value = e.target.value
                                        setEmail(value);
                                        setUsername(value);
                                    }}
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} // Gia tri cua password
                                    required/>
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline cursor-pointer"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Button type="submit" className='cursor-pointer'>{isLoading ? 'Loading...' : 'Login'}</Button>
                                <Button variant="outline" type="button" className='cursor-pointer'>
                                    Login with Google
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <a href="/register" className='cursor-pointer'>Sign up</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
