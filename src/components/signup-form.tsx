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
import React, {useEffect} from "react";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

    useEffect(() => {
        document.title = 'Signup';
    }, []);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
              <Field className='grid grid-cols-2 gap-4' >
                  <Field className="flex">
                      <FieldLabel htmlFor="name">First Name</FieldLabel>
                      <Input id="fname" type="text" placeholder="First name..." required />
                  </Field>
                  <Field>
                      <FieldLabel htmlFor="name">Last Name</FieldLabel>
                      <Input id="lname" type="text" placeholder="Last name..." required />
                  </Field>
              </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="Email..."
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" required placeholder='Password...'/>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" type="password" placeholder='Confirm Password...' required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" className='cursor-pointer'>Create Account</Button>
                <Button variant="outline" type="button" className='cursor-pointer'>
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login" className='cursor-pointer'>Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
