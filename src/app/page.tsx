"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = authClient.useSession();

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
      },
      {
        onSuccess: (user) => {
          window.alert(`User created successfully: ${user}`);
          console.log("User created:", user);
        },
        onError: (error) => {
          window.alert(`Error creating user: ${error}`);
          console.error("Error creating user:", error);
        },
      }
    );
  };
  const onLogin = () => {
    authClient.signIn.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
      },
      {
        onSuccess: (user) => {
          window.alert(`User created successfully: ${user}`);
          console.log("User created:", user);
        },
        onError: (error) => {
          window.alert(`Error creating user: ${error}`);
          console.error("Error creating user:", error);
        },
      }
    );
  };

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {session.user.name}!
        </h1>
        <p className="text-lg">You are successfully logged in.</p>
        <Button className="mt-4" onClick={() => authClient.signOut()}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col gap-2 items-center justify-center bg-gray-100">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSubmit}>Create User</Button>
      </div>

      <div className="flex flex-col items-center justify-center gap-2.5 bg-gray-100">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onLogin}>Login</Button>
      </div>
    </div>
  );
}
