'use client';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import React, {useEffect, useState} from "react";
import { Loader2 } from "lucide-react";

interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: string;
    isVerified: boolean;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        document.title = 'Signup';
    }, []);

    // Hàm kiểm tra email đã tồn tại trong Local Storage
    const checkEmailExists = (email: string): boolean => {
        if (typeof window === 'undefined') return false;

        try {
            const usersJson = localStorage.getItem('registeredUsers');
            if (!usersJson) return false;

            const users: UserData[] = JSON.parse(usersJson);
            return users.some(user => user.email.toLowerCase() === email.toLowerCase());
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return false;
        }
    };

    // Hàm lưu user vào Local Storage
    const saveUserToLocalStorage = (userData: Omit<UserData, 'id' | 'createdAt' | 'isVerified'>): UserData => {
        // Tạo user object với các thông tin bổ sung
        const newUser: UserData = {
            id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            ...userData,
            createdAt: new Date().toISOString(),
            isVerified: false
        };

        // Lấy danh sách users hiện tại
        let existingUsers: UserData[] = [];
        try {
            const usersJson = localStorage.getItem('registeredUsers');
            if (usersJson) {
                existingUsers = JSON.parse(usersJson);
            }
        } catch (error) {
            console.error('Error reading existing users:', error);
        }

        // Thêm user mới vào danh sách
        const updatedUsers = [...existingUsers, newUser];

        // Lưu vào Local Storage
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

        // Cũng lưu thông tin user hiện tại nếu muốn auto login
        localStorage.setItem('currentUser', JSON.stringify({
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            isVerified: newUser.isVerified
        }));

        return newUser;
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Validate first name
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        } else if (formData.firstName.length < 2) {
            newErrors.firstName = 'First name must be at least 2 characters';
        }

        // Validate last name
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        } else if (checkEmailExists(formData.email)) {
            newErrors.email = 'This email is already registered';
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase and numbers';
        }

        // Validate confirm password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id === 'fname' ? 'firstName' :
                id === 'lname' ? 'lastName' :
                    id === 'confirm-password' ? 'confirmPassword' : id]: value
        }));

        // Clear error when user starts typing
        if (errors[id as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [id]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Lưu user vào Local Storage
            const savedUser = saveUserToLocalStorage({
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.toLowerCase().trim(),
                password: formData.password // Lưu ý: Trong thực tế nên mã hóa password trước khi lưu
            });

            console.log('User saved to localStorage:', savedUser);

            // Hiển thị thông tin debug trong console
            const allUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            console.log('All registered users:', allUsers);

            // Hiển thị thông báo thành công
            setIsSubmitted(true);

            // Tự động redirect sau 2 giây
            setTimeout(() => {
                window.location.href = '/dashboard'; // Hoặc '/login' nếu muốn user đăng nhập lại
            }, 2000);

        } catch (error) {
            console.error('Registration error:', error);
            setErrors({
                general: 'Registration failed. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignup = () => {
        // Implement Google OAuth here
        console.log('Google signup clicked');
        // Trong trường hợp dùng Local Storage, có thể lưu thông tin Google user
        const googleUser = {
            id: `google_${Date.now()}`,
            firstName: 'Google',
            lastName: 'User',
            email: 'google-user@example.com',
            isVerified: true,
            createdAt: new Date().toISOString(),
            isGoogleUser: true
        };

        localStorage.setItem('currentUser', JSON.stringify(googleUser));
        window.location.href = '/dashboard';
    };

    // Hàm helper để xem tất cả users (dùng cho debug)
    const viewAllUsers = () => {
        if (typeof window !== 'undefined') {
            const users = localStorage.getItem('registeredUsers');
            console.log('All users in localStorage:', users ? JSON.parse(users) : 'No users found');
            alert('Check console for all registered users');
        }
    };

    // Hàm xóa tất cả users (dùng cho debug)
    const clearAllUsers = () => {
        if (typeof window !== 'undefined' && confirm('Are you sure you want to clear all users?')) {
            localStorage.removeItem('registeredUsers');
            localStorage.removeItem('currentUser');
            console.log('All users cleared from localStorage');
            alert('All users cleared');
        }
    };

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        {errors.general && (
                            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                                {errors.general}
                            </div>
                        )}

                        {isSubmitted && (
                            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
                                Registration successful! Redirecting to dashboard...
                            </div>
                        )}

                        <Field className='grid grid-cols-2 gap-4' >
                            <Field className="flex flex-col">
                                <FieldLabel htmlFor="fname">First Name</FieldLabel>
                                <Input
                                    id="fname"
                                    type="text"
                                    placeholder="First name..."
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    disabled={isLoading || isSubmitted}
                                    required
                                />
                                {errors.firstName && (
                                    <span className="text-red-500 text-xs mt-1">{errors.firstName}</span>
                                )}
                            </Field>
                            <Field className="flex flex-col">
                                <FieldLabel htmlFor="lname">Last Name</FieldLabel>
                                <Input
                                    id="lname"
                                    type="text"
                                    placeholder="Last name..."
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    disabled={isLoading || isSubmitted}
                                    required
                                />
                                {errors.lastName && (
                                    <span className="text-red-500 text-xs mt-1">{errors.lastName}</span>
                                )}
                            </Field>
                        </Field>

                        <Field className="flex flex-col">
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email..."
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={isLoading || isSubmitted}
                                required
                            />
                            {errors.email && (
                                <span className="text-red-500 text-xs mt-1">{errors.email}</span>
                            )}
                        </Field>

                        <Field className="flex flex-col">
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                required
                                placeholder='Password...'
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={isLoading || isSubmitted}
                            />
                            {errors.password && (
                                <span className="text-red-500 text-xs mt-1">{errors.password}</span>
                            )}
                        </Field>

                        <Field className="flex flex-col">
                            <FieldLabel htmlFor="confirm-password">
                                Confirm Password
                            </FieldLabel>
                            <Input
                                id="confirm-password"
                                type="password"
                                placeholder='Confirm Password...'
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                disabled={isLoading || isSubmitted}
                                required
                            />
                            {errors.confirmPassword && (
                                <span className="text-red-500 text-xs mt-1">{errors.confirmPassword}</span>
                            )}
                            <FieldDescription>Please confirm your password.</FieldDescription>
                        </Field>

                        <FieldGroup className="space-y-4">
                            <Field className="flex flex-col space-y-2">
                                <Button
                                    type="submit"
                                    className='cursor-pointer w-full'
                                    disabled={isLoading || isSubmitted}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : isSubmitted ? (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Account Created!
                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </Button>

                                <div className="relative my-4">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    type="button"
                                    className='cursor-pointer w-full'
                                    onClick={handleGoogleSignup}
                                    disabled={isLoading || isSubmitted}
                                >
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Sign up with Google
                                </Button>

                                <FieldDescription className="px-6 text-center mt-4">
                                    Already have an account? <a href="/login" className='cursor-pointer text-blue-600 hover:text-blue-800 hover:underline'>Sign in</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>

                        {/* Debug buttons - chỉ hiển thị trong development */}
                        {process.env.NODE_ENV === 'development' && (
                            <div className="mt-8 pt-4 border-t border-gray-200">
                                <FieldDescription className="text-center mb-2 text-gray-500">Development Tools</FieldDescription>
                                <div className="flex gap-2 justify-center">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={viewAllUsers}
                                        className="text-xs"
                                    >
                                        View All Users
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={clearAllUsers}
                                        className="text-xs bg-red-50 text-red-600 hover:bg-red-100"
                                    >
                                        Clear All Users
                                    </Button>
                                </div>
                            </div>
                        )}
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}