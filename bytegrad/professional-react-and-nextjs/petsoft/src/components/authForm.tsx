"use client"

import { Label } from "@radix-ui/react-label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import doAuth from "@/actions/doAuth"

type AuthFormProps = {
  action: "login" | "signup"
}

export default function AuthForm({ action }: AuthFormProps) {
  return (
    <div className="mt-4">
      <form action={doAuth} className="flex flex-col gap-y-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>
        <Button type="submit" className="">
          {action === "login" ? "Log in" : "Sign up"}
        </Button>
      </form>
    </div>
  )
}
