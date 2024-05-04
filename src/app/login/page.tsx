"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const loginFormSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(2),
})

const Login: React.FC = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    const result = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: true,
      callbackUrl: "/",
    })
  }

  return (
    <div className="flex justify-center items-center h-full">
      <Form {...form}>
        <form
          className="flex flex-col gap-4 w-[400px]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>

                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="secondary" className="mt-5 w-full" type="submit">
            LOGIN
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Login
